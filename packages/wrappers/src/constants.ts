// `as const` so the event names survive as a literal tuple rather than widening
// to string[]. BritechartsCustomEvent is derived from it, which keeps the names
// in one place: the runtime array and the type cannot drift apart.
export const britechartsCustomEvents = [
    'customMouseOver',
    'customMouseMove',
    'customMouseOut',
    'customClick',
] as const;

export type BritechartsCustomEvent = (typeof britechartsCustomEvents)[number];
