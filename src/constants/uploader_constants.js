export const ACCESS_KEY = process.env.S3_ACCESS_KEY;
export const BUCKET = 'ascribe0';
export const CDN_UPLOAD_ENDPOINT = 'https://www.ascribe.io.global.prod.fastly.net';
export const UPLOAD_ENDPOINT = 'https://ascribe0.s3.amazonaws.com';

export const FileCategory = {
    DIGITAL_WORK: 'digitalwork',
    OTHER_DATA: 'otherdata',
    THUMBNAIL: 'thumbnail'
};

export default {
    ACCESS_KEY,
    BUCKET,
    FILE_CATEGORY: FileCategory,
    CDN_UPLOAD_ENDPOINT,
    UPLOAD_ENDPOINT
};
