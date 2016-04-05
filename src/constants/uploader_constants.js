const FileCategory = {
    DIGITAL_WORK: 'digitalwork',
    OTHER_DATA: 'otherdata',
    THUMBNAIL: 'thumbnail'
};

const UploaderConstants = {
    ACCESS_KEY: process.env.S3_ACCESS_KEY,
    BUCKET: 'ascribe0',
    FILE_CATEGORY: FileCategory,
    //CDN_UPLOAD_ENDPOINT: 'https://www.ascribe.io.global.prod.fastly.net',
    UPLOAD_ENDPOINT: 'https://ascribe0.s3.amazonaws.com'
};

export default UploaderConstants;
