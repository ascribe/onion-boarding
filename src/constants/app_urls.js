import { ONION_BASE_PATH } from './app_constants';


// Base urls from env
export const BASE_API = process.env.API_URL;
export const BASE_SERVER = process.env.SERVER_URL;

// App urls
export const APP_LOGIN = `${ONION_BASE_PATH}/login`;
export const APP_SIGNUP = `${ONION_BASE_PATH}/signup`;

// S3 urls
export const S3_DELETE = `${BASE_SERVER}/s3/delete/`;
export const S3_KEY = `${BASE_SERVER}/s3/key/`;
export const S3_SIGNATURE = `${BASE_SERVER}/s3/signature/`;

export default {
    BASE_API,
    BASE_SERVER,

    APP_LOGIN,
    APP_SIGNUP,

    S3_DELETE,
    S3_KEY,
    S3_SIGNATURE
};
