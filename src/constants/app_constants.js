export const APP_BASE_PATH = process.env.APP_BASE_PATH;
export const APP_VERSION = process.env.APP_VERSION;

// Raven config
export const Raven = {
    // Add error messages to this list to have Sentry ignore them
    IGNORED_ERRORS: [],
    URL: process.env.RAVEN_DSN_URL
};

export default {
    APP_BASE_PATH,
    APP_VERSION,

    Raven
};
