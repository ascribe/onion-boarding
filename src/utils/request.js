const DEFAULT_REQUEST_CONFIG = {
    credentials: 'include'
};

/**
 * Global fetch wrapper that adds some basic error handling and default configurations
 */
export default function request(url, config) {
    // Load default fetch configuration
    const requestConfig = {
        ...DEFAULT_REQUEST_CONFIG,
        ...config
    };

    return window
        .fetch(url, requestConfig)
        .then((res) => {
            // If status is not a 2xx, assume it's an error
            if (!(res.status >= 200 && res.status <= 300)) {
                throw res;
            }
            return res;
        })
        .catch((err) => {
            // eslint-disable-next-line prefer-template
            console.logSentry(`Request (${requestConfig.method || 'get'}) to ${url} failed with ` +
                              ((err instanceof Error) ? `error: ${err}`
                                                      : `status: ${err.status} (${err.statusText})`));

            // Rethrow to caller's error handler
            throw err;
        });
}
