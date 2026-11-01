import { hcl } from 'd3-color';
import { dispatch } from 'd3-dispatch';
import * as d3Format from 'd3-format';
import type { FormatLocaleObject } from 'd3-format';
import { hierarchy, treemap as treemapLayout } from 'd3-hierarchy';
import type { HierarchyRectangularNode } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import type { ScaleOrdinal } from 'd3-scale';
import { pointer, select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import 'd3-transition';

import { exportChart } from '../helpers/export.js';
import { renderChart } from '../helpers/render.js';
import {
    claimTooltip,
    connectTooltip,
    releaseTooltip,
} from '../helpers/tooltip.js';
import type { TooltipLabels } from '../helpers/tooltip.js';
import type { TooltipModule } from '../tooltip/tooltip.js';
import { treemapLoadingMarkup } from '../helpers/load.js';
import colorHelper from '../helpers/color.js';
import { motion } from '../helpers/constants.js';
import { localeFormatterFor } from '../helpers/locale.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type { LocalObject } from '../../typings/common/local.js';
import type { ColorsSchemasType } from '../../typings/helpers/colors.js';
import type {
    AccessibleChartAPI,
    AnimatedChartAPI,
    BaseAPI,
    DataTableChartAPI,
    ExportableChartAPI,
    InteractiveChartAPI,
    KeyboardChartAPI,
    RenderableChartAPI,
    TooltipChartAPI,
} from '../../typings/common/base.js';
import {
    labelChart,
    prefersReducedMotion,
    renderDataTable,
} from '../helpers/a11y.js';
import type { DataTable } from '../helpers/a11y.js';
import { enableKeyboardNavigation } from '../helpers/keyboard.js';
import type { KeyboardStop } from '../helpers/keyboard.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';

export declare enum TreemapChartKeys {
    Name = 'name',
    Value = 'value',
}

export type TreemapChartDataShape = {
    [TreemapChartKeys.Name]: string;
    [TreemapChartKeys.Value]: number;
};

export interface TreemapChartAPI
    extends
        AccessibleChartAPI<TreemapChartModule>,
        RenderableChartAPI<TreemapChartModule, TreemapChartDataShape[]>,
        TooltipChartAPI<TreemapChartModule>,
        DataTableChartAPI<TreemapChartModule>,
        KeyboardChartAPI<TreemapChartModule>,
        BaseAPI<TreemapChartModule>,
        AnimatedChartAPI<TreemapChartModule>,
        InteractiveChartAPI<TreemapChartModule>,
        ExportableChartAPI {
    /** Gets or Sets whether the chart labels its cells */
    enableLabels(): boolean;
    enableLabels(isEnabled: boolean): TreemapChartModule;
    /** Gets or Sets the d3-format string of the values on the cells */
    labelsNumberFormat(): string;
    labelsNumberFormat(format: string): TreemapChartModule;
    /** Gets or Sets the locale the values on the cells are formatted with */
    valueLocale(): LocalObject | null;
    valueLocale(localObject: LocalObject | null): TreemapChartModule;
}

export type TreemapChartModule = ChartModuleSelection<TreemapChartDataShape[]> &
    TreemapChartAPI;

/**
 * Treemap Chart reusable API module that shows how a total divides into its
 * parts: each entry is a rectangle with an area proportional to its value.
 *
 * @module Treemap
 * @tutorial treemap
 *
 * @example
 * import { treemap } from '@britecharts/core';
 *
 * // dataset: [{ name, value }]
 * treemap()
 *     .width(500)
 *     .height(300)
 *     .render('.css-selector', dataset);
 */

/**
 * The data a treemap takes: one entry per cell. Entries with a value of zero
 * or less have no area, so they are not drawn, but they stay in the data
 * table.
 * @typedef {Object[]} TreemapData
 * @property {String} name      The cell's name
 * @property {Number} value     The cell's size
 *
 * @example
 * [
 *     {
 *         name: 'Rent',
 *         value: 1200
 *     },
 *     {
 *         name: 'Groceries',
 *         value: 480
 *     }
 * ]
 */

/**
 * A node of the layout. The root carries no value of its own: d3 sums it from
 * the cells.
 */
type TreemapNode = Partial<TreemapChartDataShape> & {
    children?: TreemapNode[];
};

type TreemapCell = HierarchyRectangularNode<TreemapNode>;

/**
 * The chart's own svg, and the selections derived from it. The generics are a
 * bounded `any`, for the reason `filter.ts` sets out.
 */
type ChartSelection<TElement extends BaseType> = Selection<
    TElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

const NUMBER_FORMAT = ',';

export default function module(): TreemapChartModule {
    let margin: ChartMarginParams = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        width = 780,
        height = 400,
        isLoading = false,
        svg: ChartSelection<SVGSVGElement>,
        data: TreemapChartDataShape[],
        chartWidth: number,
        chartHeight: number,
        cells: TreemapCell[],
        colorScale: ScaleOrdinal<string, string>,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        animationDuration: number = motion.duration,
        isAnimated = false,
        enableLabels = true,
        labelsNumberFormat = NUMBER_FORMAT,
        locale: LocalObject | null = null,
        localeFormatter: FormatLocaleObject = d3Format;

    const cellGap = 2;
    const labelSize = 12;
    const labelLineHeight = 16;
    const labelPadding = 6;
    // Wider than the average character of a proportional font, so a label
    // that passes the check fits. Measuring each label would mean a canvas
    // per cell on every draw.
    const characterWidth = 0.6;
    // The lightness at which black text starts reading better than white
    const darkLabelLightness = 50;
    const dispatcher = dispatch(
        'customMouseOver',
        'customMouseOut',
        'customMouseMove',
        'customClick'
    );
    const getCellColor = ({ data: { name } }: TreemapCell) =>
        colorScale(name as string);
    const getLabelColor = (cell: TreemapCell) =>
        hcl(getCellColor(cell)).l > darkLabelLightness ? '#000' : '#fff';
    const getCellWidth = ({ x0, x1 }: TreemapCell) => x1 - x0;
    const getCellHeight = ({ y0, y1 }: TreemapCell) => y1 - y0;
    const getFormattedValue = ({ data: { value } }: TreemapCell) =>
        localeFormatter.format(labelsNumberFormat)(value as number);
    const textFits = (text: string, available: number, fontSize: number) =>
        text.length * fontSize * characterWidth <= available;

    // Generic for the reason set out on the heatmap: it is what
    // `ChartModuleSelection` declares.
    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     */
    const exports = function <
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            TreemapChartDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            data = cleanData(_data);

            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            if (locale) {
                localeFormatter = localeFormatterFor(locale);
            }

            buildSVG(this);
            renderDataTable(
                svg.node(),
                a11yDataTable && !isLoading ? dataTable() : null
            );
            enableKeyboardNavigation(svg.node(), {
                isEnabled: a11yKeyboardNavigation && !isLoading,
                stops: keyboardStops,
            });
            if (isLoading) {
                drawLoadingState();

                return;
            }
            cleanLoadingState();
            buildScales();
            buildLayout();
            drawCells();
            drawLabels();
            if (chartTooltip) {
                connectTooltip(
                    exports as unknown as TreemapChartModule,
                    chartTooltip,
                    svg,
                    tooltipLabels
                );
            }
        });
        // One assertion for the whole module, as on the heatmap
    } as unknown as TreemapChartModule;

    let a11yTitle: string | null = null;
    let a11yDescription: string | null = null;
    let a11yDataTable = true;
    let a11yKeyboardNavigation = true;
    let chartTooltip: TooltipModule | null = null;
    // Its data points carry `name` and `value`, which the tooltip reads
    const tooltipLabels: TooltipLabels = {};

    /**
     * Where keyboard focus can rest: each cell, largest first
     * @private
     */
    function keyboardStops(): KeyboardStop[] {
        return svg
            .selectAll<SVGRectElement, TreemapCell>('.cell')
            .nodes()
            .map((target) => ({ target }));
    }

    /**
     * The chart's data as a table, for screen readers: each entry's name and
     * value
     * @private
     */
    function dataTable(): DataTable {
        return {
            columns: ['Name', 'Value'],
            rows: data.map(({ name, value }) => [name, value]),
        };
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart treemap', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height].join(','))
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);

        // On every draw, not only the first, so new margins move the chart
        svg.select('.container-group')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            // So cells drawn before a refetch don't show through the skeleton
            .style('display', () => (isLoading ? 'none' : null));

        labelChart(svg.node(), {
            a11yTitle,
            a11yDescription,
            fallbackTitle: 'Treemap',
        });
    }

    /**
     * Cleans the loading state
     * @private
     */
    function cleanLoadingState(): void {
        svg.select('.loading-state-group svg').remove();
    }

    /**
     * Draws the loading state
     * @private
     */
    function drawLoadingState(): void {
        svg.select('.loading-state-group').html(treemapLoadingMarkup);
    }

    /**
     * Builds containers for the chart, the labels and a wrapper for all of them
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg.append('g').classed('container-group', true);

        svg.append('g').classed('loading-state-group', true);

        container.append('g').classed('chart-group', true);
        container.append('g').classed('labels-group', true);
        container.append('g').classed('metadata-group', true);
    }

    /**
     * Casts the values to numbers, keeping the rest of each entry's
     * properties, so event handlers receive them
     * @param   originalData  Raw data as passed to the container
     * @return                Clean data
     * @private
     */
    function cleanData(
        originalData: TreemapChartDataShape[]
    ): TreemapChartDataShape[] {
        return originalData.map((entry) => ({
            ...entry,
            value: +entry.value,
        }));
    }

    /**
     * Creates the colour scale. Its domain follows the data's order, so a
     * cell keeps its colour when a new value changes the sizes.
     * @private
     */
    function buildScales(): void {
        colorScale = scaleOrdinal<string, string>()
            .domain(data.map(({ name }) => name))
            .range(colorSchema);
    }

    /**
     * Lays the cells out
     * @private
     */
    function buildLayout(): void {
        const entries = data.filter(({ value }) => value > 0);
        const root = treemapLayout<TreemapNode>()
            .size([chartWidth, chartHeight])
            .paddingInner(cellGap)(
            hierarchy<TreemapNode>({ children: entries })
                .sum(({ value }) => value ?? 0)
                .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
        );

        // Without entries the root is a leaf itself, and it is no cell
        cells = entries.length ? root.leaves() : [];
    }

    /**
     * Draws the cells, by position in the data rather than by name, since
     * nothing says names are unique
     * @private
     */
    function drawCells(): void {
        const shouldAnimate = isAnimated && !prefersReducedMotion();
        const cellElements = svg
            .select('.chart-group')
            .selectAll<SVGRectElement, TreemapCell>('.cell')
            .data(cells);

        cellElements.exit().remove();

        const newCells = cellElements
            .enter()
            .append('rect')
            .classed('cell', true)
            .attr('x', ({ x0 }) => x0)
            .attr('y', ({ y0 }) => y0)
            .attr('width', getCellWidth)
            .attr('height', getCellHeight)
            .style('fill', getCellColor)
            .on('mouseover', function (event: MouseEvent, d) {
                handleMouseOver(this, d, event);
            })
            .on('mousemove', function (event: MouseEvent, d) {
                handleMouseMove(this, d, event);
            })
            .on('mouseout', function (event: MouseEvent, d) {
                handleMouseOut(this, d, event);
            })
            .on('click', function (event: MouseEvent, d) {
                handleClick(this, d, event);
            });
        const allCells = newCells.merge(cellElements);

        if (shouldAnimate) {
            newCells.style('opacity', 0);
            allCells
                .transition()
                .duration(animationDuration)
                .attr('x', ({ x0 }) => x0)
                .attr('y', ({ y0 }) => y0)
                .attr('width', getCellWidth)
                .attr('height', getCellHeight)
                .style('fill', getCellColor)
                .style('opacity', 1);
        } else {
            allCells
                .interrupt()
                .attr('x', ({ x0 }) => x0)
                .attr('y', ({ y0 }) => y0)
                .attr('width', getCellWidth)
                .attr('height', getCellHeight)
                .style('fill', getCellColor)
                .style('opacity', 1);
        }
    }

    /**
     * Draws a set of labels. They ignore the pointer, so hovering one still
     * hovers its cell.
     * @param  className The labels' class
     * @param  labels    The nodes to label
     * @param  text      The text of a node's label
     * @return           The labels
     * @private
     */
    function drawLabelSet(
        className: string,
        labels: TreemapCell[],
        text: (node: TreemapCell) => string
    ) {
        return svg
            .select('.labels-group')
            .selectAll<SVGTextElement, TreemapCell>(`.${className}`)
            .data(labels)
            .join('text')
            .classed(className, true)
            .text(text)
            .attr('x', ({ x0 }) => x0 + labelPadding)
            .style('pointer-events', 'none');
    }

    /**
     * Draws the cells' names and values. Each shows only where it fits, and
     * the text is black or white, whichever reads better on the cell.
     * @private
     */
    function drawLabels(): void {
        const available = (cell: TreemapCell) =>
            getCellWidth(cell) - labelPadding * 2;
        const namedCells = enableLabels
            ? cells.filter(
                  (cell) =>
                      textFits(
                          cell.data.name as string,
                          available(cell),
                          labelSize
                      ) &&
                      getCellHeight(cell) >= labelLineHeight + labelPadding * 2
              )
            : [];
        const valuedCells = namedCells.filter(
            (cell) =>
                textFits(getFormattedValue(cell), available(cell), labelSize) &&
                getCellHeight(cell) >= labelLineHeight * 2 + labelPadding * 2
        );

        drawLabelSet('cell-label', namedCells, ({ data: { name } }) => name!)
            .attr('y', ({ y0 }) => y0 + labelPadding + labelLineHeight / 2)
            .style('dominant-baseline', 'central')
            .style('fill', getLabelColor)
            .style('font-size', labelSize)
            .style('font-weight', 600);
        drawLabelSet('cell-value', valuedCells, getFormattedValue)
            .attr('y', ({ y0 }) => y0 + labelPadding + labelLineHeight * 1.5)
            .style('dominant-baseline', 'central')
            .style('fill', getLabelColor)
            .style('font-size', labelSize);

        const labels = svg.selectAll('.labels-group text');

        if (isAnimated && !prefersReducedMotion()) {
            labels
                .style('opacity', 0)
                .transition()
                .duration(animationDuration)
                .style('opacity', 1);
        } else {
            labels.interrupt().style('opacity', 1);
        }
    }

    /**
     * What the chart sends with its events, after the chart's size
     * @private
     */
    function eventArguments(
        e: SVGRectElement,
        event: MouseEvent
    ): [[number, number], [number, number]] {
        return [pointer(event, e), [chartWidth, chartHeight]];
    }

    /** @private */
    function handleMouseOver(
        e: SVGRectElement,
        d: TreemapCell,
        event: MouseEvent
    ): void {
        select(e).style('fill', String(hcl(getCellColor(d)).darker(0.6)));
        dispatcher.call(
            'customMouseOver',
            e,
            d.data,
            ...eventArguments(e, event)
        );
    }

    /** @private */
    function handleMouseMove(
        e: SVGRectElement,
        d: TreemapCell,
        event: MouseEvent
    ): void {
        dispatcher.call(
            'customMouseMove',
            e,
            d.data,
            ...eventArguments(e, event)
        );
    }

    /** @private */
    function handleMouseOut(
        e: SVGRectElement,
        d: TreemapCell,
        event: MouseEvent
    ): void {
        select(e).style('fill', getCellColor(d));
        dispatcher.call(
            'customMouseOut',
            e,
            d.data,
            ...eventArguments(e, event)
        );
    }

    /** @private */
    function handleClick(
        e: SVGRectElement,
        d: TreemapCell,
        event: MouseEvent
    ): void {
        dispatcher.call('customClick', e, d.data, ...eventArguments(e, event));
    }

    // API
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset, the chart is announced as
     * "Treemap".
     * @param  {String | null} _x     Desired accessible title for the chart
     * @return {String | null | module} Current a11yTitle or Chart module to chain calls
     * @public
     */
    exports.a11yTitle = function (
        this: TreemapChartModule,
        _x?: string | null
    ) {
        if (!arguments.length) {
            return a11yTitle;
        }
        a11yTitle = _x as string | null;

        return this;
    } as TreemapChartModule['a11yTitle'];

    /**
     * Gets or Sets a longer description screen readers announce after the
     * chart's name, such as what the data shows. It is rendered as the svg's
     * `<desc>`. Unset, the chart has no description.
     * @param  {String | null} _x     Desired accessible description for the chart
     * @return {String | null | module} Current a11yDescription or Chart module to chain calls
     * @public
     */
    exports.a11yDescription = function (
        this: TreemapChartModule,
        _x?: string | null
    ) {
        if (!arguments.length) {
            return a11yDescription;
        }
        a11yDescription = _x as string | null;

        return this;
    } as TreemapChartModule['a11yDescription'];

    /**
     * Gets or Sets whether the chart renders its data as a visually hidden
     * table after its svg, which screen readers can read cell by cell. On by
     * default; set it to false when the app gives the data its own accessible
     * form.
     * @param  {Boolean} _x     Whether to render the data table
     * @return {Boolean | module} Current a11yDataTable or Chart module to chain calls
     * @public
     */
    exports.a11yDataTable = function (this: TreemapChartModule, _x?: boolean) {
        if (!arguments.length) {
            return a11yDataTable;
        }
        a11yDataTable = _x as boolean;

        return this;
    } as TreemapChartModule['a11yDataTable'];

    /**
     * Gets or Sets whether a keyboard can move through the chart's data
     * points: the chart takes one tab stop, the arrow keys move between
     * points, Home and End go to the first and last, and Escape lets go. The
     * tooltip and highlights follow focus as they follow the pointer. On by
     * default.
     * @param  {Boolean} _x     Whether the keyboard can move through the data
     * @return {Boolean | module} Current a11yKeyboardNavigation or Chart module to chain calls
     * @public
     */
    exports.a11yKeyboardNavigation = function (
        this: TreemapChartModule,
        _x?: boolean
    ) {
        if (!arguments.length) {
            return a11yKeyboardNavigation;
        }
        a11yKeyboardNavigation = _x as boolean;

        return this;
    } as TreemapChartModule['a11yKeyboardNavigation'];

    /**
     * Gets or Sets the duration of the animation
     * @param  {Number} _x=1200         Desired animation duration for the graph
     * @return {duration | module}      Current animation duration or Chart module to chain calls
     * @public
     */
    exports.animationDuration = function (
        this: TreemapChartModule,
        _x?: number
    ) {
        if (!arguments.length) {
            return animationDuration;
        }
        animationDuration = _x as number;

        return this;
    } as TreemapChartModule['animationDuration'];

    /**
     * Gets or Sets the colorSchema of the chart. Each name takes a colour.
     * @param  {String[]} _x=britecharts  Desired colorSchema for the cells
     * @return {String[] | module}        Current colorSchema or Chart module to chain calls
     * @public
     */
    exports.colorSchema = function (this: TreemapChartModule, _x?: string[]) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x as string[];

        return this;
    } as TreemapChartModule['colorSchema'];

    /**
     * Gets or Sets whether the chart labels its cells. A label
     * shows only where it fits: a small cell has no name, and a slightly
     * bigger one no value.
     * @param  {Boolean} _x=true      Whether to draw the labels
     * @return {Boolean | module}     Current enableLabels or Chart module to chain calls
     * @public
     */
    exports.enableLabels = function (this: TreemapChartModule, _x?: boolean) {
        if (!arguments.length) {
            return enableLabels;
        }
        enableLabels = _x as boolean;

        return this;
    } as TreemapChartModule['enableLabels'];

    /**
     * Exports the chart and fires a download: an svg file when the filename
     * ends in `.svg`, and a png otherwise
     * @param {String} filename     Name of the downloaded file, whose extension picks the format
     * @param {String} title        Title to add at the top of the exported picture
     * @public
     */
    exports.exportChart = function (filename: string, title: string) {
        return exportChart.call(exports, svg, filename, title);
    } as TreemapChartModule['exportChart'];

    /**
     * Gets or Sets the height of the chart
     * @param  {Number} _x=400      Desired height for the chart
     * @return {Number | module}    Current height or Chart module to chain calls
     * @public
     */
    exports.height = function (this: TreemapChartModule, _x?: number) {
        if (!arguments.length) {
            return height;
        }
        height = _x as number;

        return this;
    } as TreemapChartModule['height'];

    /**
     * Gets or Sets the isAnimated value of the chart. New cells fade in and
     * existing ones move to their new place.
     * The chart draws without animation when the reader's system asks for
     * reduced motion (`prefers-reduced-motion`), whatever this is set to.
     * @param  {Boolean} _x=false         Decide whether to show chart animation
     * @return {Boolean | module}         Current isAnimated value or Chart module to chain calls
     * @public
     */
    exports.isAnimated = function (this: TreemapChartModule, _x?: boolean) {
        if (!arguments.length) {
            return isAnimated;
        }
        isAnimated = _x as boolean;

        return this;
    } as TreemapChartModule['isAnimated'];

    /**
     * Gets or Sets the loading state of the chart
     * @param  {boolean} _flag          Desired value for the loading state
     * @return {boolean | module}       Current loading state flag or Chart module to chain calls
     * @public
     * @example chart.isLoading(true)
     */
    exports.isLoading = function (this: TreemapChartModule, _flag?: boolean) {
        if (!arguments.length) {
            return isLoading;
        }
        isLoading = _flag as boolean;

        return this;
    } as TreemapChartModule['isLoading'];

    /**
     * Gets or Sets the d3-format string of the values on the cells
     * @param  {String} _x=','      Desired format
     * @return {String | module}    Current labelsNumberFormat or Chart module to chain calls
     * @public
     * @example treemapChart.labelsNumberFormat('$,.0f')
     */
    exports.labelsNumberFormat = function (
        this: TreemapChartModule,
        _x?: string
    ) {
        if (!arguments.length) {
            return labelsNumberFormat;
        }
        labelsNumberFormat = _x as string;

        return this;
    } as TreemapChartModule['labelsNumberFormat'];

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set
     * @return {margin | module}    Current margin or Chart module to chain calls
     * @public
     */
    exports.margin = function (
        this: TreemapChartModule,
        _x?: ChartMarginParams
    ) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as TreemapChartModule['margin'];

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customClick.
     * Each sends the entry, the pointer's position and the chart's size.
     *
     * @return {module} Treemap Chart
     * @public
     */
    exports.on = function (...args: [string] | [string, () => void]) {
        const value = dispatcher.on(
            ...(args as Parameters<typeof dispatcher.on>)
        );

        return value === dispatcher ? exports : value;
    } as TreemapChartModule['on'];

    /**
     * Gets or Sets the tooltip the chart shows: a `tooltip()`, set on this
     * chart only. The chart connects it to its
     * pointer and keyboard events, draws it in place, and sets the labels its
     * data points need, unless they were set on the tooltip; it does so now
     * if the chart has drawn, and again on every draw. Its event handlers go
     * under the `britechartsTooltip` namespace. Null, or another tooltip,
     * removes the one it had.
     * @param  {module | null} _x  The tooltip to show
     * @return {module | null} Current tooltip or Chart module to chain calls
     * @throws {Error} When the tooltip is already set on another chart
     * @public
     * @example
     * treemap().tooltip(tooltip()).render('#chart', data);
     */
    (exports as TreemapChartModule).tooltip = function (
        this: TreemapChartModule,
        _x
    ) {
        if (!arguments.length) {
            return chartTooltip;
        }
        if (_x === chartTooltip) {
            return this;
        }
        if (_x) {
            claimTooltip(this, _x);
        }
        if (chartTooltip) {
            releaseTooltip(this, chartTooltip);
        }
        chartTooltip = _x;

        // A chart that has drawn connects it now rather than on its next draw
        if (chartTooltip && svg) {
            connectTooltip(this, chartTooltip, svg, tooltipLabels);
        }

        return this;
    } as TreemapChartModule['tooltip'];

    /**
     * Draws the chart into a target: a CSS selector, an element or a d3
     * selection, as `select(target).datum(data).call(chart)` does. A selector
     * draws into the first element it matches. Without data, the chart
     * redraws with the data it last drew there.
     * @param  {String | Element | D3Selection} target Where to draw the chart
     * @param  {Object} [data]  The data to draw
     * @return {module} The chart module, to chain calls
     * @throws {Error} When the target matches no element
     * @public
     * @example
     * treemap().width(600).render('#chart', data);
     */
    (exports as TreemapChartModule).render = function (
        this: TreemapChartModule,
        target,
        data
    ) {
        return renderChart(this, target, data);
    } as TreemapChartModule['render'];

    /**
     * Gets or Sets the locale the values on the cells are formatted with.
     * Check [the d3-format docs]{@link https://github.com/d3/d3-format#formatLocale} for the required values.
     * @param  {LocaleObject | null} _x  Desired locale
     * @return {LocaleObject | null | module} Current locale or Chart module to chain calls
     * @public
     */
    exports.valueLocale = function (
        this: TreemapChartModule,
        _x?: LocalObject | null
    ) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x as LocalObject | null;

        return this;
    } as TreemapChartModule['valueLocale'];

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} _x=780           Desired width for the chart
     * @return {Number | module}         Current width or Chart module to chain calls
     * @public
     */
    exports.width = function (this: TreemapChartModule, _x?: number) {
        if (!arguments.length) {
            return width;
        }
        width = _x as number;

        return this;
    } as TreemapChartModule['width'];

    return exports;
}
