#!/usr/bin/env node
/**
 * Waits for the composed Storybook's refs to be serving, then runs its command.
 *
 * `yarn demos` starts core (2001), react (2002) and the composing shell (2000)
 * at once. The shell resolves its refs once, at startup: for each one it fetches
 * `<url>/iframe.html` from Node and records `type: 'server-checked'` if that
 * succeeds, `'unknown'` if it does not. That decision is never revisited.
 *
 * A ref left at `'unknown'` is what the browser then has to check itself, and it
 * does so with `credentials: 'include'` -- which Storybook's own
 * `Access-Control-Allow-Origin: *` cannot satisfy, so the ref fails to load and
 * the sidebar shows "Oh no! Something went wrong loading this Storybook". Since
 * the shell boots at the same moment as the two Storybooks it points at, it
 * always lost that race, and which of the two blocks broke was down to whichever
 * webpack build happened to finish first.
 *
 * Waiting here makes local behave the way production already does, where the
 * refs are Chromatic URLs that are always up.
 *
 * Usage: node scripts/wait-for-storybook-refs.js <url>... -- <command> [args]
 */
const { spawn } = require('node:child_process');
const http = require('node:http');

const TIMEOUT_MS = 5 * 60 * 1000;
const POLL_INTERVAL_MS = 1000;
const REQUEST_TIMEOUT_MS = 2000;

const separator = process.argv.indexOf('--');

if (separator === -1 || separator === process.argv.length - 1) {
    console.error(
        'usage: wait-for-storybook-refs.js <url>... -- <command> [args]'
    );
    process.exit(2);
}

const urls = process.argv.slice(2, separator);
const [command, ...args] = process.argv.slice(separator + 1);

const isUp = (url) =>
    new Promise((resolve) => {
        const request = http.get(url, (response) => {
            response.resume();
            resolve(response.statusCode === 200);
        });

        request.setTimeout(REQUEST_TIMEOUT_MS, () => request.destroy());
        request.on('error', () => resolve(false));
    });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForAll = async () => {
    const deadline = Date.now() + TIMEOUT_MS;
    const pending = new Set(urls);

    while (pending.size > 0) {
        const settled = await Promise.all(
            [...pending].map(async (url) => [url, await isUp(url)])
        );

        settled
            .filter(([, up]) => up)
            .forEach(([url]) => {
                pending.delete(url);
                console.log(`[refs] ${url} is up`);
            });

        if (pending.size === 0) {
            break;
        }

        if (Date.now() > deadline) {
            // Start anyway rather than leave the developer with nothing: the
            // shell still works on its own, the missing refs just will not load.
            console.warn(
                `[refs] gave up waiting for ${[...pending].join(', ')} after ` +
                    `${TIMEOUT_MS / 1000}s -- starting anyway, those refs will ` +
                    `not load`
            );
            break;
        }

        await wait(POLL_INTERVAL_MS);
    }
};

waitForAll().then(() => {
    const child = spawn(command, args, { stdio: 'inherit', shell: true });

    child.on('exit', (code, signal) =>
        signal ? process.kill(process.pid, signal) : process.exit(code ?? 0)
    );
});
