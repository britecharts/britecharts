import { exec as processExec } from 'child-process-promise';
import 'colors';

const executionOptions = {
    dryRun: false,
    verbose: false,
};

const logWithPrefix = function (prefix, message) {
    console.log(
        message
            .toString()
            .trim()
            .split('\n')
            .map((line) => `${prefix.grey} ${line}`)
            .join('\n')
    );
};

export const exec = function (command, options = {}) {
    const proc = processExec(command, options);

    if (!executionOptions.verbose) {
        return proc;
    }
    const title = options.title || command;
    const output = (data, type) => logWithPrefix(`[${title}] ${type}:`, data);

    return proc
        .progress(({ stdout, stderr }) => {
            stdout.on('data', (data) => output(data, 'stdout'));
            stderr.on('data', (data) => output(data, 'stderr'));
        })
        .then((result) => {
            logWithPrefix(`[${title}]`, 'Complete'.cyan);
            return result;
        });
};

export const safeExec = function (command, options = {}) {
    const title = options.title || command;

    if (executionOptions.dryRun) {
        logWithPrefix(`[${title}]`.grey, 'DRY RUN'.magenta);
        return Promise.resolve();
    }

    return exec(command, options);
};

export const setExecOptions = function (options) {
    Object.assign(executionOptions, options);
};
