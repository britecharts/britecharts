import { LocalObject } from '@common/local';
import { ColorsSchemasType } from '@helpers/colors';
import { ChartMarginParams } from '@common/margin';

export interface ChartBaseAPI<T> {
  /** Gets or Sets the colorSchema of the chart */
  colorSchema(schema: ColorsSchemasType): T & ChartBaseAPI<T>;
  /** Gets or Sets the number format of the chart */
  numberFormat(format?: string): T & ChartBaseAPI<T>;
  /** Gets or Sets the isAnimated property of the chart, making it to animate when render */
  isAnimated(isAnimated?: boolean): T & ChartBaseAPI<T>;
  /** Gets or Sets the height of the chart */
  height(height?: number): T & ChartBaseAPI<T>;
  /** Gets or Sets the loading state of the chart */
  /** Gets or Sets the loading state of the chart */
  loadingState(markup?: string): T & ChartBaseAPI<T>;
  /**
   * Pass language tag for the tooltip to localize the date.
   * Uses Intl.DateTimeFormat, for compatability and support, refer to
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   */
  locale(localObject?: LocalObject | null): T & ChartBaseAPI<T>;
  /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
  margin(margin?: ChartMarginParams): T & ChartBaseAPI<T>;
  /** Gets or Sets the width of the chart */
  width(width?: number): T & ChartBaseAPI<T>;
}

export interface ChartBaseAPIMinimal<T> {
  /** Gets or Sets the height of the chart */
  height(height?: number): T & ChartBaseAPIMinimal<T>;
  /** Gets or Sets the loading state of the chart */
  loadingState(markup?: string): T & ChartBaseAPIMinimal<T>;
  /**
   * Pass language tag for the tooltip to localize the date.
   * Uses Intl.DateTimeFormat, for compatability and support, refer to
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   */
  locale(localObject?: LocalObject | null): T & ChartBaseAPIMinimal<T>;
  /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
  margin(margin?: ChartMarginParams): T & ChartBaseAPIMinimal<T>;
  /** Gets or Sets the width of the chart */
  width(width?: number): T & ChartBaseAPIMinimal<T>;
}


export interface ComponentBaseAPI<T> {
  /** Gets or Sets the colorSchema of the chart */
  colorSchema(schema: ColorsSchemasType): T & ComponentBaseAPI<T>;
  /** Gets or Sets the number format of the chart */
  numberFormat(format?: string): T & ComponentBaseAPI<T>;
  /** Gets or Sets the height of the chart */
  height(height?: number): T & ComponentBaseAPI<T>;
  /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
  margin(margin?: ChartMarginParams): T & ComponentBaseAPI<T>;
  /** Gets or Sets the width of the chart */
  width(width?: number): T & ComponentBaseAPI<T>;
}

// TODO: Deprecate once the API gets consistent (Release 3.0 at least)
// https://github.com/britecharts/britecharts/issues/842
// https://github.com/britecharts/britecharts/issues/841
export interface GroupedBarBaseAPI<T> {
  /** Gets or Sets the colorSchema of the chart */
  colorSchema(schema: ColorsSchemasType): T & GroupedBarBaseAPI<T>;
  /** Gets or Sets the isAnimated property of the chart, making it to animate when render */
  isAnimated(isAnimated?: boolean): T & GroupedBarBaseAPI<T>;
  /** Gets or Sets the height of the chart */
  height(height?: number): T & GroupedBarBaseAPI<T>;
  /** Gets or Sets the loading state of the chart */
  loadingState(markup?: string): T & GroupedBarBaseAPI<T>;
  /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
  margin(margin?: ChartMarginParams): T & GroupedBarBaseAPI<T>;
  /** Gets or Sets the width of the chart */
  width(width?: number): T & GroupedBarBaseAPI<T>;
}

export interface StackedBarBaseAPI<T> {
  /** Gets or Sets the colorSchema of the chart */
  colorSchema(schema: ColorsSchemasType): T & StackedBarBaseAPI<T>;
  /** Gets or Sets the isAnimated property of the chart, making it to animate when render */
  isAnimated(isAnimated?: boolean): T & StackedBarBaseAPI<T>;
  /** Gets or Sets the height of the chart */
  height(height?: number): T & StackedBarBaseAPI<T>;
  /** Gets or Sets the loading state of the chart */
  loadingState(markup?: string): T & StackedBarBaseAPI<T>;
  /** Gets or Sets the margin object of the chart (top, bottom, left and right) */
  margin(margin?: ChartMarginParams): T & StackedBarBaseAPI<T>;
  /** Gets or Sets the width of the chart */
  width(width?: number): T & StackedBarBaseAPI<T>;
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
  on(eventName: string, callback: (...args: unknown[]) => void): T & InteractiveChartAPI<T>;
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

export interface ChartAnimationAPI<T> {
  /** Gets or Sets the isAnimated property of the chart, making it to animate when render */
  isAnimated(isAnimated?: boolean): T & ChartAnimationAPI<T>;
  /** Gets or Sets the duration of the animation */
  duration(duration?: number): T & ChartAnimationAPI<T>;
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