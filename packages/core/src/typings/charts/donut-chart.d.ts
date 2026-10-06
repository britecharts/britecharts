import {
    ChartBaseAPI,
    InteractiveChartAPI,
    ExportableChartAPI,
    ThemableChartAPI,
    AnimatedChartAPI,
} from '../common/base';
import { ChartModuleSelection } from '../common/selection';

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

// Two of the callbacks below were declared `=> void`, and both are read by the
// chart for what they return: `centeredTextFunction`'s result is handed to
// `.text()`, and `orderingFunction`'s to `.sort()`. TypeScript lets a
// value-returning function satisfy a `=> void` parameter, so a consumer's
// correct callback compiled -- but reading either accessor back gave a function
// whose result was unusable, and the declaration documented the wrong contract.
// The chart's own defaults say what they really are: a template string, and a
// comparator.
export interface DonutChartAPI
    extends ChartBaseAPI<DonutChartModule>,
        InteractiveChartAPI<DonutChartModule>,
        ExportableChartAPI,
        AnimatedChartAPI<DonutChartModule>,
        ThemableChartAPI<DonutChartModule> {
    /**
     * Gets or Sets the centeredTextFunction of the chart. If function is provided
     * the format will be changed by the custom function's value format.
     * The default format function value is "${d.percentage}% ${d.name}".
     * The callback will provide the data object with id, name, percentage, and quantity.
     * Also provides the component added by the user in each data entry.
     */
    centeredTextFunction(): (a: DonutChartDataShape) => string;
    centeredTextFunction(
        centeredTextFunc: (a: DonutChartDataShape) => string
    ): DonutChartModule;
    /**
     * Gets or Sets the emptyDataConfig of the chart. If set and data is empty (quantity
     * adds up to zero or there are no entries), the chart will render an empty slice
     * with a given color (light gray by default)
     */
    emptyDataConfig(): DonutEmptyDataConfig;
    emptyDataConfig(config: DonutEmptyDataConfig): DonutChartModule;
    /** Gets or Sets the externalRadius of the chart */
    externalRadius(): number;
    externalRadius(radius: number): DonutChartModule;
    /**
     * Gets or Sets the hasFixedHighlightedSlice property of the chart, making it to
     * highlight the selected slice id set with `highlightSliceById` all the time.
     */
    hasFixedHighlightedSlice(): boolean;
    hasFixedHighlightedSlice(hasFixed: boolean): DonutChartModule;
    /**
     * Gets or Sets the hasHoverAnimation property of the chart. By default,
     * donut chart highlights the hovered slice. This property explicitly
     * disables this hover behavior.
     */
    hasHoverAnimation(): boolean;
    hasHoverAnimation(hasHoverAnimation: boolean): DonutChartModule;
    /**
     * Gets or sets the hasLastHoverSliceHighlighted property.
     * If property is true, the last hovered slice will be highlighted
     * after 'mouseout` event is triggered. The last hovered slice will remain
     * in highlight state.
     * Note: if both hasFixedHighlightedSlice and hasLastHoverSliceHighlighted
     * are true, the latter property will override the former.
     */
    hasLastHoverSliceHighlighted(): boolean;
    hasLastHoverSliceHighlighted(
        hasSliceHighlight: boolean
    ): DonutChartModule;
    /**
     * Gets or Sets the id of the slice to highlight.
     *
     * The getter is `undefined` until one is set: the chart has no default and
     * only highlights a slice once an id arrives.
     */
    highlightSliceById(): DonutChartDataShape['id'] | undefined;
    highlightSliceById(id: DonutChartDataShape['id']): DonutChartModule;
    /** Gets or Sets the internalRadius of the chart */
    internalRadius(): number;
    internalRadius(radius: number): DonutChartModule;
    /** Changes the order of items given custom function */
    orderingFunction(): (
        a: DonutChartDataShape,
        b: DonutChartDataShape
    ) => number;
    orderingFunction(
        orderingFunc: (
            a: DonutChartDataShape,
            b: DonutChartDataShape
        ) => number
    ): DonutChartModule;
    /** Gets or Sets the percentage format for the percentage label */
    percentageFormat(): string;
    percentageFormat(format: string): DonutChartModule;
    /** Gets or Sets the radiusHoverOffset of the chart */
    radiusHoverOffset(): number;
    radiusHoverOffset(offset: number): DonutChartModule;
    /** Gets or Sets whether the legend shows at the centre of the donut */
    hasCenterLegend(): boolean;
    hasCenterLegend(value: boolean): DonutChartModule;
}

export type DonutChartModule = ChartModuleSelection<DonutChartDataShape[]> &
    DonutChartAPI;

/**
 * import {donut} from 'britecharts;
 * donut().width(100).height(100)
 */
export function donut(): DonutChartModule;
