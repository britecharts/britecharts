/**
 * The part of JSON Schema that scripts/generate-schemas.mjs writes, and that
 * {@link checkValue} reads: the generated config schemas use nothing else, so
 * the wrappers check values without a validator dependency.
 *
 * `not: {}` marks a value JSON can't hold, a function: a spec can't set one,
 * but the wrappers take one from JavaScript.
 */
export interface SchemaNode {
    type?: 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object';
    format?: string;
    const?: unknown;
    enum?: readonly unknown[];
    anyOf?: readonly SchemaNode[];
    not?: Record<string, never>;
    items?: SchemaNode | false;
    prefixItems?: readonly SchemaNode[];
    minItems?: number;
    properties?: Record<string, SchemaNode>;
    required?: readonly string[];
    additionalProperties?: SchemaNode | boolean;
}

/** A chart's configuration: one schema per accessor, command or event. */
export interface ConfigurationSchema {
    type: 'object';
    properties: Record<string, SchemaNode>;
    additionalProperties: false;
}

const isFunctionSchema = (schema: SchemaNode) => schema.not !== undefined;

const quote = (value: unknown) =>
    typeof value === 'string' ? `"${value}"` : String(value);

// "a string" → "strings", for "an array of strings"
const plural = (description: string) => `${description.replace(/^an? /, '')}s`;

/** What a schema accepts, as the end of "expected …" */
export const describeSchema = (schema: SchemaNode): string => {
    if (isFunctionSchema(schema)) {
        return 'a function';
    }
    if (schema.anyOf) {
        return schema.anyOf.map(describeSchema).join(' or ');
    }
    if (schema.enum) {
        return `one of ${schema.enum.map(quote).join(', ')}`;
    }
    if ('const' in schema) {
        return quote(schema.const);
    }
    if (schema.prefixItems) {
        const items = schema.prefixItems.map(describeSchema);

        const { minItems = items.length } = schema;
        const count =
            minItems === items.length
                ? `${items.length}`
                : `${minItems} to ${items.length}`;

        return new Set(items).size === 1
            ? `an array of ${count} ${plural(items[0])}`
            : `an array of ${count} items: ${items.join(', ')}`;
    }
    if (schema.type === 'array') {
        return schema.items
            ? `an array of ${plural(describeSchema(schema.items))}`
            : 'an array';
    }

    switch (schema.type) {
        case 'string':
            return 'a string';
        case 'number':
            return 'a number';
        case 'boolean':
            return 'a boolean';
        case 'null':
            return 'null';
        case 'object':
            return 'an object';
        default:
            return 'any value';
    }
};

/** What a value is, as the end of "got …" */
export const describeValue = (value: unknown) => {
    if (value === null) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return `an array of ${value.length}`;
    }

    switch (typeof value) {
        case 'string':
            return `the string ${quote(value)}`;
        case 'number':
        case 'boolean':
            return String(value);
        case 'function':
            return 'a function';
        default:
            return 'an object';
    }
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const matchesType = (value: unknown, schema: SchemaNode) => {
    switch (schema.type) {
        case 'string':
            // A date-time also arrives as a Date from JavaScript
            return (
                typeof value === 'string' ||
                (schema.format === 'date-time' && value instanceof Date)
            );
        case 'number':
            return typeof value === 'number' && !Number.isNaN(value);
        case 'boolean':
            return typeof value === 'boolean';
        case 'null':
            return value === null;
        case 'array':
            return Array.isArray(value);
        case 'object':
            return isPlainObject(value);
        default:
            return true;
    }
};

/**
 * The problems with a value against its schema, each as `path: expected …,
 * got …`, or none when it matches.
 */
export const checkValue = (
    value: unknown,
    schema: SchemaNode,
    path: string
): string[] => {
    const mismatch = [
        `${path}: expected ${describeSchema(schema)}, got ${describeValue(value)}`,
    ];

    if (typeof value === 'function' || isFunctionSchema(schema)) {
        return typeof value === 'function' && isFunctionSchema(schema)
            ? []
            : mismatch;
    }
    if (schema.anyOf) {
        return schema.anyOf.some(
            (option) => checkValue(value, option, path).length === 0
        )
            ? []
            : mismatch;
    }
    if (schema.enum) {
        return schema.enum.includes(value) ? [] : mismatch;
    }
    if ('const' in schema) {
        return value === schema.const ? [] : mismatch;
    }
    if (!matchesType(value, schema)) {
        return mismatch;
    }
    if (Array.isArray(value)) {
        return checkItems(value, schema, path);
    }
    if (isPlainObject(value) && schema.type === 'object') {
        return checkProperties(value, schema, path);
    }

    return [];
};

const checkItems = (value: unknown[], schema: SchemaNode, path: string) => {
    const { prefixItems, items, minItems = 0 } = schema;

    if (
        prefixItems &&
        (value.length < minItems || value.length > prefixItems.length)
    ) {
        return [
            `${path}: expected ${describeSchema(schema)}, got ${describeValue(value)}`,
        ];
    }

    return value.flatMap((item, index) => {
        const itemSchema = prefixItems ? prefixItems[index] : items;

        return itemSchema
            ? checkValue(item, itemSchema, `${path}[${index}]`)
            : [];
    });
};

const checkProperties = (
    value: Record<string, unknown>,
    schema: SchemaNode,
    path: string
) => {
    const { properties = {}, additionalProperties = true } = schema;

    return Object.entries(value).flatMap(([key, item]) => {
        const itemPath = `${path}.${key}`;

        if (properties[key]) {
            return checkValue(item, properties[key], itemPath);
        }
        if (typeof additionalProperties === 'object') {
            return checkValue(item, additionalProperties, itemPath);
        }

        return additionalProperties ? [] : [`${itemPath}: not supported`];
    });
};
