import { Selection } from 'd3-selection';

/**
 * The callable a chart module is: pass it to `selection.call(chart)` and it
 * draws into that selection.
 *
 * It takes the selection and nothing else. Every chart core ships declares
 * `function exports(_selection)` and reads its datum back out from inside, via
 * `_selection.each(function (_data) { ... })`. `d3.call` passes no second
 * argument either, so a `_data` parameter here -- as this type used to declare
 * -- made every correct `.call(chart)` fail to compile with "Expected 2
 * arguments, but got 1".
 *
 * Generic in the element and parent types rather than fixed, because d3's
 * `Selection` is invariant in them: a `Selection<HTMLElement, ...>` is not
 * assignable to a `Selection<Element, ...>`, so a concrete element type here
 * would reject the selections callers actually hold.
 */
export type ChartModuleSelection<DataShape> = <
  TElement extends Element,
  TParent extends Element | null,
  TParentDatum
>(
  _selection: Selection<TElement, DataShape, TParent, TParentDatum>
) => void;
