import { ChartBaseAPI, InteractiveChartAPI, ExportableChartAPI } from '@common/base';
import { ChartModuleSelection } from '@common/selection';

export enum DonutChartKeys {
  ID = 'id',
  Name = 'name',
  Quantity = 'quantity',
  Percentage = 'percentage',
}

export type DonutChartDataShape = {
  [DonutChartKeys.ID]: number;
  [DonutChartKeys.Name]: string;
  [DonutChartKeys.Quantity]: number;
  [DonutChartKeys.Percentage]: number;
};

export interface DonutEmptyDataConfig {
  emptySliceColor: string;
  showEmptySlice: boolean;
}

export interface DonutChartAPI extends ChartBaseAPI<DonutChartModule>, InteractiveChartAPI<DonutChartModule>, ExportableChartAPI<DonutChartModule> {
  /**
   * Gets or Sets the centeredTextFunction of the chart. If function is provided
   * the format will be changed by the custom function's value format.
   * The default format function value is "${d.percentage}% ${d.name}".
   * The callback will provide the data object with id, name, percentage, and quantity.
   * Also provides the component added by the user in each data entry.
   */
  centeredTextFunction(
    centeredTextFunc: (a: DonutChartDataShape) => void
  ): DonutChartModule;
  /**
   * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
   * adds up to zero or there are no entries), the chart will render an empty slice
   * with a given color (light gray by default)
   */
  emptyDataConfig(config?: DonutEmptyDataConfig): DonutChartModule;
  /** Gets or Sets the externalRadius of the chart */
  externalRadius(radius?: number): DonutChartModule;
  /**
   * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
   * highlight the selected slice id set with `highlightSliceById` all the time.
   */
  hasFixedHighlightedSlice(hasFixed?: boolean): DonutChartModule;
  /**
   * Gets or Sets the hasHoverAnimation property of the chart. By default,
   * donut chart highlights the hovered slice. This property explicitly
   * disables this hover behavior.
   */
  hasHoverAnimation(hasHoverAnimation?: boolean): DonutChartModule;
  /**
   * Gets or sets the hasLastHoverSliceHighlighted property.
   * If property is true, the last hovered slice will be highlighted
   * after 'mouseout` event is triggered. The last hovered slice will remain
   * in highlight state.
   * Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
   * are true, the latter property will override the former.
   */
  hasLastHoverSliceHighlighted(hasSliceHighlight?: boolean): DonutChartModule;
  /** Gets or Sets the id of the slice to highlight */
  highlightSliceById(id: DonutChartDataShape['id']): DonutChartModule;
  /** Gets or Sets the internalRadius of the chart */
  internalRadius(radius: number): DonutChartModule;
  /** Changes the order of items given custom function */
  orderingFunction(
    orderingFunc: (a: DonutChartDataShape, b: DonutChartDataShape) => void
  ): DonutChartModule;
  /** Gets or Sets the percentage format for the percentage label */
  percentageFormat(format: string): DonutChartModule;
  /** Gets or Sets the radiusHoverOffset of the chart */
  radiusHoverOffset(offset: number): DonutChartModule;
}

export type DonutChartModule = ChartModuleSelection<DonutChartDataShape[]> &
  DonutChartAPI;

/**
 * import {donut} from 'britecharts;
 * donut().width(100).height(100)
 */
export function donut(): DonutChartModule;
