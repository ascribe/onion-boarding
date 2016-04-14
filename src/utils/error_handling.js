import Raven from 'raven-js';

import AppConstants from '../constants/app_constants';


/**
 * Logs an error in to the console but also sends it to Sentry.
 * Optionally, a comment can be defined.
 *
 * @param {object}  raven        Raven instance (usually already bound to if used with `initLogging`)
 * @param {Error}   error        A Javascript error
 * @param {boolean} ignoreSentry Defines whether or not the error should be submitted to Sentry
 * @param {string}  comment      Will also be submitted to Sentry, but will not be logged
 */
function logSentry(raven, error, comment, ignoreSentry) {
    console.error(error);

    if (!ignoreSentry) {
        raven.captureException(error, comment ? { extra: { comment } } : undefined);
    }
}

/**
 * Initializes the given Raven instance with the url and configuration and registers the error
 * handler globally via `console.logSentry`.
 *
 * @param {object} raven  Raven instance
 * @param {string} url    Sentry DSN url to register Raven to
 * @param {object} config Raven config (see https://docs.getsentry.com/hosted/clients/javascript/config/#optional-settings)
 */
function initLogging(raven, url, config) {
    // Initialize Raven for logging on Sentry
    raven.config(url, config).install();

    // Register our `logSentry` error handler globally with the given raven instance
    console.logSentry = logSentry.bind(null, raven);

    // And just in case, catch any errors that propagate to window
    window.onerror = (message, source, lineno, colno, error) => {
        console.logSentry(error, {
            colno,
            lineno,
            message,
            source
        });
    };
}

initLogging(Raven, AppConstants.Raven.URL, {
    release: AppConstants.APP_VERSION,
    ignoreErrors: AppConstants.Raven.IGNORED_ERRORS
});
