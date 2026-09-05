/**
 * Webpack 4 hashes module identifiers with md4. OpenSSL 3 (Node 17+) removed
 * md4 from the default provider, so every build dies with
 * ERR_OSSL_EVP_UNSUPPORTED. Setting `output.hashFunction` is not enough —
 * webpack 4 reaches for md4 through `util/createHash` in several internal
 * paths that ignore that option.
 *
 * Requiring this file before webpack loads swaps md4 for sha256. It only
 * affects build-time hashing of module ids; nothing here reaches the
 * published bundles.
 *
 * Delete this file, and the `require` at the top of each webpack.config.js,
 * once the packages move to Vite.
 */
const crypto = require('crypto');

const originalCreateHash = crypto.createHash;

crypto.createHash = function createHash(algorithm, options) {
    return originalCreateHash(
        algorithm === 'md4' ? 'sha256' : algorithm,
        options
    );
};
