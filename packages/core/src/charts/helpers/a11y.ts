const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

let lastId = 0;

export type ChartLabel = {
    /** What the chart is announced as. Null falls back to `fallbackTitle`. */
    a11yTitle: string | null;
    /** Announced after the title. Null leaves the chart without one. */
    a11yDescription: string | null;
    /** The chart's type, such as "Bar chart", for when no title is set. */
    fallbackTitle: string;
    /**
     * `img` for a chart, whose marks are one picture. `group` for one whose
     * text should stay readable, such as the legend.
     */
    role?: 'img' | 'group';
};

const ownDesc = (svg: Element) =>
    Array.from(svg.children).find(
        (child) => child.tagName.toLowerCase() === 'desc'
    );

const ensureOwnDesc = (svg: Element) => {
    const existing = ownDesc(svg);

    if (existing) {
        return existing;
    }

    const element = svg.ownerDocument.createElementNS(SVG_NAMESPACE, 'desc');

    element.id = `britechart-desc-${++lastId}`;
    svg.insertBefore(element, svg.firstChild);

    return element;
};

/**
 * Gives a chart's svg the role, `aria-label` and `<desc>` that screen readers
 * announce. The name is an attribute, not a `<title>`: browsers show an svg's
 * `<title>` as a tooltip when the pointer rests on the chart. Run on every
 * render: it reuses the `<desc>` it made the first time and only updates its
 * text, so its id, and the attribute that points at it, stay stable.
 */
export const labelChart = (
    svg: Element | null,
    { a11yTitle, a11yDescription, fallbackTitle, role = 'img' }: ChartLabel
): void => {
    if (!svg) {
        return;
    }

    svg.setAttribute('role', role);
    svg.setAttribute('aria-label', a11yTitle ?? fallbackTitle);

    if (a11yDescription) {
        const descElement = ensureOwnDesc(svg);

        descElement.textContent = a11yDescription;
        svg.setAttribute('aria-describedby', descElement.id);
    } else {
        ownDesc(svg)?.remove();
        svg.removeAttribute('aria-describedby');
    }
};

export type DataTableCell = string | number | Date | null | undefined;

/**
 * A chart's data as a table: the column headings, then one row per entry. A
 * row's first cell is its heading, such as the bar's name or the point's date.
 */
export type DataTable = {
    columns: string[];
    rows: DataTableCell[][];
};

const TABLE_CLASS = 'britechart-data-table';

// Hidden from sight but not from screen readers. Inline rather than a class,
// so it stays hidden in apps that don't load the charts' CSS. On a div around
// the table: a table sizes itself to its content whatever its width, so
// hiding the table itself would still leave a box as big as the data.
const VISUALLY_HIDDEN =
    'position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;';

let lastTableId = 0;

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

// A column of dates shows the time only when two of them fall on the same day,
// as in hourly data
const formatColumn = (cells: DataTableCell[]) => {
    const dates = cells.filter((cell): cell is Date => cell instanceof Date);
    const showsTime = dates.some((date, index) =>
        dates.slice(index + 1).some((other) => isSameDay(date, other))
    );

    return cells.map((cell) => {
        if (cell === null || cell === undefined) {
            return '';
        }
        if (cell instanceof Date) {
            return showsTime
                ? cell.toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                  })
                : cell.toLocaleDateString(undefined, { dateStyle: 'medium' });
        }

        return String(cell);
    });
};

const linkedTable = (svg: Element) => {
    const id = svg.getAttribute('aria-details');

    return id
        ? Array.from(svg.parentElement?.children ?? []).find(
              (sibling) => sibling.id === id
          )
        : undefined;
};

const appendRow = (
    section: HTMLTableSectionElement,
    cells: string[],
    scope: 'col' | 'row'
) => {
    const document = section.ownerDocument;
    const row = section.insertRow();

    cells.forEach((text, index) => {
        const isHeading = scope === 'col' || index === 0;
        const cell = document.createElement(isHeading ? 'th' : 'td');

        if (isHeading) {
            cell.setAttribute('scope', scope === 'col' ? 'col' : 'row');
        }
        cell.textContent = text;
        row.appendChild(cell);
    });
};

/**
 * Renders a chart's data as a visually hidden table right after its svg, which
 * screen readers can read cell by cell, and links it from the svg with
 * `aria-details`. The table sits in a `div.britechart-data-table`, which the
 * link names. Its caption is the chart's name, so run it after
 * {@link labelChart}. Run on every render: it reuses the table it made and
 * rewrites its content. A null table, or one without rows, removes it.
 */
export const renderDataTable = (
    svg: Element | null,
    table: DataTable | null
): void => {
    if (!svg) {
        return;
    }

    const existing = linkedTable(svg);

    if (!table || !table.rows.length) {
        existing?.remove();
        svg.removeAttribute('aria-details');

        return;
    }

    const document = svg.ownerDocument;
    const wrapper = existing ?? document.createElement('div');

    if (!existing) {
        wrapper.id = `britechart-data-table-${++lastTableId}`;
        wrapper.className = TABLE_CLASS;
        wrapper.setAttribute('style', VISUALLY_HIDDEN);
        svg.after(wrapper);
        svg.setAttribute('aria-details', wrapper.id);
    }

    const element = document.createElement('table');

    // Formatted by column, so a column of dates is formatted alike
    const columns = table.columns.map((_, index) =>
        formatColumn(table.rows.map((row) => row[index]))
    );
    const rows = table.rows.map((_, rowIndex) =>
        columns.map((column) => column[rowIndex])
    );

    wrapper.replaceChildren(element);
    element.createCaption().textContent = `${svg.getAttribute('aria-label') ?? 'Chart'}, data`;
    appendRow(element.createTHead(), table.columns, 'col');

    const body = element.createTBody();

    rows.forEach((row) => appendRow(body, row, 'row'));
};

/**
 * Lays long data out wide, one row per `row` key and one column per `column`
 * key, in the order each first appears, as screen readers navigate a table
 * best: a line chart's dates down the side and its topics across the top.
 * @param heading   The first column's heading, such as "Date"
 * @param sortRows  Orders the rows, such as by date
 */
export const pivotTable = <TDatum>(
    data: TDatum[],
    {
        heading,
        row,
        column,
        value,
        sortRows,
    }: {
        heading: string;
        row: (d: TDatum) => DataTableCell;
        column: (d: TDatum) => string;
        value: (d: TDatum) => DataTableCell;
        sortRows?: (a: DataTableCell, b: DataTableCell) => number;
    }
): DataTable => {
    const columns: string[] = [];
    const rows = new Map<
        string,
        { key: DataTableCell; cells: Map<string, DataTableCell> }
    >();

    data.forEach((d) => {
        const rowKey = row(d);
        const columnKey = column(d);
        const id =
            rowKey instanceof Date ? String(rowKey.getTime()) : String(rowKey);

        if (!columns.includes(columnKey)) {
            columns.push(columnKey);
        }
        if (!rows.has(id)) {
            rows.set(id, { key: rowKey, cells: new Map() });
        }
        rows.get(id)?.cells.set(columnKey, value(d));
    });

    const entries = [...rows.values()];

    if (sortRows) {
        entries.sort((a, b) => sortRows(a.key, b.key));
    }

    return {
        columns: [heading, ...columns],
        rows: entries.map(({ key, cells }) => [
            key,
            ...columns.map((columnKey) => cells.get(columnKey)),
        ]),
    };
};

/** Orders dates or numbers ascending, for {@link pivotTable}'s `sortRows` */
export const ascending = (a: DataTableCell, b: DataTableCell) =>
    Number(a) - Number(b);

/**
 * Whether the reader's system asks for reduced motion. Charts check it on
 * every render, so `isAnimated` gives way to it, and a change to the setting
 * applies from the next render. False where there is no `matchMedia`, as on a
 * server or in jsdom.
 */
export const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A transition's duration in milliseconds, or 0 when the reader's system asks
 * for reduced motion. A transition of 0 still reaches its end state and fires
 * its end event, so code that waits for it keeps working.
 * @param duration  The duration with motion
 */
export const motionDuration = (duration: number): number =>
    prefersReducedMotion() ? 0 : duration;
