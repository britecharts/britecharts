/**
 * Credential-safe CORS for a composed Storybook's referenced servers.
 *
 * The composing Storybook (packages/demos, port 2000) fetches each ref's
 * index.json from the browser. It sends that request with
 * `credentials: 'include'` whenever the ref is not marked `server-checked` --
 * which happens whenever the shell's own dev server could not reach the ref at
 * startup, so the shell fell back to letting the browser do the checking.
 *
 * Storybook's dev server answers with `Access-Control-Allow-Origin: *`, and the
 * CORS spec forbids the wildcard on a credentialed request: the server has to
 * name the origin and opt in with `Access-Control-Allow-Credentials`. So the
 * fetch is blocked and the sidebar shows "Oh no! Something went wrong loading
 * this Storybook" for that ref.
 *
 * Storybook loads `<configDir>/middleware.js` after its own CORS middleware, so
 * naming the origin here overrides the wildcard. Only loopback origins are
 * echoed -- a dev server that reflected any origin *and* allowed credentials
 * would let any page you visit read your local Storybook.
 *
 * This is the safety net, not the fix. The fix is starting the shell after its
 * refs (see scripts/wait-for-storybook-refs.js), which makes them
 * `server-checked` and drops credentials from the request entirely.
 */
const LOOPBACK_ORIGIN = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/;

// The response Storybook hands the middleware is a plain Node ServerResponse,
// not an Express one, so there is no res.vary() to append with.
const varyOnOrigin = (res) => {
    const current = res.getHeader('Vary');

    if (!current) {
        res.setHeader('Vary', 'Origin');
        return;
    }

    const fields = String(current)
        .split(',')
        .map((field) => field.trim());

    if (!fields.includes('*') && !fields.includes('Origin')) {
        res.setHeader('Vary', [...fields, 'Origin'].join(', '));
    }
};

module.exports = function allowCredentialedLoopbackCors(router) {
    router.use((req, res, next) => {
        const { origin } = req.headers;

        if (origin && LOOPBACK_ORIGIN.test(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            varyOnOrigin(res);
        }

        next();
    });
};
