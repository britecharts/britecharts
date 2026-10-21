// `as const` so the event names survive as a literal tuple rather than widening
// to string[]. BritechartsCustomEvent is derived from it, which keeps the names
// in one place: the runtime array and the type cannot drift apart.
export const britechartsCustomEvents = [
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customClick',
    // The brush's own two, fired as its selection starts and ends
    'customBrushStart',
    'customBrushEnd',
] as const;

export type BritechartsCustomEvent = (typeof britechartsCustomEvents)[number];
