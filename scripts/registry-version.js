/**
 * Asks the npm registry for a version, and waits out its read lag.
 *
 * For a few minutes after a publish, `npm view` can still answer E404 for the
 * version that just shipped. Taken at its word, that answer makes the smoke
 * workflow read npm's error object as the version, and makes the Release
 * run's "already published?" check miss a version that shipped, publish it
 * again and get a 409.
 *
 * Only a value shaped like a version counts as an answer. Anything else --
 * an error, an empty reply, a JSON object -- is retried until the attempts run
 * out, and then reported as "not on the registry" (null).
 *
 * As a command: `node scripts/registry-version.js <name@spec> [attempts]
 * [delayMs]` prints the resolved version, or nothing, and always exits 0.
 */
const { spawnSync } = require('child_process');

const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const sleep = (ms) =>
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/** The version `npm view <spec> version --json` names, or null. */
const viewOnce = (spec) => {
    const result = spawnSync('npm', ['view', spec, 'version', '--json'], {
        encoding: 'utf8',
    });

    if (result.status !== 0) {
        return null;
    }

    try {
        const parsed = JSON.parse(result.stdout);
        // A range or dist-tag can match several versions; the newest is last.
        const version = Array.isArray(parsed) ? parsed.at(-1) : parsed;

        return typeof version === 'string' && VERSION.test(version)
            ? version
            : null;
    } catch {
        return null;
    }
};

const registryVersion = (spec, { attempts = 1, delayMs = 30000 } = {}) => {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        const version = viewOnce(spec);

        if (version) {
            return version;
        }
        if (attempt < attempts) {
            console.error(
                `${spec} is not on the registry yet (attempt ${attempt} of ${attempts}); retrying in ${delayMs / 1000}s`
            );
            sleep(delayMs);
        }
    }

    return null;
};

module.exports = { registryVersion, VERSION };

if (require.main === module) {
    const [spec, attempts, delayMs] = process.argv.slice(2);
    const version = registryVersion(spec, {
        attempts: Number(attempts) || 1,
        delayMs: Number(delayMs) || 30000,
    });

    if (version) {
        console.log(version);
    }
}
