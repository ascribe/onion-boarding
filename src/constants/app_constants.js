export const APP_VERSION = process.env.APP_VERSION;
export const ONION_BASE_PATH = process.env.ONION_BASE_PATH;

// Raven config
export const Raven = {
    // Add error messages to this list to have Sentry ignore them
    IGNORED_ERRORS: [],
    URL: process.env.RAVEN_DSN_URL
};

export default {
    APP_VERSION,
    ONION_BASE_PATH,

    Raven
};
