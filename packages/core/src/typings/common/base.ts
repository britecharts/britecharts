import type { Selection } from 'd3-selection';

import { LocaleString } from './local.js';
import { ColorsSchemasType } from '../helpers/colors.js';
import { ChartMarginParams } from './margin.js';
import { AxisTimeCombination } from '../helpers/constants.js';

export interface ChartBaseAPI<T> {
    /** Gets or Sets the number format of the chart */
    numberFormat(): string;
    numberFormat(format: string): T & ChartBaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(): number;
    height(height: number): T & ChartBaseAPI<T>;
    /** Gets or Sets the loading state of the chart */
    isLoading(): boolean;
    isLoading(isLoading: boolean): T & ChartBaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(): ChartMarginParams;
    margin(margin: ChartMarginParams): T & ChartBaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(): number;
    width(width: number): T & ChartBaseAPI<T>;
}

// Using it on the brush chart, for charts with no 'numberFormat'
export interface ChartBaseAPIMinimal<T> {
    /** Gets or Sets the height of the chart */
    height(): number;
    height(height: number): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the loading state of the chart */
    isLoading(): boolean;
    isLoading(isLoading: boolean): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(): ChartMarginParams;
    margin(margin: ChartMarginParams): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the width of the chart */
    width(): number;
    width(width: number): T & ChartBaseAPIMinimal<T>;
}

export interface ComponentBaseAPI<T> {
    /** Gets or Sets the number format of the chart */
    numberFormat(): string;
    numberFormat(format: string): T & ComponentBaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(): number;
    height(height: number): T & ComponentBaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(): ChartMarginParams;
    margin(margin: ChartMarginParams): T & ComponentBaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(): number;
    width(width: number): T & ComponentBaseAPI<T>;
}

// Using it on Heatmap until getting a good set of API configs
// https://github.com/britecharts/britecharts/issues/845
export interface BaseAPI<T> {
    /** Gets or Sets the colorSchema of the chart */
    colorSchema(): ColorsSchemasType;
    colorSchema(schema: ColorsSchemasType): T & BaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(): number;
    height(height: number): T & BaseAPI<T>;
    /** Gets or Sets the loading state of the chart */
    isLoading(): boolean;
    isLoading(isLoading: boolean): T & BaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(): ChartMarginParams;
    margin(margin: ChartMarginParams): T & BaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(): number;
    width(width: number): T & BaseAPI<T>;
}

// More granular approach
export interface InteractiveChartAPI<T> {
    on(
        eventName: string,
        callback: (...args: any[]) => void
    ): T & InteractiveChartAPI<T>;
    on(eventName: string): (...args: any[]) => void;
}

export interface ChartDimensionsAPI<T> {
    /** Gets or Sets the height of the chart */
    height(): number;
    height(height: number): T & ChartDimensionsAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(): ChartMarginParams;
    margin(margin: ChartMarginParams): T & ChartDimensionsAPI<T>;
    /** Gets or Sets the width of the chart */
    width(): number;
    width(width: number): T & ChartDimensionsAPI<T>;
}

export interface AnimatedChartAPI<T> {
    /** Gets or Sets the isAnimated property of the chart, making it to animate when render. Ignored when the reader's system asks for reduced motion */
    isAnimated(): boolean;
    isAnimated(isAnimated: boolean): T & AnimatedChartAPI<T>;
    /** Gets or Sets the duration of the animation */
    animationDuration(): number;
    animationDuration(duration: number): T & AnimatedChartAPI<T>;
}

export interface ExportableChartAPI {
    /**
     * Executes a command that triggers the download of the current chart: an svg file when the filename ends in `.svg`, and a png otherwise
     * @param filename  The filename of the download, whose extension picks the format
     * @param title     The title attached to the image
     */
    exportChart(filename: string, title: string): Promise<void>;
    // Marked as promise as it is asynchronous, filed a ticket to research about returninga real promise
    // https://github.com/britecharts/britecharts/issues/858
}

export interface ThemableChartAPI<T> {
    /** Gets or Sets the colorSchema of the chart */
    colorSchema(): ColorsSchemasType;
    colorSchema(schema: ColorsSchemasType): T & ThemableChartAPI<T>;
    /**
     * Gets or Sets the colorMap of the chart.
     *
     * The getter is nullable because every chart that exposes this defaults
     * `nameToColorMap` to `null` and falls back to the colour scale until one
     * is set -- bar, donut, grouped-bar, legend, line, scatter-plot,
     * stacked-area and stacked-bar, which is all eight of them.
     */
    colorMap(): Record<string, string> | null;
    colorMap(colorMap: Record<string, string>): T & ThemableChartAPI<T>;
}

export interface TimeSeriesChartAPI<T> {
    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     chart.xAxisFormat(chart.axisTimeCombinations.HOUR_DAY)
     */
    axisTimeCombinations: {
        readonly [
            key in keyof typeof AxisTimeCombination
        ]: (typeof AxisTimeCombination)[key];
    };
    /**
     * Pass language tag for the tooltip to localize the date.
     * Uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    locale(): LocaleString | null;
    locale(localObject: LocaleString | null): T & TimeSeriesChartAPI<T>;
    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     * Accepts the format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     */
    xAxisCustomFormat(): string;
    xAxisCustomFormat(format: string): T & TimeSeriesChartAPI<T>;
    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * It is a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * * @example
     *     chart.xAxisCustomFormat(chart.axisTimeCombinations.HOUR_DAY)
     */
    xAxisFormat(): AxisTimeCombination | `${AxisTimeCombination}`;
    xAxisFormat(
        format: AxisTimeCombination | `${AxisTimeCombination}`
    ): T & TimeSeriesChartAPI<T>;
}

export interface AccessibleChartAPI<T> {
    /**
     * Gets or Sets the name screen readers announce for the chart. It is
     * set as the svg's `aria-label`. Unset,
     * the getter reads `null` and the chart is announced by its type, such as
     * "Bar chart".
     */
    a11yTitle(): string | null;
    a11yTitle(a11yTitle: string | null): T & AccessibleChartAPI<T>;
    /**
     * Gets or Sets a longer description screen readers announce after the
     * name, such as what the data shows. It is rendered as the svg's `<desc>`
     * and linked with `aria-describedby`. Unset, there is no description.
     */
    a11yDescription(): string | null;
    a11yDescription(a11yDescription: string | null): T & AccessibleChartAPI<T>;
}

export interface DataTableChartAPI<T> {
    /**
     * Gets or Sets whether the chart renders its data as a table that screen
     * readers can read, row by row and cell by cell. The table is visually
     * hidden, placed right after the svg and linked from it with
     * `aria-details`; its caption is the chart's name. On by default: set it
     * to false for an app that gives the data its own accessible form.
     */
    a11yDataTable(): boolean;
    a11yDataTable(a11yDataTable: boolean): T & DataTableChartAPI<T>;
}

export interface KeyboardChartAPI<T> {
    /**
     * Gets or Sets whether a keyboard can move through the chart's data
     * points. The chart takes one tab stop; the arrow keys move between
     * points, Home and End go to the first and last, and Escape lets go. The
     * tooltip, highlights and custom events follow focus as they follow the
     * pointer. On by default.
     */
    a11yKeyboardNavigation(): boolean;
    a11yKeyboardNavigation(
        a11yKeyboardNavigation: boolean
    ): T & KeyboardChartAPI<T>;
}

/**
 * Where `render` draws a chart: a CSS selector, an element, or a d3 selection.
 *
 * The selection's types are left open: d3's `Selection` is invariant in them,
 * so naming any would reject the selections callers hold, and the chart reads
 * only the elements and the data bound to them.
 */
export type ChartRenderTarget =
    | string
    | Element
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Selection<any, any, any, any>;

export interface RenderableChartAPI<T, DataShape> {
    /**
     * Draws the chart into `target`: a CSS selector, an element or a d3
     * selection, as `select(target).datum(data).call(chart)` does. A selector
     * draws into the first element it matches. Without `data`, the chart
     * redraws with the data it last drew there. Throws when the target
     * matches nothing.
     */
    render(target: ChartRenderTarget, data?: DataShape): T;
}
