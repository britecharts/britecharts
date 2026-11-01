import { max } from 'd3-array';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import type { BaseType, Selection } from 'd3-selection';
import 'd3-transition';

import { motionDuration } from '../helpers/a11y.js';
import { markLabelSet, registerTooltipGroup } from '../helpers/tooltip.js';
import { axisTimeCombinations, motion } from '../helpers/constants.js';
import {
    formatIntegerValue,
    formatDecimalValue,
    isInteger,
} from '../helpers/number.js';
import { getTextWidth, getApproximateNumberOfLines } from '../helpers/text.js';
import { isDefined } from '../helpers/type.js';
import { measureFrame, originOf, translateOf } from './frame.js';
import {
    chaseDuration,
    ease,
    prepareToShow,
    fadeIn,
    fadeOut,
} from './motion.js';
import { place } from './place.js';

import type { LocaleString } from '../../typings/common/local.js';
import type { ChartMarginParams } from '../../typings/common/margin.js';
import type { ChartModuleSelection } from '../../typings/common/selection.js';
import type { AxisTimeCombination } from '../../typings/helpers/constants.js';

export declare enum tooltipKeys {
    Date = 'date',
    Topics = 'topics',
}

/**
 * One row of a list-layout tooltip. This is a `LineChartDataShape`, not merely
 * something like one: line hands the tooltip its raw flat rows untouched
 * (line's `dataSorted` is `{ date, topics: values }`, where `values` are the
 * rows as they were bound), so `name` here is the same numeric topic
 * identifier it is there -- not a label. `topicName` is the label.
 *
 * Two charts feed this type and their names are different kinds, so `name`
 * takes both: line hands over its raw flat rows, where `name` is a numeric
 * topic id, while stacked area's topics are named by string (`"Direct"`, as
 * its own data-shape example shows, and as its story passes to
 * `topicsOrder`). The tooltip only ever compares this field or sorts
 * by it, so both work at runtime, and picking either one here would make the
 * other chart's correct usage a type error.
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
    // The parent datum, which a consumer of this type binds and this component
    // never reads -- the same bounded `any` as `ChartSelection` below, for the
    // same reason: `Selection` is invariant in it, so naming one shape would
    // reject every other caller's.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
>;

export type TooltipOffset = {
    x: number;
    y: number;
};

export type TopicColorMap = Record<string, string>;

type TooltipFormattingFunction = (value: number) => number;

// Each accessor below is a getter/setter overload pair, getter first and
// setter last, with the getter typed from the implementation's own default.
//
// `hide`, `show` and `update` are commands rather than accessors: they return
// void and do not chain.
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
     * (title, name and a big value) or 'auto' (the
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
     * ('en-US'). It goes straight to `Intl.DateTimeFormat(locale, ...)` in the
     * date formatting below, which is a different thing from the d3-format
     * locale *definition* object the value-formatting charts take -- bar and
     * the rest pass theirs to `localeFormatterFor`, and those are rightly typed
     * `LocalObject`.
     *
     * Core's own `base.d.ts` types the same accessor as `LocaleString` for
     * the time-series charts, and the tooltip matches it.
     */
    locale(): LocaleString | null;
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
    shouldShowDateInTitle(shouldShowDateInTitle: boolean): TooltipModule;
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
     * accepted, warns once. The charts dispatch the order above.
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

// Key of the row that stands for the topics past maxEntries
const MORE_ROW_KEY = '__more__';

// Fallback for the getBBox() guard: roughly one line of the 12px tooltip
// text. Module-level because the `let` chain reads it.
const defaultTextHeight = 14;

/**
 * The tooltip's own svg, and the selections derived from it. The datum and
 * parent generics are a bounded `any`, as in the charts: these are
 * module-level variables reassigned from several differently-shaped
 * selections, so naming one concrete datum would reject the others.
 *
 * Named `ChartSelection` as every other chart names this, not
 * `TooltipSelection`: that name belongs to the published, non-generic
 * selection type above, which is a different thing -- the datum there is the
 * tooltip's own data.
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
 * One row of the list layout, as the tooltip renders it: a topic, plus the
 * synthetic "+n more" row that stands for everything past `maxEntries`.
 *
 * The extra row carries `MORE_ROW_KEY` as its name and no value, which is why
 * both members are looser here than on `TooltipTopic`.
 */
type TooltipEntry = Partial<TooltipTopic> & {
    name: TooltipTopic['name'];
    /** Set only on the synthetic row that stands for the folded topics. */
    isMoreRow?: boolean;
    /** How many topics that row stands for. */
    hiddenCount?: number;
    [key: string]: unknown;
};

/**
 * What the tooltip reads a key off: either layout's data point, by whichever
 * of the label accessors applies. The index signature is those accessors --
 * `dateLabel`, `nameLabel`, `valueLabel` and `topicLabel` let a chart name its
 * own members, so the reads really are dynamic.
 */
type TooltipDatum = TooltipDataShape & {
    [key: string]: unknown;
};

// The legacy update(dataPoint, colorMap, x, y) order is warned about once
let hasWarnedLegacyOrder = false;

// How the single layout shows its value when no format is set
const formatSingleValue = format('.2f');

/**
 * Tooltip component: one box, drawn inside the chart's svg, that follows the
 * pointer and shows what it is over. It renders a **list** (a title and one
 * row per topic, with a colour dot, the topic's name and its value) for the
 * multi-value charts -- line, stacked area, stacked bar and grouped bar --
 * or a **single value** (a title, the element's name and a big value) for
 * the single-value charts -- bar, scatter plot, heatmap and donut. By
 * default it picks the layout from the data point it is given; `layout()`
 * forces one. It shows a title only if you set one, and a single value with
 * two decimals unless you set a format.
 *
 * The tooltip keeps itself inside the chart: it measures the svg it is drawn
 * in, sits beside its anchor, flips to the other side when there is no room
 * and slides so it is never cut off. It fades in when shown, fades out when
 * hidden and eases towards each new position.
 *
 * Every chart dispatches the same three events, so wiring is always
 * `chart.on('customMouseOver', tooltip.show).on('customMouseMove', tooltip.update).on('customMouseOut', tooltip.hide)`.
 * What they carry, and where to `.call()` the tooltip:
 *
 * | Chart | `customMouseOver` | `customMouseMove` | anchor `[x, y]` | attach to |
 * | --- | --- | --- | --- | --- |
 * | line, stacked area | `(data, [x, y])` | `(dataPoint, [x, y], [width, height], colorMap)` | the hovered date's x, the pointer's y | `.metadata-group .vertical-marker-container` |
 * | stacked bar, grouped bar | `(data, [x, y])` | `(dataPoint, [x, y], [width, height], colorMap)` | the pointer, over a bar only | `.metadata-group` |
 * | bar, heatmap, donut | `(dataPoint, [x, y], [width, height])` | `(dataPoint, [x, y], [width, height])` | the pointer, over a shape only | `.metadata-group` |
 * | scatter plot | `(dataPoint, [x, y])` | `(dataPoint, [x, y], [width, height])` | the hovered point | `.metadata-group` |
 *
 * Positions are in pixels relative to the chart's drawing area (inside the
 * margins). The chart's size is accepted and ignored: the tooltip measures
 * the chart itself. The line and stacked area charts dispatch nothing while
 * narrower than `tooltipThreshold` (480 px by default).
 *
 * ### Reading each chart's data point
 *
 * The charts do not all name the fields of the data point they dispatch the
 * same way, so the tooltip has to be told where to look for some of them.
 * Without these settings, a tooltip on these charts shows no rows, rows
 * without their colours, or no value:
 *
 * | Chart | Configure the tooltip with | Why |
 * | --- | --- | --- |
 * | line | nothing | its data point carries `date` and `topics`, the defaults |
 * | stacked area | `topicLabel('values')` | its rows are under `values` |
 * | stacked bar | `topicLabel('values')`, `nameLabel('stack')` | its rows are under `values`, named by `stack` |
 * | grouped bar | `topicLabel('values')`, `nameLabel('group')` | its rows are under `values`, named by `group` |
 * | scatter plot | `valueLabel('y')` | a point's value is its `y` (add `nameLabel('x')` to show `x` instead of its name) |
 * | bar, donut, heatmap | nothing | their data points carry `name` and `value` |
 *
 * In React, `Tooltip` starts from `topicLabel('values')`, so the line chart
 * is the one that needs a setting there: `topicLabel="topics"`.
 *
 * @module Tooltip
 * @tutorial tooltip
 *
 * @example
 * import { line, tooltip } from '@britecharts/core';
 *
 * // dataset: { data: [{ topicName, name, date, value }] }
 * line()
 *     .width(500)
 *     .tooltip(tooltip().title('Visits'))
 *     .render('.css-selector', dataset);
 */
export default function module(): TooltipModule {
    // Kept as one `let` chain with annotations rather than split into `let`
    // and `const`: nearly every binding here is reassigned, either by an
    // accessor or while measuring and placing the box. The handful that are
    // not are below it.
    let title = '',
        shouldShowDateInTitle = true,
        // tooltip
        tooltipBackground: ChartSelection<SVGRectElement>,
        tooltipBackgroundX = 0,
        tooltipOffset: TooltipOffset = {
            x: 0,
            y: 0,
        },
        // Where the tooltip's group sat last time it was placed, so the next
        // placement can shift from there rather than jumping.
        tooltipGroupOrigin: [number, number] | null = null,
        tooltipTextContainer: ChartSelection<SVGGElement>,
        tooltipBody: ChartSelection<SVGGElement>,
        tooltipTitle: ChartSelection<SVGTextElement>,
        tooltipHeight = 48,
        ttTextX = 0,
        ttTextY = 37,
        // Fallback for the getBBox() guard below: roughly one line of the 12px
        // tooltip text. Without it the first measurement that comes back 0 makes
        // textHeight undefined, and every height derived from it NaN.
        textHeight = defaultTextHeight,
        additionalTooltipTitleHeight = 0,
        tooltipRightWidth = 0,
        // Whether show() has been called and hide() has not
        isShown = false,
        // Whether the next update is the first since show(), and fades in
        isEntering = false,
        colorMap: TopicColorMap | undefined,
        dateLabel = 'date',
        valueLabel = 'value',
        nameLabel = 'name',
        topicLabel = 'topics',
        xAxisValueType: TooltipXAxisValueType = 'auto',
        // Rows shown before the rest are folded into a "+n more" row
        maxEntries = 12,
        // 'list' (title + one row per topic), 'single' (title, name and a
        // big value) or 'auto' (by the data point's shape)
        layout: TooltipLayout = 'auto',
        // The layout the last data point was rendered with
        activeLayout: Exclude<TooltipLayout, 'auto'> = 'list',
        // Single layout: the group its lines go in, its measured box, and
        // its type
        tooltipSingle: ChartSelection<SVGGElement>,
        singleWidth = 0,
        singleHeight = 0,
        dateFormat: string | null = null,
        dateCustomFormat: string | null = null,
        topicsOrder: TooltipTopic['name'][] = [],
        // formats
        numberFormat: string | null = null,
        valueFormatter: ((value: number) => number) | null = null,
        locale: LocaleString | null = null,
        chartWidth: number,
        chartHeight: number,
        svg: ChartSelection<SVGGElement>;

    // The tooltip exposes no width, height or margin accessor, unlike every
    // chart, so these are fixed rather than configuration.
    const margin: ChartMarginParams = {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2,
    };
    const width = 250;
    const height = 45;
    const tooltipWidth = 250;
    const initialTooltipBodyYPosition = 37;
    const tooltipGap = 12;
    const tooltipMaxTopicLength = 170;
    const tooltipMaxTitleLength = 230;
    const tooltipBorderRadius = 3;
    const tooltipContentPadding = 12;
    const circularMarkerRadius = 4;

    const entryLineLimit = 3;
    const initialTooltipTextXPosition = -22;
    const tooltipTextLinePadding = 5;
    const circleYOffset = 8;
    const titleFillColor = 'var(--bc-text-muted, #666a73)';
    const textFillColor = 'var(--bc-text, #282c35)';
    const tooltipTextColor = 'var(--bc-text, #282c35)';
    const defaultAxisSettings = axisTimeCombinations.DAY_MONTH;
    const singlePadding = 12;
    const singleTextSize = 14;
    const singleTextLineHeight = 1.5;
    const singleValueTextSize = 27;
    const singleValueTextLineHeight = 1.18;
    const singleTitleFillColor = 'var(--bc-text-muted, #666a73)';
    const singleNameTextFillColor = 'var(--bc-text-muted, #666a73)';
    const singleValueTextFillColor = 'var(--bc-text, #282c35)';
    const singleValueTextWeight = 200;
    const monthDayYearFormat = timeFormat('%b %d, %Y');
    const monthDayHourFormat = timeFormat('%b %d, %I %p');

    /**
     * This function creates the graph using the selection as container
     * @param {D3Selection} _selection A d3 selection that represents
     *                                  the container(s) where the chart(s) will be rendered
     * @param {Object} _data The data to attach and generate the chart
     */
    function exports<
        TElement extends Element,
        TParent extends Element | null,
        TParentDatum,
    >(
        _selection: Selection<
            TElement,
            TooltipDataShape[],
            TParent,
            TParentDatum
        >
    ) {
        _selection.each(function (this: TElement) {
            chartWidth = width - (margin.left ?? 0) - (margin.right ?? 0);
            chartHeight = height - (margin.top ?? 0) - (margin.bottom ?? 0);

            buildSVG(this);
        });
    }

    /**
     * Builds containers for the tooltip
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups() {
        const container = svg
            .append('g')
            .classed('tooltip-container-group select-disable', true)
            .attr(
                'transform',
                `translate( ${margin.left ?? 0}, ${margin.top ?? 0})`
            );

        container.append('g').classed('tooltip-group', true);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container: Element) {
        // Built again in a new container: the stacked area replaces its
        // vertical marker on every draw, and the line chart only draws one
        // once it is wide enough. The old group goes first, so a tooltip is
        // never drawn twice.
        if (svg && svg.node()?.parentNode !== container) {
            svg.remove();
        }
        if (!svg || svg.node()?.parentNode !== container) {
            svg = select(container)
                .append('g')
                .classed('britechart', true)
                .call(setLayoutClass, layout === 'single')
                // Never between the pointer and the chart: a tooltip that
                // caught the pointer would end the hover that shows it
                .attr('pointer-events', 'none')
                .style('visibility', 'hidden');

            registerTooltipGroup(exports, svg.node());
            buildContainerGroups();
            drawTooltip();

            // Hidden by default. Only on the first build: the wrappers call
            // the tooltip on its container again on every update, and a
            // hide there would make the box fade in again on every move
            (exports as TooltipModule).hide();
        }
        svg.transition()
            .duration(motionDuration(motion.defaultDuration))
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Draws the different elements of the Tooltip box
     * @return void
     * @private
     */
    function drawTooltip() {
        tooltipBackgroundX = -tooltipWidth / 4 + tooltipContentPadding;

        tooltipTextContainer = svg
            .selectAll('.tooltip-group')
            .append('g')
            .classed('tooltip-text', true);

        tooltipBackground = tooltipTextContainer
            .append('rect')
            .classed('tooltip-background', true)
            .attr('x', tooltipBackgroundX)
            .attr('y', 0)
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight)
            .attr('rx', tooltipBorderRadius)
            .attr('ry', tooltipBorderRadius);

        tooltipTitle = tooltipTextContainer
            .append('text')
            .classed('tooltip-title', true)
            .attr('x', getTooltipTitleXPosition())
            .attr('dy', '0em')
            .attr('y', tooltipContentPadding * 2)
            .style('fill', titleFillColor);

        tooltipBody = tooltipTextContainer
            .append('g')
            .classed('tooltip-body', true)
            .style('fill', textFillColor);

        tooltipSingle = tooltipTextContainer
            .append('g')
            .classed('tooltip-single', true)
            .style('display', 'none');

        updateTooltipTitleYPosition();
    }

    /**
     * The rendered size of a text node. Zeros when it cannot be measured:
     * jsdom returns nothing, a hidden tooltip returns zeros in a browser,
     * and a node outside an svg (the React tests draw into a div) has no
     * getBBox at all
     * @param  {Element} node   A text node
     * @return {{ width: Number, height: Number }}
     * @private
     */
    function measure(node: SVGGraphicsElement | null) {
        const box = node && node.getBBox ? node.getBBox() : null;

        return {
            width: (box && box.width) || 0,
            height: (box && box.height) || 0,
        };
    }

    /**
     * The layout a data point is rendered with: the configured one, or by
     * its shape when 'auto' -- a list when it carries an array under the
     * topic label, a single value otherwise
     * @param  {Object} dataPoint   The hovered data point
     * @return {'list' | 'single'}
     * @private
     */
    function resolveLayout(
        dataPoint: TooltipDatum | undefined
    ): Exclude<TooltipLayout, 'auto'> {
        if (layout !== 'auto') {
            return layout;
        }

        return dataPoint && Array.isArray(dataPoint[topicLabel])
            ? 'list'
            : 'single';
    }

    /**
     * The box the active layout draws: its size and where its left edge
     * sits relative to the tooltip group's origin
     * @return {{ width: Number, height: Number, x: Number }}
     * @private
     */
    function getBox() {
        if (activeLayout === 'single') {
            return { width: singleWidth, height: singleHeight, x: 0 };
        }

        return {
            width: tooltipWidth,
            height: tooltipHeight,
            x: tooltipBackgroundX,
        };
    }

    /**
     * Formats the value depending on its characteristics
     * @param  {Number} value Value to format
     * @return {Number}       Formatted value
     * @private
     */
    function getFormattedValue(value: number) {
        if (valueFormatter !== null) {
            return valueFormatter(value);
        }

        let chosenValueFormatter = formatDecimalValue;

        if (!value) {
            return 0;
        }
        if (numberFormat !== null) {
            chosenValueFormatter = format(numberFormat);
        } else if (activeLayout === 'single') {
            chosenValueFormatter = formatSingleValue;
        } else if (isInteger(value)) {
            chosenValueFormatter = formatIntegerValue;
        }

        return chosenValueFormatter(value);
    }

    /**
     * Works out where to draw the box for an anchor point.
     *
     * The anchor arrives in the coordinate space of the parent of the
     * element this tooltip was called on -- a chart's `.metadata-group`,
     * or the container group that holds it -- which is the space every chart
     * dispatches in. The chart's size is not passed in: the tooltip lives
     * inside the chart's svg, so it measures its own frame (see frame.js),
     * then keeps the box inside it (see place.js), flipping to the other side
     * of the anchor when there is no room and sliding vertically at the edges.
     *
     * @param  {Number} anchorX     Horizontal anchor, usually the data point's x
     * @param  {Number} anchorY     Vertical anchor, usually the pointer's y
     * @return {Object}             { x, y } translate() for the tooltip group and
     *                              the origin the group is measured from
     * @private
     */
    function getTooltipPosition([anchorX, anchorY]: TooltipPosition) {
        // Two hops up from the tooltip's own group: its container, then that
        // container's parent, which is the space the anchor is given in.
        const container = svg.node()?.parentNode ?? null;
        const [parentX, parentY] = originOf(
            (container?.parentNode ?? null) as SVGGraphicsElement | null
        );
        // Measured from the parent of the group that gets translated, so
        // the current position never feeds into the next one.
        const {
            width,
            height,
            origin: [groupX, groupY],
        } = measureFrame(
            svg.select<SVGGraphicsElement>('.tooltip-container-group').node()
        );
        const box = getBox();
        const { x, y } = place({
            anchor: [
                parentX + (anchorX || 0) + tooltipOffset.x,
                parentY + (anchorY || 0),
            ],
            size: [box.width, box.height],
            frame: { width, height },
            gap: tooltipGap,
            offsetY: tooltipOffset.y,
        });

        return {
            x: x - groupX - box.x,
            y: y - groupY,
            origin: [groupX, groupY],
        };
    }

    /**
     * Extracts the value from the data object
     * @param  {Object} data Data value containing the info
     * @return {String}      Value to show
     */
    function getValueText(data: { [key: string]: unknown }) {
        const value = data[valueLabel] as number;
        let valueText;

        if (data.missingValue) {
            valueText = '-';
        } else {
            valueText = getFormattedValue(value).toString();
        }

        return valueText;
    }

    /**
     * Resets the height of the tooltip and the pointer for the text
     * position
     */
    function resetSizeAndPositionPointers() {
        tooltipHeight =
            48 + additionalTooltipTitleHeight + tooltipContentPadding;
        ttTextY = initialTooltipBodyYPosition + additionalTooltipTitleHeight;
        ttTextX = 0;
    }

    /**
     * Builds the nodes of one row of the tooltip: the colour dot, the
     * topic's name on the left and its value on the right. Positions and
     * text are set by layoutEntry on every update.
     * @param  {Selection} entry    The row's group, just entered
     * @return void
     * @private
     */
    function buildEntry(entry: ChartSelection<SVGGElement>) {
        entry
            .append('circle')
            .classed('tooltip-circle', true)
            .attr('cx', -tooltipWidth / 4 + 30)
            .attr('cy', circleYOffset)
            .attr('r', circularMarkerRadius)
            .style('stroke-width', 1);

        entry
            .append('text')
            .classed('tooltip-left-text', true)
            .attr('dy', '1em')
            .attr('x', ttTextX)
            .attr('y', 0)
            .style('fill', tooltipTextColor);

        entry
            .append('text')
            .classed('tooltip-right-text', true)
            .attr('dy', '1em')
            .attr('y', 0)
            .style('fill', tooltipTextColor);
    }

    /**
     * Lays out one row of the tooltip for a topic. Rows are kept across
     * updates (see updateContent), so a text is only re-set, re-wrapped and
     * re-measured when it changed; the row goes to its y through its
     * group's transform.
     * @param  {Selection} entry    The row's group
     * @param  {Object} topic       Topic to extract data from
     * @return void
     * @private
     */
    function layoutEntry(
        entry: ChartSelection<SVGGElement>,
        topic: TooltipEntry
    ) {
        const name = topic[nameLabel] as TooltipTopic['name'];
        const isMoreRow = !!topic.isMoreRow;
        const leftText = isMoreRow
            ? `+${topic.hiddenCount} more`
            : topic.topicName || String(name);
        const rightText = isMoreRow ? '' : getValueText(topic);
        const left = entry.select<SVGTextElement>('.tooltip-left-text');
        const right = entry.select<SVGTextElement>('.tooltip-right-text');

        entry.attr('transform', `translate(${ttTextX}, ${ttTextY})`);

        if (left.attr('data-text') !== leftText) {
            left.attr('data-text', leftText)
                .text(leftText)
                .call(
                    textWrap,
                    tooltipMaxTopicLength,
                    initialTooltipTextXPosition
                );
        }

        if (right.attr('data-text') !== rightText) {
            right.attr('data-text', rightText).text(rightText);

            // A width of 0 comes back while the tooltip is hidden; keep the
            // last usable one, as with the height below
            const measuredWidth = measure(
                right.node() as SVGGraphicsElement | null
            ).width;

            if (measuredWidth) {
                right.attr('data-width', measuredWidth);
                tooltipRightWidth = measuredWidth;
            }
        }

        const rightWidth =
            parseFloat(right.attr('data-width')) || tooltipRightWidth || 0;

        right.attr('x', tooltipWidth - rightWidth - 10 - tooltipWidth / 4);

        // A height of 0 comes back when the node cannot be measured: IE11 does it
        // when hovering over the vertical marker, and any browser does it while
        // the tooltip is still hidden. Keep the last usable measurement instead,
        // which is seeded with defaultTextHeight so it is never undefined.
        const measuredTextHeight = measure(
            left.node() as SVGGraphicsElement | null
        ).height;

        textHeight = measuredTextHeight || textHeight;
        tooltipHeight += textHeight + tooltipTextLinePadding;

        const circle = entry.select('.tooltip-circle');

        if (isMoreRow) {
            circle.style('display', 'none').style('fill', null);
        } else {
            circle.style('display', null);
            // `colorMap` only arrives from the multi-value charts, and only
            // on update; a list rendered before one has been sent leaves the
            // dot its stylesheet colour.
            const fill = colorMap?.[name];

            if (fill) {
                circle.style('fill', fill);
            } else {
                circle.style('fill', null);
            }
        }

        ttTextY += textHeight + 7;
    }

    /**
     * Updates the size of the tooltip and moves it next to the anchor
     *
     * @param  {Number} xPosition DataPoint's x position in the chart
     * @param  {Number} yPosition Pointer's y position in the chart
     * @return void
     * @private
     */
    function updatePositionAndSize(xPosition: number, yPosition: number) {
        const { x, y, origin } = getTooltipPosition([xPosition, yPosition]);
        const group = svg.selectAll('.tooltip-group');

        if (isEntering) {
            fadeIn(svg);
            isEntering = false;
        }

        const box = getBox();

        tooltipBackground
            .attr('x', box.x)
            .attr('width', box.width)
            .attr('height', box.height);

        // The box eases towards each new position, the same delayed follow
        // as the mini tooltip. The charts move the container this tooltip
        // lives in (the vertical marker) instantly to each data point, so
        // before easing, the group is shifted by the same amount the
        // container just moved: the box stays where it is on screen and
        // the ease runs in chart space, instead of jumping with the marker
        // and easing back.
        if (tooltipGroupOrigin) {
            const [currentX, currentY] = translateOf(
                group.node() as SVGGraphicsElement | null
            );
            const shiftX = origin[0] - tooltipGroupOrigin[0];
            const shiftY = origin[1] - tooltipGroupOrigin[1];

            if (shiftX || shiftY) {
                group
                    .interrupt()
                    .attr(
                        'transform',
                        `translate(${currentX - shiftX}, ${currentY - shiftY})`
                    );
            }
        }
        tooltipGroupOrigin = [origin[0], origin[1]];

        group
            .transition()
            .duration(motionDuration(chaseDuration))
            .ease(ease)
            .attr('transform', `translate(${x}, ${y})`);
    }

    /**
     * Get formatted key to show in the tooltip title
     * @param {Date | String} key   Key to format
     * @return {String}     Formatted Key
     * @private
     */
    function formatKey(key: unknown) {
        if (!isDefined(key)) {
            return '';
        }

        const type =
            xAxisValueType === 'auto' ? detectKeyType(key) : xAxisValueType;

        if (type === 'number') {
            return Number(key);
        }

        if (type === 'category') {
            return String(key);
        }

        return formatDate(new Date(key as string | number | Date));
    }

    /**
     * Works out how to show a key when xAxisValueType is 'auto': a Date or
     * a string that parses as one is a date, a number or a numeric string
     * is a number, anything else (a category name) is shown as it is
     * @param  {Date | Number | String} key   Key of the data point
     * @return {'date' | 'number' | 'category'}
     * @private
     */
    function detectKeyType(key: unknown) {
        if (key instanceof Date) {
            return 'date';
        }

        if (typeof key === 'number') {
            return 'number';
        }

        const text = String(key).trim();

        if (text !== '' && Number.isFinite(Number(text))) {
            return 'number';
        }

        if (Number.isFinite(Date.parse(text))) {
            return 'date';
        }

        return 'category';
    }

    /**
     * The key of a data point: the configured dateLabel, or, when the point
     * has no such field, its `key` (what the stacked and grouped bar charts
     * dispatch) or its `date`
     * @param  {Object} dataPoint   The hovered data point
     * @return {Date | Number | String | undefined}
     * @private
     */
    function getKey(dataPoint: TooltipDatum) {
        if (isDefined(dataPoint[dateLabel])) {
            return dataPoint[dateLabel];
        }

        if (isDefined(dataPoint.key)) {
            return dataPoint.key;
        }

        return dataPoint.date;
    }

    /**
     * Figures out which date format to use when showing the date of the current data entry
     * @param {Date} date   Date object to format
     * @return {Function}   The proper date formatting function
     * @private
     */
    function formatDate(date: Date) {
        const settings = dateFormat || defaultAxisSettings;
        let format: ((date: Date) => string) | null = null;
        // Members are added by the branches below, so the type is the whole
        // shape rather than what the initialiser happens to carry.
        const localeOptions: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
        };

        if (
            settings === axisTimeCombinations.DAY_MONTH ||
            settings === axisTimeCombinations.MONTH_YEAR
        ) {
            format = monthDayYearFormat;
            localeOptions.year = 'numeric';
        } else if (
            settings === axisTimeCombinations.HOUR_DAY ||
            settings === axisTimeCombinations.MINUTE_HOUR
        ) {
            format = monthDayHourFormat;
            localeOptions.hour = 'numeric';
        } else if (
            settings === axisTimeCombinations.CUSTOM &&
            typeof dateCustomFormat === 'string'
        ) {
            format = timeFormat(dateCustomFormat);
        }

        if (
            locale &&
            typeof Intl !== 'undefined' &&
            typeof Intl === 'object' &&
            Intl.DateTimeFormat
        ) {
            const f = Intl.DateTimeFormat(locale, localeOptions);

            return f.format(date);
        }

        // Every branch above that leaves `format` null is the one that also
        // returns through Intl, so this is reached only with a formatter set.
        return format!(date);
    }

    /**
     * Returns the x-Position of the Tooltip Title
     * @private
     */
    function getTooltipTitleXPosition() {
        return -tooltipWidth / 4 + 2 * tooltipContentPadding;
    }

    /**
     * Helper method to sort the passed topics array by the names passed int he order arary
     * @param  {Object[]} topics    Topics data, retrieved from datapoint passed by line chart
     * @param  {Object[]} order     Array of names in the order to sort topics by
     * @return {Object[]}           sorted topics object
     * @private
     */
    function _sortByTopicsOrder(
        topics: TooltipEntry[],
        order: TooltipTopic['name'][] = topicsOrder
    ) {
        return order.map(
            (orderName) => topics.filter(({ name }) => name === orderName)[0]
        );
    }

    /**
     * Sorts topic by alphabetical order for arrays of objects with a name proeprty
     * @param  {Array} topics   List of topic objects
     * @return {Array}          List of topic name strings
     * @private
     */
    function _sortByAlpha(topics: TooltipEntry[]) {
        return topics
            .map((d) => d)
            .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name === b.name) return 0;

                return -1;
            });
    }

    /**
     * Calculates the number of lines the tooltip title will need and updates the
     * initialTooltipBodyYPosition accordingly
     * @private
     */
    function updateTooltipTitleYPosition() {
        const approximateTitle = getTooltipTitle(new Date());
        const approximateNumberOfTitleLines = getApproximateNumberOfLines(
            approximateTitle,
            16,
            tooltipMaxTitleLength
        );

        if (approximateNumberOfTitleLines > 1) {
            additionalTooltipTitleHeight =
                17 * (approximateNumberOfTitleLines - 1);
        }
    }

    /**
     * Updates value of tooltipTitle with the data meaning and the date
     * @param  {Object} dataPoint Point of data to use as source
     * @return void
     * @private
     */
    function updateTitle(dataPoint: TooltipDatum) {
        const textTitle = getTooltipTitle(getKey(dataPoint));

        tooltipTitle
            .text(textTitle)
            .call(textWrap, tooltipMaxTitleLength, getTooltipTitleXPosition());
    }

    /**
     * Marks the layout on the tooltip's group. The single layout keeps the
     * mini tooltip's class, so the stylesheet and any selector written for it
     * still apply
     * @param {D3Selection} group   The tooltip's group
     * @param {Boolean} isSingle    Whether the layout is the single one
     * @private
     */
    function setLayoutClass(
        group: ChartSelection<SVGGElement>,
        isSingle: boolean
    ) {
        group
            .classed('britechart-tooltip', !isSingle)
            .classed('britechart-mini-tooltip', isSingle);
    }

    /**
     * Gets the tooltipTitle respecting the different settings
     * @param  {Date | String}  date  Date to use
     * @private
     */
    function getTooltipTitle(date: unknown) {
        let textTitle = title;
        const formattedDate = formatKey(date);

        if (textTitle.length) {
            if (shouldShowDateInTitle && formattedDate !== '') {
                textTitle = `${textTitle} - ${formattedDate}`;
            }
        } else {
            textTitle = String(formattedDate);
        }

        // A number key comes back as a number
        return String(textTitle);
    }

    /**
     * Fades the tooltip out and hides it
     * @return {void}
     * @private
     */
    function hideTooltip() {
        if (!isShown) {
            return;
        }
        isShown = false;
        isEntering = false;
        fadeOut(svg);
    }

    /**
     * Shows the tooltip; it fades in with its first update
     * @return {void}
     * @private
     */
    function showTooltip(
        dataPoint?: TooltipDataShape,
        position?: TooltipPosition
    ) {
        // Already showing: no new fade -- the wrappers call show() before
        // every update
        if (!isShown) {
            isShown = true;
            // Transparent until the first update fills it, which fades it in
            isEntering = true;
            prepareToShow(svg);
        }

        // The single-value charts dispatch the hovered point and its
        // position on mouse over; the multi-value ones dispatch their whole
        // dataset, which is not a point to render
        if (
            dataPoint &&
            typeof dataPoint === 'object' &&
            !Array.isArray(dataPoint) &&
            Array.isArray(position)
        ) {
            updateTooltip(dataPoint, position[0], position[1]);
        } else if (isEntering) {
            // Nothing to render yet: the title alone, until the first update
            updateContent({} as TooltipDatum);
        }
    }

    /**
     * Wraps a text given the text, width, x position and textFormatter function
     * @param  {D3Selection} text  Selection with the text to wrap inside
     * @param  {Number} width Desired max width for that line
     * @param  {Number} xpos  Initial x position of the text
     * REF: http://bl.ocks.org/mbostock/7555321
     * More discussions on https://github.com/mbostock/d3/issues/1642
     * @private
     */
    function textWrap(
        text: ChartSelection<SVGTextElement>,
        width: number,
        xpos = 0
    ) {
        text.each(function (this: SVGTextElement) {
            let word: string | undefined;
            let line: string[] = [];
            let lineNumber = 0;

            // The parameter is rebound to the element being iterated: `each`
            // visits one node at a time and the rest of the body reads and
            // writes that one.
            text = select(this);

            const words = text.text().split(/\s+/).reverse();
            const lineHeight = 1.2;
            const y = text.attr('y');
            const dy = parseFloat(text.attr('dy'));
            let tspan = text
                .text(null)
                .append('tspan')
                .attr('x', xpos)
                .attr('y', y)
                .attr('dy', dy + 'em');

            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(' '));

                // fixes for IE wrap text issue
                const textWidth = getTextWidth(
                    line.join(' '),
                    16,
                    'Karla, sans-serif'
                );

                if (textWidth > width) {
                    line.pop();
                    tspan.text(line.join(' '));

                    if (lineNumber < entryLineLimit - 1) {
                        line = [word];
                        tspan = text
                            .append('tspan')
                            .attr('x', xpos)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            }
        });
    }

    /**
     * Draws the data entries inside the tooltip
     * @param  {Object} dataPoint   Data entry from to take the info
     * @return void
     * @private
     */
    function updateContent(dataPoint: TooltipDatum) {
        activeLayout = resolveLayout(dataPoint);

        if (activeLayout === 'single') {
            renderSingle(dataPoint);
        } else {
            renderList(dataPoint);
        }
    }

    /**
     * Draws the single-value layout: the title, the name and a big value,
     * one line each, the box sized to the widest line
     * @param  {Object} dataPoint   The hovered data point, with a name and a value
     * @return void
     * @private
     */
    function renderSingle(dataPoint: TooltipDatum = {} as TooltipDatum) {
        const value = dataPoint[valueLabel];
        const name = dataPoint[nameLabel] || '';
        const lineHeight = singleTextSize * singleTextLineHeight;
        const valueLineHeight = singleValueTextSize * singleValueTextLineHeight;
        const lines = [];
        let y = 0;

        tooltipTitle.style('display', 'none');
        tooltipBody.style('display', 'none');
        tooltipSingle
            .style('display', null)
            .attr('transform', `translate(${singlePadding}, ${singlePadding})`);
        tooltipSingle.selectAll('text').remove();

        if (title) {
            lines.push(
                tooltipSingle
                    .append('text')
                    .classed('mini-tooltip-title', true)
                    .attr('dy', '1em')
                    .attr('y', y)
                    .style('fill', singleTitleFillColor)
                    .style('font-size', singleTextSize)
                    .text(title)
            );
            y += lineHeight;
        }

        if (name) {
            lines.push(
                tooltipSingle
                    .append('text')
                    .classed('mini-tooltip-name', true)
                    .attr('dy', '1em')
                    .attr('y', y)
                    .style('fill', singleNameTextFillColor)
                    .style('font-size', singleTextSize)
                    .text(String(name))
            );
            y += lineHeight;
        }

        if (isDefined(value)) {
            lines.push(
                tooltipSingle
                    .append('text')
                    .classed('mini-tooltip-value', true)
                    .attr('dy', '1em')
                    .attr('y', y)
                    .style('fill', singleValueTextFillColor)
                    .style('font-size', singleValueTextSize)
                    .style('font-weight', singleValueTextWeight)
                    .text(getFormattedValue(value as number))
            );
            y += valueLineHeight;
        }

        // getBBox() comes back empty while the tooltip is hidden and under
        // jsdom; a missing width must not turn into a NaN attribute
        const textWidth =
            max(lines.map((line) => measure(line.node()).width)) || 0;

        singleWidth = textWidth + 2 * singlePadding;
        singleHeight = y + 2 * singlePadding;
    }

    /**
     * Draws the list layout: the title and one row per topic
     * @param  {Object} dataPoint   The hovered data point, with its topics
     * @return void
     * @private
     */
    function renderList(dataPoint: TooltipDatum) {
        // Read by the topic label, which a chart can rename, so the cast is
        // that accessor rather than an assumption about the shape.
        let topics = (dataPoint[topicLabel] as TooltipEntry[]) || [];

        tooltipTitle.style('display', null);
        tooltipBody.style('display', null);
        tooltipSingle.style('display', 'none');

        // sort order by topicsOrder array if passed
        if (topicsOrder.length) {
            topics = _sortByTopicsOrder(topics);
        } else if (topics.length && topics[0].name) {
            topics = _sortByAlpha(topics);
        }

        topics = topics.filter(Boolean);

        // Past maxEntries the last row says how many are not shown, so the
        // box keeps a height that fits in the chart
        if (maxEntries > 0 && topics.length > maxEntries) {
            const shown = topics.slice(0, maxEntries - 1);

            topics = shown.concat([
                {
                    [nameLabel]: MORE_ROW_KEY,
                    isMoreRow: true,
                    hiddenCount: topics.length - shown.length,
                } as TooltipEntry,
            ]);
        }

        updateTitle(dataPoint);
        resetSizeAndPositionPointers();

        // One row per topic, kept across updates so the pointer moving
        // over the chart re-sets text and positions instead of rebuilding
        // every node
        const entries = tooltipBody
            .selectAll<SVGGElement, TooltipEntry>('.tooltip-entry')
            .data(topics, (topic) => String(topic[nameLabel]));

        entries.exit().remove();

        const entered = entries
            .enter()
            .append('g')
            .classed('tooltip-entry', true)
            .call(buildEntry);

        entered
            .merge(entries)
            .order()
            .each(function (this: SVGGElement, topic) {
                layoutEntry(select(this), topic);
            });
    }

    /**
     * Updates tooltip title, content, size and position
     * sorts by alphatical name order if not forced order given
     *
     * @param  {lineChartPointByDate} dataPoint  Current datapoint to show info about
     * @param  {Number} xPosition           Position of the mouse on the X axis
     * @return void
     * @private
     */
    function updateTooltip(
        dataPoint: TooltipDatum,
        xPosition: number,
        yPosition: number
    ) {
        updateContent(dataPoint);
        svg.call(setLayoutClass, activeLayout === 'single');
        updatePositionAndSize(xPosition, yPosition);
    }

    // API

    /**
     * constants to be used to force the x axis to respect a certain granularity
     * current options: HOUR_DAY, DAY_MONTH, MONTH_YEAR
     * @example tooltip.dateFormat(tooltip.axisTimeCombinations.HOUR_DAY)
     */
    (exports as TooltipModule).axisTimeCombinations = axisTimeCombinations;

    /**
     * Exposes the ability to force the tooltip to use a certain date format
     * @param  {String} _x          Desired format
     * @return {String | module}  Current format or module to chain calls
     * @public
     */
    (exports as TooltipModule).dateFormat = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return dateFormat || defaultAxisSettings;
        }
        dateFormat = _x;

        return this;
    } as TooltipModule['dateFormat'];

    /**
     * Exposes the ability to use a custom date format
     * @param  {String} _x          Desired custom format
     * @return {String | module}  Current format or module to chain calls
     * @public
     * @example tooltip.dateFormat(tooltip.axisTimeCombinations.CUSTOM);
     * tooltip.dateCustomFormat('%H:%M %p')
     */
    (exports as TooltipModule).dateCustomFormat = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return dateCustomFormat;
        }
        dateCustomFormat = _x;

        return this;
    } as TooltipModule['dateCustomFormat'];

    /**
     * Gets or Sets the dateLabel of the data: the field of the data point
     * shown in the title. When the data point has no such field, its `key`
     * (what the stacked and grouped bar charts dispatch) or its `date` is
     * used, so the default works for every chart.
     * @param  {String} _x          Desired dateLabel
     * @return {String | module}   Current dateLabel or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).dateLabel = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return dateLabel;
        }
        dateLabel = _x;
        markLabelSet(exports, 'dateLabel');

        return this;
    } as TooltipModule['dateLabel'];

    /**
     * Hides the tooltip
     * @return {module} Tooltip module to chain calls
     * @public
     */
    (exports as TooltipModule).hide = function (this: TooltipModule) {
        hideTooltip();

        return this;
    } as TooltipModule['hide'];

    /**
     * Pass locale for the tooltip to render the date in
     * @param  {String} _x          Must be a locale tag like 'en-US' or 'fr-FR'
     * @return {String | module}    Current locale or module to chain calls
     * @public
     */
    (exports as TooltipModule).locale = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return locale;
        }
        locale = _x;

        return this;
    } as TooltipModule['locale'];

    /**
     * Gets or Sets the nameLabel of the data: the field that identifies each
     * row of the list, and the colour the chart gave it, or the name shown in
     * the single layout. `'name'` by default. The stacked bar chart names its
     * rows by `stack` and the grouped bar chart by `group`: without
     * `nameLabel('stack')` or `nameLabel('group')`, the tooltip looks up each
     * row's colour under the bar's name, and the rows show none.
     * @param  {String} _x           Desired nameLabel
     * @return {String | module}    Current nameLabel or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).nameLabel = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return nameLabel;
        }
        nameLabel = _x;
        markLabelSet(exports, 'nameLabel');

        return this;
    } as TooltipModule['nameLabel'];

    /**
     * Gets or Sets the number format for the value displayed on the tooltip
     * @param  {string} _x              Desired numberFormat for the chart. See examples [here]{@link https://d3js.org/d3-format}
     * @return {string | module}        Current numberFormat or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).numberFormat = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return numberFormat;
        }
        numberFormat = _x;

        return this;
    } as TooltipModule['numberFormat'];

    /**
     * Gets or Sets the formatter function for the value displayed on the tooltip.
     * Setting this property makes the tooltip ignore numberFormat.
     * @param  {Function} _x Desired formatter function
     * @return {Function | module} Current valueFormatter or Chart module to chain calls
     * @public
     * @example tooltipChart.valueFormatter(value => value.toString().length.toString())
     */
    (exports as TooltipModule).valueFormatter = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return valueFormatter;
        }
        valueFormatter = _x;

        return this;
    } as TooltipModule['valueFormatter'];

    /**
     * Gets or Sets shouldShowDateInTitle
     * @param  {Boolean} _x          Desired value
     * @return {Boolean | module}    Current shouldShowDateInTitle or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).shouldShowDateInTitle = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return shouldShowDateInTitle;
        }
        shouldShowDateInTitle = _x;

        return this;
    } as TooltipModule['shouldShowDateInTitle'];

    /**
     * Shows the tooltip. Given the hovered data point and its position, as
     * the single-value charts dispatch them on `customMouseOver`, it renders
     * and places the tooltip at once; otherwise it shows empty until the
     * first `update`, which is what the multi-value charts need.
     * @param  {Object} [dataPoint]     Data point to render
     * @param  {Number[]} [position]    [x, y] to anchor the tooltip to, in pixels
     * @return {module} Tooltip module to chain calls
     * @public
     */
    (exports as TooltipModule).show = function (
        this: TooltipModule,
        dataPoint,
        position
    ) {
        showTooltip(dataPoint, position);

        return this;
    } as TooltipModule['show'];

    /**
     * Gets or Sets the title of the tooltip. By default it has none, so a list
     * shows only the date
     * @param  {String} _x          Desired title
     * @return {String | module}   Current title or module to chain calls
     * @public
     */
    (exports as TooltipModule).title = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return title;
        }
        title = _x;

        return this;
    } as TooltipModule['title'];

    /**
     * Gets or Sets an offset, in pixels, applied to the point the tooltip is
     * placed next to: `x` moves the anchor along the chart, `y` moves the box
     * up (negative) or down. The box still stays inside the chart.
     * @param  {Object} _x          Object with the x and y offsets
     * @return {Object | module}    Current tooltipOffset or module to chain calls
     * @public
     * @example tooltip.tooltipOffset({ x: 0, y: -20 })
     */
    (exports as TooltipModule).tooltipOffset = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return tooltipOffset;
        }
        tooltipOffset = _x;

        return this;
    } as TooltipModule['tooltipOffset'];

    /**
     * Gets or Sets the layout: 'list' shows the title and one row per topic,
     * with a colour dot, the topic's name and its value (the multi-value
     * charts: line, stacked area, stacked bar and grouped bar); 'single'
     * shows the title, the name and a big value (the single-value charts:
     * bar, scatter plot, heatmap and donut);
     * 'auto', the default, picks by the data point: a list when it carries
     * an array under the topic label, a single value otherwise. Set before
     * the tooltip is drawn.
     * @param  {String} [_x='auto']     'auto', 'list' or 'single'
     * @return {String | module}        Current layout or Chart module to chain calls
     * @public
     * @example tooltip.layout('single')
     */
    (exports as TooltipModule).layout = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return layout;
        }
        layout = _x;

        return this;
    } as TooltipModule['layout'];

    /**
     * Gets or Sets the most rows the tooltip shows. Past that, the last row
     * reads "+n more" instead, so the box keeps a height that fits in the
     * chart. 0 shows every row.
     * @param  {Number} [_x=12]      Most rows to show
     * @return {Number | module}    Current maxEntries or Chart module to chain calls
     * @public
     * @example tooltip.maxEntries(6)
     */
    (exports as TooltipModule).maxEntries = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return maxEntries;
        }
        maxEntries = _x;

        return this;
    } as TooltipModule['maxEntries'];

    /**
     * Pass an override for the ordering of your tooltip
     * @param  {String[]} _x           Array of the names of your tooltip items
     * @return {String[] | module}    Current overrideOrder or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).topicsOrder = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return topicsOrder;
        }
        topicsOrder = _x;

        return this;
    } as TooltipModule['topicsOrder'];

    /**
     * Gets or Sets the topicLabel of the data: the field of the data point
     * that holds the list's rows. `'topics'` by default, which is what the
     * line chart dispatches. The stacked area, stacked bar and grouped bar
     * charts dispatch their rows as `values`, so set `topicLabel('values')`
     * for them. (`@britecharts/wrappers`, and so React's `Tooltip`, set
     * `'values'` themselves: there, the line chart needs `'topics'`.)
     * @param  {String} _x          Desired topicLabel
     * @return {String | module}   Current topicLabel or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).topicLabel = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return topicLabel;
        }
        topicLabel = _x;
        markLabelSet(exports, 'topicLabel');

        return this;
    } as TooltipModule['topicLabel'];

    /**
     * Updates the content and position of the tooltip. The arguments are
     * what every chart dispatches with `customMouseMove`, so
     * `chart.on('customMouseMove', tooltip.update)` is all the wiring
     * needed: the data point, its anchor `[x, y]` in pixels relative to the
     * chart's drawing area, the chart's size (ignored; the tooltip measures
     * the chart itself) and, from the multi-value charts, the map of topic
     * names to colours. The order the multi-value charts used before 3.0,
     * `update(dataPoint, colorMap, x, y)`, still works and warns once.
     * @param  {Object} dataPoint       Data point to render
     * @param  {Number[]} position      [x, y] to anchor the tooltip to, in pixels
     * @param  {Number[]} [chartSize]   [width, height] of the chart; ignored
     * @param  {Object} [colorMap]      Topic name to colour, for the list layout
     * @return {module}                 Tooltip module to chain calls
     * @public
     * @example chart.on('customMouseMove', tooltip.update)
     */
    (exports as TooltipModule).update = function (
        this: TooltipModule,
        dataPoint,
        position,
        chartSize,
        colorMapping
    ) {
        // Two argument orders reach here -- the one the charts dispatch and
        // the one they used before 3.0 -- and which is which is only known
        // after the checks below. So the locals hold whatever their position
        // can carry until then, rather than what the first overload says.
        let anchor: unknown = position;
        let colors: unknown = colorMapping;

        if (
            !Array.isArray(position) &&
            position &&
            typeof position === 'object'
        ) {
            // update(dataPoint, colorMap, x, y): the order before 3.0
            colors = position;
            anchor = [chartSize, colorMapping];

            if (!hasWarnedLegacyOrder) {
                hasWarnedLegacyOrder = true;
                // eslint-disable-next-line no-console
                console.warn(
                    'tooltip.update(dataPoint, colorMap, x, y) is deprecated: the charts now dispatch (dataPoint, [x, y], [width, height], colorMap), which update() takes as they come. The old order still works in 3.x.'
                );
            }
        } else if (
            !Array.isArray(chartSize) &&
            chartSize &&
            typeof chartSize === 'object'
        ) {
            // update(dataPoint, [x, y], colorMap)
            colors = chartSize;
        }

        if (colors) {
            colorMap = colors as TopicColorMap;
        }

        const [anchorX, anchorY] = (anchor ?? []) as [
            number | undefined,
            number | undefined,
        ];

        updateTooltip(
            dataPoint as TooltipDatum,
            anchorX as number,
            anchorY as number
        );

        return this;
    } as TooltipModule['update'];

    /**
     * Gets or Sets the valueLabel of the data: the field holding the value
     * shown for each row, or the big value of the single layout. `'value'`
     * by default. The scatter plot's points carry theirs as `y`, so set
     * `valueLabel('y')` for it.
     * @param  {String} _x          Desired valueLabel
     * @return {String | module}   Current valueLabel or Chart module to chain calls
     * @public
     */
    (exports as TooltipModule).valueLabel = function (this: TooltipModule, _x) {
        if (!arguments.length) {
            return valueLabel;
        }
        valueLabel = _x;
        markLabelSet(exports, 'valueLabel');

        return this;
    } as TooltipModule['valueLabel'];

    /**
     * Gets or Sets how the key of the data point is shown in the title:
     * 'date' formats it as a date, 'number' as a number, 'category' shows
     * it as it is, and 'auto' (the default) picks one per key -- a Date or
     * a string that parses as one is a date, a number or a numeric string
     * is a number, anything else is a category. Set 'date' for keys that
     * happen to parse as numbers, or 'category' for names that happen to
     * parse as dates.
     * @param  {String} [_x='auto']     'auto', 'date', 'number' or 'category'
     * @return {String | module}        Current xAxisValueType or Chart module to chain calls
     * @public
     * @example tooltip.xAxisValueType('category')
     */
    (exports as TooltipModule).xAxisValueType = function (
        this: TooltipModule,
        _x
    ) {
        if (!arguments.length) {
            return xAxisValueType;
        }
        xAxisValueType = _x;

        return this;
    } as TooltipModule['xAxisValueType'];

    return exports as unknown as TooltipModule;
}
