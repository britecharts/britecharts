import { ChartModuleSelection } from '../common/selection';
import { BaseType, Selection } from 'd3-selection';
import { AxisTimeCombination } from '../helpers/constants';
import { LocaleString } from '../common/local';

export enum tooltipKeys {
    Date = 'date',
    Topics = 'topics',
}

/**
 * One row of a list-layout tooltip. This is a `LineChartDataShape`, not merely
 * something like one: line hands the tooltip its raw flat rows untouched
 * (`line.js`'s `dataSorted` is `{ date, topics: values }`, where `values` are
 * the rows as they were bound), so `name` here is the same numeric topic
 * identifier it is there -- not a label. `topicName` is the label.
 *
 * It was declared `string`, then `number` once `LineChartDataShape.name` was
 * corrected -- and both were half the story. Two charts feed this type and
 * their names are different kinds: line hands over its raw flat rows, where
 * `name` is a numeric topic id, while stacked area's topics are named by
 * string (`"Direct"`, as its own data-shape example shows, and as its story
 * passes to `topicsOrder`). The tooltip only ever compares this field or sorts
 * by it, so both work at runtime; only the declaration had to pick one, and
 * picking either made the other chart's correct usage a type error.
 *
 * `TooltipSingleDataShape.name` below is a string for a different reason --
 * that is the category name from bar, donut and scatter plot -- so the two are
 * not the same field and must not be collapsed.
 */
export type TooltipTopic = {
    date: string;
    name: string | number;
    value: number;
    topicName: string;
};

// This is equivalent to the LineChartDataSorted data type in Britecharts
export type TooltipListDataShape = {
    [tooltipKeys.Date]: string;
    [tooltipKeys.Topics]: TooltipTopic[];
};

/** What the single-value charts (bar, scatter plot, heatmap, donut) dispatch */
export type TooltipSingleDataShape = {
    name: string;
    value: number;
};

export type TooltipDataShape = TooltipListDataShape | TooltipSingleDataShape;

/** [x, y] in pixels, relative to the chart's drawing area */
export type TooltipPosition = [number, number];

/** [width, height] of the chart in pixels; accepted and ignored */
export type TooltipChartSize = [number, number];

export type TooltipLayout = 'auto' | 'list' | 'single';

/** How the key of the data point is shown in the tooltip's title. */
export type TooltipXAxisValueType = 'auto' | 'date' | 'number' | 'category';

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

type TooltipFormattingFunction = (value: number) => number;

// The sixteen accessors below were setter-only -- a single
// optional-parameter signature returning the module -- so reading one reported
// the module rather than its value. Each is a getter/setter overload pair now,
// getter first and setter last, with the getter typed from the
// implementation's own default.
//
// `hide`, `show` and `update` are commands rather than accessors: they return
// void and have never chained.
export interface TooltipAPI {
    /** Hides the tooltip */
    hide(): void;
    /**
     * Shows the tooltip. Given the hovered data point and its position, as the
     * single-value charts dispatch them on `customMouseOver`, it renders and
     * places the tooltip at once; otherwise it shows empty until the first update.
     */
    show(dataPoint?: TooltipDataShape, position?: TooltipPosition): void;
    /**
     * Gets or Sets the layout: 'list' (title and one row per topic), 'single'
     * (title, name and a big value; what miniTooltip renders) or 'auto' (the
     * default: by the data point's shape). Set before the tooltip is drawn.
     */
    layout(): TooltipLayout;
    layout(layout: TooltipLayout): TooltipModule;
    /**
     * Constants to be used to force the x axis to respect a certain granularity
     * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * */
    axisTimeCombinations: {
        [key in keyof typeof AxisTimeCombination]: AxisTimeCombination | string;
    };
    /**
     * Exposes the ability to force the tooltip to use a certain date format
     *
     * The getter never reports null, unlike its sibling below: it falls back to
     * the default axis setting (`DAY_MONTH`) when none has been set, so it
     * always answers with the format the tooltip would actually use.
     */
    dateFormat(): string;
    dateFormat(format: string): TooltipModule;
    /**
     * Exposes the ability to use a custom date format
     *
     * The getter is `null` until one is set, where `dateFormat`'s falls back.
     */
    dateCustomFormat(): string | null;
    dateCustomFormat(format: string): TooltipModule;
    /** Gets or Sets the dateLabel of the data */
    dateLabel(): string;
    dateLabel(label: string): TooltipModule;
    /**
     * The locale the tooltip renders its date in, as a BCP 47 tag
     * ('en-US'). It goes straight to `Intl.DateTimeFormat(locale, ...)`
     * (`tooltip.js`'s date formatting), which is a different thing from the
     * d3-format locale *definition* object the value-formatting charts take --
     * bar and the rest pass theirs to `setDefaultLocale`, and those are
     * rightly typed `LocalObject`.
     *
     * Declared `LocalObject` until now, which is that other kind. Core's own
     * `base.d.ts` already types the same accessor as `LocaleString` for the
     * time-series charts; this brings the tooltip in line with it.
     */
    locale(): LocaleString | null | undefined;
    locale(locale: LocaleString | null): TooltipModule;
    /** Gets or Sets the nameLabel of the data */
    nameLabel(): string;
    nameLabel(label: string): TooltipModule;
    /**
     * Gets or Sets the number format for the value displayed on the tooltip
     *
     * The getter is `null` until one is set.
     */
    numberFormat(): string | null;
    numberFormat(format: string): TooltipModule;
    /**
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     * Setting this property makes the tooltip ignore numberFormat.
     * */
    valueFormatter(): TooltipFormattingFunction | null;
    valueFormatter(
        formattingFunction: TooltipFormattingFunction
    ): TooltipModule;
    /** Shows or hides the date on the title */
    shouldShowDateInTitle(): boolean;
    shouldShowDateInTitle(
        shouldShowDateInTitle: boolean
    ): TooltipModule;
    /** Gets or Sets the title of the tooltip */
    title(): string;
    title(title: string): TooltipModule;
    /** Pass an override for the offset of your tooltip */
    tooltipOffset(): TooltipOffset;
    tooltipOffset(offset: TooltipOffset): TooltipModule;
    /**
     * Pass an override for the ordering of your tooltip
     *
     * Matched to `TooltipTopic['name']`, because the tooltip orders with
     * `topic.name === orderName`: the ids line sends and the names stacked
     * area sends both have to be expressible here, and the tooltip's own spec
     * passes numbers while stacked area's story passes strings.
     */
    topicsOrder(): TooltipTopic['name'][];
    topicsOrder(namesOrder: TooltipTopic['name'][]): TooltipModule;
    /** Gets or Sets the topicLabel of the data */
    topicLabel(): string;
    topicLabel(label: string): TooltipModule;
    /**
     * Updates the content and position of the tooltip with what every chart
     * dispatches on `customMouseMove`: the data point, its anchor, the chart's
     * size (ignored) and, from the multi-value charts, the topic colours.
     */
    update(
        dataPoint: TooltipDataShape,
        position: TooltipPosition,
        chartSize?: TooltipChartSize,
        colorMap?: TopicColorMap
    ): void;
    /**
     * @deprecated The order the multi-value charts used before 3.0; still
     * accepted, warns once. The charts now dispatch the order above.
     */
    update(
        dataPoint: TooltipListDataShape,
        colorMapping: TopicColorMap,
        xPosition: number,
        yPosition?: number
    ): void;
    /** Gets or Sets the valueLabel of the data */
    valueLabel(): string;
    valueLabel(label: string): TooltipModule;
    /**
     * Gets or Sets the most rows the tooltip shows; past that, the last row reads "+n more".
     * 0 shows every row. Default 12.
     */
    maxEntries(): number;
    maxEntries(limit: number): TooltipModule;
    /**
     * Gets or Sets how the key of the data point is shown in the title: 'date', 'number',
     * 'category' (as it is), or 'auto' (the default), which picks one per key.
     * */
    xAxisValueType(): TooltipXAxisValueType;
    xAxisValueType(type: TooltipXAxisValueType): TooltipModule;
}

export type TooltipModule = ChartModuleSelection<TooltipDataShape[]> &
    TooltipAPI;

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
