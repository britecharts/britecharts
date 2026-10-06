import { format } from 'd3-format';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import type { BaseType, Selection } from 'd3-selection';
import type { ScaleOrdinal } from 'd3-scale';
import 'd3-transition';

import * as textHelper from '../helpers/text';
import colorHelper from '../helpers/color';
import type { ChartMarginParams } from '../../typings/common/margin';
import type { ColorsSchemasType } from '../../typings/helpers/colors';
import type {
    LegendDataShape,
    LegendModule,
} from '../../typings/charts/legend-component';

/**
 * The component's own svg, and the selections derived from it. The datum and
 * parent generics are the migration plan's bounded `any`, as in `bullet.ts`:
 * these are module-level variables reassigned from several differently-shaped
 * selections, so naming one concrete datum would reject the others.
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

/**
 * What `cleanData` hands the drawing functions: the same objects, with `id`
 * and `quantity` coerced to numbers and `name` to a string in place.
 *
 * `quantity` stays optional because the component supports data without it --
 * that is what `hasQuantities` decides, and a legend with no quantities skips
 * the value column entirely.
 */
type LegendDatum = {
    id: number;
    name: string;
    quantity?: number;
};

/**
 * @fileOverview Legend Component reusable API class that renders a
 * simple and configurable legend element.
 *
 * @module Legend
 * @tutorial legend
 * @exports charts/legend
 * @requires d3-format, d3-scale, d3-selection, d3-transition
 *
 * @example
 * const donutChart = donut(),
 *     legendBox = legend();
 *
 * donutChart
 *     .externalRadius(500)
 *     .internalRadius(200)
 *     .on('customMouseOver', function(data) {
 *         legendBox.highlight(data.data.id);
 *     })
 *     .on('customMouseOut', function() {
 *         legendBox.clearHighlight();
 *     });
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(donutChart);
 *
 * d3Selection.select('.other-css-selector')
 *     .datum(dataset)
 *     .call(legendBox);
 *
 */

/**
 * @typedef LegendChartData
 * @type {Object[]}
 * @property {Number} id        Id of the group (required)
 * @property {String} name      Name of the group (required)
 * @property {Number} quantity  Quantity of the group (optional)
 *
 * @example
 * [
 *     {
 *         id: 1,
 *         quantity: 2,
 *         name: 'glittering'
 *     },
 *     {
 *         id: 2,
 *         quantity: 3,
 *         name: 'luminous'
 *     }
 * ]
 */

export default function module(): LegendModule {
    // Split into `let` and `const` rather than the one `let` chain the
    // JavaScript had: the TypeScript ESLint override runs `prefer-const` as an
    // error, and the bindings below it are never reassigned.
    let margin: ChartMarginParams = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
        },
        width = 320,
        height = 180,
        markerSize = 16,
        marginRatio = 1.5,
        numberFormat = 's',
        unit = '',
        isHorizontal = false,
        highlightedEntryId: number | null = null,
        hasQuantities = true,
        // colors
        colorScale: ScaleOrdinal<string, string>,
        nameToColorMap: Record<string, string> | null = null,
        colorSchema: ColorsSchemasType = colorHelper.colorSchemas.britecharts,
        // The data join, reassigned by both draw functions. `SVGGElement`
        // rather than the bounded `BaseType`: `.merge()` below needs the
        // element named, and both joins really do bind `g` elements.
        entries: ChartSelection<SVGGElement>,
        chartWidth: number,
        chartHeight: number,
        data: LegendDatum[],
        svg: ChartSelection<SVGSVGElement>;

    const textSize = 12;
    const textLetterSpacing = 0.5;
    const markerYOffset = -(textSize - 2) / 2;
    const valueReservedSpace = 40;
    const numberLetterSpacing = 0.8;
    const isFadedClassName = 'is-faded';

    const getId = ({ id }: LegendDatum) => id;
    const getName = ({ name }: LegendDatum) => name;
    const getFormattedQuantity = ({ quantity }: LegendDatum) =>
        // `quantity` is only read when `hasQuantities` is true, which is
        // exactly when every datum has one -- a guard TypeScript cannot see
        // from here, since `writeEntryValues` is the only caller.
        format(numberFormat)(quantity as number) + unit;
    const getMarkerFill = ({ name }: LegendDatum) => {
        if (nameToColorMap !== null) {
            return nameToColorMap[name]
                ? nameToColorMap[name]
                : colorScale(name);
        }

        return colorScale(name);
    };
    // Takes the raw datum rather than `LegendDatum`: this runs inside
    // `cleanData`, before the coercion, and the string case is the point --
    // quantities arrive from JSON as strings often enough that the check
    // accepts both.
    const hasQuantity = ({ quantity }: LegendDataShape) =>
        typeof quantity === 'number' || typeof quantity === 'string';

    /**
     * This function creates the graph using the selection as container
     * @param  {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {LegendChartData} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            LegendDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (_data) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);
            data = cleanData(_data);

            buildColorScale();
            buildSVG(this);

            if (isHorizontal) {
                drawHorizontalLegend();
            } else {
                drawVerticalLegend();
            }

            if (highlightedEntryId) {
                cleanFadedLines();
                fadeLinesBut(highlightedEntryId);
            }
        });
    }

    /**
     * Depending on the size of the horizontal legend, we are going to add a new
     * line with the last entry of the legend
     * @return {void}
     * @private
     */
    function adjustLines(): void {
        // `node()` is typed nullable. Asserted rather than guarded so the
        // behaviour is unchanged: where a null node would now throw on the
        // same line, it threw there before too.
        const lineWidth =
            svg
                .select<SVGGElement>('.legend-line')
                .node()!
                .getBoundingClientRect().width + markerSize;
        const lineWidthSpace = chartWidth - lineWidth;

        if (lineWidthSpace <= 0) {
            splitInLines();
        }

        centerInlineLegendOnSVG();
    }

    /**
     * Builds containers for the legend
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups(): void {
        const container = svg
            .append('g')
            .classed('legend-container-group', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        container.append('g').classed('legend-group', true);
    }

    /**
     * Builds color scale for chart
     * @private
     */
    function buildColorScale(): void {
        colorScale = scaleOrdinal<string, string>().range(colorSchema);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element): void {
        if (!svg) {
            svg = select(container)
                .append('svg')
                .classed('britechart britechart-legend', true);

            buildContainerGroups();
        }

        svg.attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Centers the legend on the chart given that is a single line of labels
     * @return {void}
     * @private
     */
    function centerInlineLegendOnSVG(): void {
        const legendGroupSize =
            svg
                .select<SVGGElement>('g.legend-container-group')
                .node()!
                .getBoundingClientRect().width + getLineElementMargin();
        const emptySpace = width - legendGroupSize;
        const newXPosition = emptySpace / 2;

        if (emptySpace > 0) {
            svg.select('g.legend-container-group').attr(
                'transform',
                `translate(${newXPosition},0)`
            );
        }
    }

    /**
     * Centers the legend on the chart given that is a stack of labels
     * @return {void}
     * @private
     */
    function centerVerticalLegendOnSVG(): void {
        const legendGroupSize = svg
            .select<SVGGElement>('g.legend-container-group')
            .node()!
            .getBoundingClientRect().width;
        const emptySpace = width - legendGroupSize;
        const newXPosition = emptySpace / 2 - legendGroupSize / 2;

        if (emptySpace > 0) {
            svg.select('g.legend-container-group').attr(
                'transform',
                `translate(${newXPosition},0)`
            );
        }
    }

    /**
     * Makes sure the types of the data are right and checks if it has quantities
     * @param {LegendChartData} data
     * @private
     */
    function cleanData(data: LegendDataShape[]): LegendDatum[] {
        hasQuantities = data.filter(hasQuantity).length === data.length;

        return data.reduce<LegendDatum[]>((acc, d) => {
            // The same object, mutated in place, which is what this component
            // has always done -- every other key the datum carries survives.
            const datum = d as unknown as LegendDatum;

            if (datum.quantity !== undefined && datum.quantity !== null) {
                datum.quantity = +datum.quantity;
            }
            datum.name = String(datum.name);
            datum.id = +datum.id;

            return [...acc, datum];
        }, []);
    }

    /**
     * Removes the faded class from all the entry lines
     * @private
     */
    function cleanFadedLines(): void {
        svg.select('.legend-group')
            .selectAll('g.legend-entry')
            .classed(isFadedClassName, false);
    }

    /**
     * Draws the entries of the legend within a single line
     * @private
     */
    function drawHorizontalLegend(): void {
        let xOffset = markerSize;

        svg.select('.legend-group').selectAll('g').remove();

        // We want a single line
        svg.select('.legend-group').append('g').classed('legend-line', true);

        // And one entry per data item
        entries = svg
            .select('.legend-line')
            .selectAll<SVGGElement, LegendDatum>('g.legend-entry')
            .data(data);

        // Enter
        entries
            .enter()
            .append('g')
            .classed('legend-entry', true)
            .attr('data-item', getId)
            .attr('transform', function ({ name }) {
                const horizontalOffset = xOffset;
                const lineHeight = chartHeight / 2;
                const verticalOffset = lineHeight;
                const labelWidth = textHelper.getTextWidth(name, textSize);

                xOffset += markerSize + 2 * getLineElementMargin() + labelWidth;

                return `translate(${horizontalOffset},${verticalOffset})`;
            })
            .merge(entries)
            .append('circle')
            .classed('legend-circle', true)
            .attr('cx', markerSize / 2)
            .attr('cy', markerYOffset)
            .attr('r', markerSize / 2)
            .style('fill', getMarkerFill)
            .style('stroke-width', 1);

        svg.select('.legend-group')
            .selectAll<SVGGElement, LegendDatum>('g.legend-entry')
            .append('text')
            .classed('legend-entry-name', true)
            .text(getName)
            .attr('x', getLineElementMargin())
            .style('font-size', `${textSize}px`)
            .style('letter-spacing', `${textLetterSpacing}px`);

        // Exit
        svg.select('.legend-group')
            .selectAll('g.legend-entry')
            .exit()
            .transition()
            .style('opacity', 0)
            .remove();

        adjustLines();
    }

    /**
     * Draws the entries of the legend
     * @private
     */
    function drawVerticalLegend(): void {
        svg.select('.legend-group').selectAll('g').remove();

        entries = svg
            .select('.legend-group')
            .selectAll<SVGGElement, LegendDatum>('g.legend-line')
            .data(data);

        // Enter
        entries
            .enter()
            .append('g')
            .classed('legend-line', true)
            .append('g')
            .classed('legend-entry', true)
            .attr('data-item', getId)
            .attr('transform', function (d, i) {
                const horizontalOffset = markerSize + getLineElementMargin();
                const lineHeight = chartHeight / (data.length + 1);
                const verticalOffset = (i + 1) * lineHeight;

                return `translate(${horizontalOffset},${verticalOffset})`;
            })
            .merge(entries)
            .append('circle')
            .classed('legend-circle', true)
            .attr('cx', markerSize / 2)
            .attr('cy', markerYOffset)
            .attr('r', markerSize / 2)
            .style('fill', getMarkerFill)
            .style('stroke-width', 1);

        svg.select('.legend-group')
            .selectAll('g.legend-line')
            .selectAll<SVGGElement, LegendDatum>('g.legend-entry')
            .append('text')
            .classed('legend-entry-name', true)
            .text(getName)
            .attr('x', getLineElementMargin())
            .style('font-size', `${textSize}px`)
            .style('letter-spacing', `${textLetterSpacing}px`);

        if (hasQuantities) {
            writeEntryValues();
        } else {
            centerVerticalLegendOnSVG();
        }

        // Exit
        svg.select('.legend-group')
            .selectAll('g.legend-line')
            .exit()
            .transition()
            .style('opacity', 0)
            .remove();
    }

    /**
     * Applies the faded class to all lines but the one that has the given id
     * @param  {number} exceptionItemId Id of the line that needs to stay the same
     * @private
     */
    function fadeLinesBut(exceptionItemId: number): void {
        const classToFade = 'g.legend-entry';
        const entryLine = svg.select(`[data-item="${exceptionItemId}"]`);

        if (entryLine.nodes().length) {
            svg.select('.legend-group')
                .selectAll(classToFade)
                .classed(isFadedClassName, true);

            entryLine.classed(isFadedClassName, false);
        }
    }

    /**
     * Calculates the margin between elements of the legend
     * @return {Number} Margin to apply between elements
     * @private
     */
    function getLineElementMargin(): number {
        return marginRatio * markerSize;
    }

    /**
     * Simple method to move the last item of an overflowing legend into the next line
     * @return {void}
     * @private
     */
    function splitInLines(): void {
        const legendEntries = svg.selectAll<SVGGElement, unknown>(
            '.legend-entry'
        );
        const numberOfEntries = legendEntries.size();
        const lineHeight = (chartHeight / 2) * 1.7;
        const newLine = svg
            .select('.legend-group')
            .append('g')
            .classed('legend-line', true)
            .attr('transform', `translate(0, ${lineHeight})`);
        const lastEntry = legendEntries.filter(
            `:nth-child(${numberOfEntries})`
        );

        lastEntry.attr('transform', `translate(${markerSize},0)`);
        newLine.append(() => lastEntry.node()!);
    }

    /**
     * Draws the data entry quantities within the legend-entry lines
     * @return {void}
     * @private
     */
    function writeEntryValues(): void {
        svg.select('.legend-group')
            .selectAll('g.legend-line')
            .selectAll<SVGGElement, LegendDatum>('g.legend-entry')
            .append('text')
            .classed('legend-entry-value', true)
            .text(getFormattedQuantity)
            .attr('x', chartWidth - valueReservedSpace)
            .style('font-size', `${textSize}px`)
            .style('letter-spacing', `${numberLetterSpacing}px`)
            .style('text-anchor', 'end')
            .style('startOffset', '100%');
    }

    // API

    /**
     * Command that clears all highlighted entries on a legend instance
     * @public
     */
    (exports as LegendModule).clearHighlight = function () {
        cleanFadedLines();
    } as LegendModule['clearHighlight'];

    /**
     * Gets or Sets the colorMap of the chart
     * @param  {object} [_x=null]    Color map
     * @return {object | module}     Current colorMap or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).colorMap = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return nameToColorMap;
        }
        nameToColorMap = _x;

        return this;
    } as LegendModule['colorMap'];

    /**
     * Gets or Sets the colorSchema of the chart
     * @param  {array} [_x=colorHelper.colorSchemas.britecharts]    Color scheme array to get/set
     * @return {number | module}                                    Current colorSchema or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).colorSchema = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return colorSchema;
        }
        colorSchema = _x;

        return this;
    } as LegendModule['colorSchema'];

    /**
     * Gets or Sets the height of the legend chart
     * @param  {number} [_x=180]        Desired width for the chart in pixels
     * @return {height | module}    Current height or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).height = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    } as LegendModule['height'];

    /**
     * Command that highlights a line entry by fading the rest of lines on a legend instance
     * @param  {number} entryId     ID of the entry line
     * @public
     */
    (exports as LegendModule).highlight = function (entryId) {
        cleanFadedLines();
        fadeLinesBut(entryId);
    } as LegendModule['highlight'];

    /**
     * Gets or Sets the id of the entry to highlight
     * @param  {Number} [_x=null]           Entry id
     * @return { (Number | Module) }        Current highlighted slice id or Donut Chart module to chain calls
     * @public
     */
    (exports as LegendModule).highlightEntryById = function (
        this: LegendModule,
        _x
    ) {
        if (!arguments.length) {
            return highlightedEntryId;
        }
        highlightedEntryId = _x;

        return this;
    } as LegendModule['highlightEntryById'];

    /**
     * Gets or Sets the horizontal mode on the legend
     * @param  {Boolean} [_x=false]     Desired horizontal mode for the graph
     * @return {Boolean | module}   If it is horizontal or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).isHorizontal = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return isHorizontal;
        }
        isHorizontal = _x;

        return this;
    } as LegendModule['isHorizontal'];

    /**
     * Gets or Sets the margin of the legend chart
     * @param  {object} _x          Margin object to get/set
     * @return {object | module}    Current margin or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).margin = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x,
        };

        return this;
    } as LegendModule['margin'];

    /**
     * Gets or Sets the margin ratio of the legend chart.
     * Used to determine spacing between legend elements.
     * @param  {number} [_x=1.5]    Margin Ratio to get/set
     * @return {number | module}    Current marginRatio or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).marginRatio = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return marginRatio;
        }
        marginRatio = _x;

        return this;
    } as LegendModule['marginRatio'];

    /**
     * Gets or Sets the markerSize of the legend chart.
     * This markerSize will determine the horizontal and vertical size of the colored marks
     * added as color identifiers for the chart's categories.
     *
     * @param  {object} [_x=16]         Margin object to get/set
     * @return {object | module}    Current markerSize or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).markerSize = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return markerSize;
        }
        markerSize = _x;

        return this;
    } as LegendModule['markerSize'];

    /**
     * Gets or Sets the number format of the legend chart
     * @param  {string[]} _x = 's'      Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current number format or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).numberFormat = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as LegendModule['numberFormat'];

    /**
     * Gets or Sets the unit of the value
     * @param  {String} [_x='']     Desired unit
     * @return {String | module}    Current unit or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).unit = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return unit;
        }
        unit = _x;

        return this;
    } as LegendModule['unit'];

    /**
     * Gets or Sets the width of the legend chart
     * @param  {number} [_x=320]    Desired width for the graph in pixels
     * @return {number | module}    Current width or Legend module to chain calls
     * @public
     */
    (exports as LegendModule).width = function (this: LegendModule, _x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    } as LegendModule['width'];

    return exports as unknown as LegendModule;
}
