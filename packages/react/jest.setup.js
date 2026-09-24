import { format } from 'util';

/**
 * Any console.error or console.warn raised during a test fails that test,
 * unless it matches an entry below. React reports the mistakes this package is
 * about to be refactored around (act() warnings, missing keys, lifecycle
 * misuse, ...) through the console, so a silent console would hide them.
 *
 * Every entry needs a `reason`. Keep this list short: an entry is a known
 * problem waiting to be fixed, not a place to hide new ones.
 */
const ALLOWED_CONSOLE_MESSAGES = [
    {
        method: 'warn',
        pattern:
            /This method is being deprecated! Please modify your data to use "topic" as the key\./,
        reason: "core's project() helper warns when tooltip data uses the legacy `name` key; the Tooltip fixtures still do",
    },
];

const isAllowed = ({ method, message }) =>
    ALLOWED_CONSOLE_MESSAGES.some(
        (allowed) => allowed.method === method && allowed.pattern.test(message)
    );

let consoleCalls;

beforeEach(() => {
    consoleCalls = [];

    ['error', 'warn'].forEach((method) => {
        jest.spyOn(console, method).mockImplementation((...args) => {
            consoleCalls.push({ method, message: format(...args) });
        });
    });
});

afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();

    const unexpected = consoleCalls.filter((call) => !isAllowed(call));

    if (unexpected.length) {
        throw new Error(
            `Unexpected console output during the test:\n${unexpected
                .map(({ method, message }) => `  console.${method}: ${message}`)
                .join('\n')}`
        );
    }
});

// This fixes a problem with the wrapTextWithEllipses function in britecharts
// using getComputedTextLength and not being available because of jsdom.
// More info in https://github.com/britecharts/britecharts-react/pull/65#issuecomment-348726423
if (!window.SVGElement) {
    window.SVGElement = {};
}

window.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
});
window.SVGElement.prototype.getComputedTextLength = () => 200;
