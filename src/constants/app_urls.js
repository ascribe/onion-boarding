import { SERVER_URL } from './app_constants';

// S3 urls
export const S3_DELETE = `${SERVER_URL}/s3/delete/`;
export const S3_KEY = `${SERVER_URL}/s3/key/`;
export const S3_SIGNATURE = `${SERVER_URL}/s3/signature/`;

export default {
    S3_DELETE,
    S3_KEY,
    S3_SIGNATURE
};
