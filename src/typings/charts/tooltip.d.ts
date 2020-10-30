import { ChartModuleSelection } from '@common/selection';
import { BaseType, Selection } from 'd3-selection';
import { AxisTimeCombination } from '@helpers/constants';
import { LocalObject } from '@common/local';

export enum tooltipKeys {
  Date = 'date',
  Topics = 'topics',
}

export type TooltipTopic = {
  date: string;
  name: string;
  value: number;
  topicName: string;
}

// This is equivalent to the lineChartDataSorted data type in Britecharts
export type TooltipDataShape = {
  [tooltipKeys.Date]: string;
  [tooltipKeys.Topics]: TooltipTopic[];
};

export type TooltipSelection = Selection<
  BaseType,
  TooltipDataShape[],
  HTMLElement,
  any
>;

export type TooltipOffset = {
  x: number;
  y: number;
};

export type TopicColorMap = Record<string, string>;

type FormattingFunction = (value: number) => number;

export interface TooltipAPI {
  /** Hides the tooltip */
  hide(): void;
  /** Shows the tooltip */
  show(): void;
  /**
   * Constants to be used to force the x axis to respect a certain granularity
   * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
   * */
  axisTimeCombinations: {
    [key in keyof typeof AxisTimeCombination]: AxisTimeCombination | string;
  };
  /** Exposes the ability to force the tooltip to use a certain date format */
  dateFormat(format?: string): TooltipModule;
  /** Exposes the ability to use a custom date format */
  dateCustomFormat(format?: string): TooltipModule;
  /** Gets or Sets the dateLabel of the data */
  dateLabel(label?: string): TooltipModule;
  /** Pass locale for the tooltip to render the date in */
  locale(localObject?: LocalObject | null): TooltipModule;
  /** Gets or Sets the nameLabel of the data */
  nameLabel(label?: string): TooltipModule;
  /** Gets or Sets the number format for the value displayed on the tooltip */
  numberFormat(format?: string): TooltipModule;
  /**
   * Gets or Sets the formatter function for the value displayed on the tooltip.
   * Setting this property makes the tooltip ignore numberFormat.
   * */
  valueFormatter(formattingFunction?: FormattingFunction): TooltipModule;
  /** Shows or hides the date on the title */
  shouldShowDateInTitle(shouldShowDateInTitle?: boolean): TooltipModule;
  /** Gets or Sets the title of the tooltip */
  title(title?: string): TooltipModule;
  /** Pass an override for the offset of your tooltip */
  tooltipOffset(offset?: TooltipOffset): TooltipModule;
  /** Pass an override for the ordering of your tooltip */
  topicsOrder(namesOrder?: string[]): TooltipModule;
  /** Gets or Sets the topicLabel of the data */
  topicLabel(label?: string): TooltipModule;
  /** Updates the position and content of the tooltip */
  update(dataPoint: TooltipDataShape, colorMapping: TopicColorMap, xPosition: number, yPosition: number): void;
  /** Gets or Sets the valueLabel of the data */
  valueLabel(label?: string): TooltipModule;
  /**
   * Gets or Sets the `xAxisValueType` of the data. Choose between 'date' and 'number'. When set to
   * number, the x-Axis values won't be parsed as dates anymore, but as numbers.
   * */
  xAxisValueType(type?: 'date' | 'number'): TooltipModule;
}

export type TooltipModule = ChartModuleSelection<TooltipDataShape[]> & TooltipAPI;

/**
 * import {line, tooltip} from 'britecharts;
 *
 * const lineChart = line();
 *
 * lineChart
 *  .width(100)
 *  .height(100)
 *  .on('customMouseOver', tooltip.show)
 *  .on('customMouseMove', tooltip.update)
 *  .on('customMouseOut', tooltip.hide);
 *
 * lineContainer.datum(dataset).call(lineChart);
 *
 * tooltipContainer = d3Selection.select('.line-chart-container .line-chart .metadata-group');
 * tooltipContainer.datum([]).call(tooltip);
 *
 */
export function tooltip(): TooltipModule;
