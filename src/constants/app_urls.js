import { APP_BASE_PATH, SERVER_URL } from './app_constants';

// App urls
export const APP_LOGIN = `${APP_BASE_PATH}login`;
export const APP_SIGNUP = `${APP_BASE_PATH}signup`;

// S3 urls
export const S3_DELETE = `${SERVER_URL}/s3/delete/`;
export const S3_KEY = `${SERVER_URL}/s3/key/`;
export const S3_SIGNATURE = `${SERVER_URL}/s3/signature/`;

export default {
    APP_LOGIN,
    APP_SIGNUP,
    S3_DELETE,
    S3_KEY,
    S3_SIGNATURE
};
