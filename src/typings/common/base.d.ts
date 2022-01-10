import { LocaleString } from './local';
import { ColorsSchemasType } from '../helpers/colors';
import { ChartMarginParams } from './margin';
import { AxisTimeCombination } from '../helpers/constants';


export interface ChartBaseAPI<T> {
    /** Gets or Sets the number format of the chart */
    numberFormat(format?: string): T & ChartBaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(height?: number): T & ChartBaseAPI<T>;
    /** Gets or Sets the loading state of the chart */
    isLoading(isLoading?: boolean): T & ChartBaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(margin?: ChartMarginParams): T & ChartBaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(width?: number): T & ChartBaseAPI<T>;
}

// Using it on the brush chart, for charts with no 'numberFormat'
export interface ChartBaseAPIMinimal<T> {
    /** Gets or Sets the height of the chart */
    height(height?: number): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the loading state of the chart */
    isLoading(isLoading?: boolean): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(margin?: ChartMarginParams): T & ChartBaseAPIMinimal<T>;
    /** Gets or Sets the width of the chart */
    width(width?: number): T & ChartBaseAPIMinimal<T>;
}

export interface ComponentBaseAPI<T> {
    /** Gets or Sets the number format of the chart */
    numberFormat(format?: string): T & ComponentBaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(height?: number): T & ComponentBaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(margin?: ChartMarginParams): T & ComponentBaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(width?: number): T & ComponentBaseAPI<T>;
}

// Using it on Heatmap until getting a good set of API configs
// https://github.com/britecharts/britecharts/issues/845
export interface BaseAPI<T> {
    /** Gets or Sets the colorSchema of the chart */
    colorSchema(schema: ColorsSchemasType): T & BaseAPI<T>;
    /** Gets or Sets the height of the chart */
    height(height?: number): T & BaseAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(margin?: ChartMarginParams): T & BaseAPI<T>;
    /** Gets or Sets the width of the chart */
    width(width?: number): T & BaseAPI<T>;
}

// More granular approach
export interface InteractiveChartAPI<T> {
    on(
        eventName: string,
        callback: (...args: unknown[]) => void
    ): T & InteractiveChartAPI<T>;
    on(eventName: string): (...args: unknown[]) => void;
}

export interface ChartDimensionsAPI<T> {
    /** Gets or Sets the height of the chart */
    height(height?: number): T & ChartDimensionsAPI<T>;
    /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
    margin(margin?: ChartMarginParams): T & ChartDimensionsAPI<T>;
    /** Gets or Sets the width of the chart */
    width(width?: number): T & ChartDimensionsAPI<T>;
}

export interface AnimatedChartAPI<T> {
    /** Gets or Sets the isAnimated property of the chart, making it to animate when render */
    isAnimated(isAnimated?: boolean): T & AnimatedChartAPI<T>;
    /** Gets or Sets the duration of the animation */
    animationDuration(duration?: number): T & AnimatedChartAPI<T>;
}

export interface ExportableChartAPI {
    /**
     * Executes a command that triggers the download of the current chart as a .png image file
     * @param filename  The filename of the downloaded image
     * @param title     The title attached to the image
     */
    exportChart(filename: string, title: string): Promise<void>;
    // Marked as promise as it is asynchronous, filed a ticket to research about returninga real promise
    // https://github.com/britecharts/britecharts/issues/858
}

export interface ThemableChartAPI<T> {
    /** Gets or Sets the colorSchema of the chart */
    colorSchema(schema: ColorsSchemasType): T & ThemableChartAPI<T>;
    /** Gets or Sets the colorMap of the chart */
    colorMap(colorMap?: Record<string, string>): T & ThemableChartAPI<T>;
}

export interface TimeSeriesChartAPI<T> {
    /**
     * Exposes the constants to be used to force the x axis to respect a certain granularity
     * current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example
     *     chart.xAxisFormat(chart.axisTimeCombinations.HOUR_DAY)
     */
    axisTimeCombinations: {
        [key in keyof typeof AxisTimeCombination]: key;
    };
    /**
     * Pass language tag for the tooltip to localize the date.
     * Uses Intl.DateTimeFormat, for compatability and support, refer to
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     */
    locale(localObject?: LocaleString | null): T & TimeSeriesChartAPI<T>;
    /**
     * Exposes the ability to force the chart to show a certain x format
     * It requires a `xAxisFormat` of 'custom' in order to work.
     * NOTE: localization not supported
     * Accepts the format for x axis, one of the d3.js date formats [here]{@link https://github.com/d3/d3-time-format#locale_format}
     */
    xAxisCustomFormat(format?: string): T & TimeSeriesChartAPI<T>;
    /**
     * Exposes the ability to force the chart to show a certain x axis grouping
     * It is a combination of axisTimeCombinations (MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR)
     * Set it to 'custom' to make use of specific formats with xAxisCustomFormat
     * * @example
     *     chart.xAxisCustomFormat(chart.axisTimeCombinations.HOUR_DAY)
     */
    xAxisFormat(format?: TimeSeriesChartAPI<T>['axisTimeCombinations']): T & TimeSeriesChartAPI<T>;
}
