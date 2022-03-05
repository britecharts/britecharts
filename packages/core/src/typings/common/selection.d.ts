import { Selection } from 'd3-selection';

export type ChartModuleSelection<DataShape> = (
  _selection: Selection<Element, DataShape, Element | null, any>,
  _data: DataShape
) => void;
