import { request as baseRequest } from 'js-utility-belt/es6';


const DEFAULT_REQUEST_CONFIG = {
    credentials: 'include'
};

/**
 * Small wrapper around js-utility-belt's request that provides default settings and response
 * handling.
 */
export default function request(url, config) {
    // Load default fetch configuration
    const requestConfig = {
        ...DEFAULT_REQUEST_CONFIG,
        ...config
    };

    return baseRequest(url, requestConfig)
        .catch((err) => {
            const method = requestConfig.method || 'GET';
            const errorMsg = err instanceof Response ? `status: ${err.status} (${err.statusText})`
                                                     : `error: ${err}`;

            console.logSentry(`Request (${method}) to ${url} failed with ${errorMsg}`);

            // Rethrow to caller's error handler
            throw err;
        });
}
