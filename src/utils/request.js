/**
 * Global fetch wrapper that adds some basic error handling and default configurations
 */
export default function request(url, config) {
    // Load default fetch configuration
    config = Object.assign({
        credentials: 'include'
    }, config);

    return window
        .fetch(url, config)
        .then((res) => {
            // If status is not a 2xx, assume it's an error
            if (!(res.status >= 200 && res.status <= 300)) {
                throw res;
            }
            return res;
        })
        .catch((err) => {
            // FIXME: add sentry logging
            console.logSentry(`Request (${config.method || 'get'}) to ${url} failed with ` +
                              ((err instanceof Error) ? `error: ${err}`
                                                      : `status: ${err.status} (${err.statusText})`));

            // Rethrow to caller's error handler
            throw err;
        });
}
