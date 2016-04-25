import React from 'react';

import CustomHeaderOnChangeUploader from 'ascribe-react-components/modules/uploader/extended_uploaders/custom_header_on_change_uploader';
import CustomValidationUploader from 'ascribe-react-components/modules/uploader/extended_uploaders/custom_validation_uploader';
import ReactS3FineUploader from 'ascribe-react-components/modules/uploader/react_s3_fine_uploader';

import AscribeBlobUploader from './ascribe_blob_uploader';
import AscribeRequestKeyUploader from './ascribe_request_key_uploader';

import UploaderSupportedFeatures from 'ascribe-react-components/modules/uploader/constants/supported_features';
import AppUrls from '../../constants/app_urls';
import CsrfConstants from '../../constants/csrf_constants';
import UploaderConstants from '../../constants/uploader_constants';

import uploaderSpecExtender from 'ascribe-react-components/modules/uploader/utils/uploader_spec_extender';
import { getCsrfToken, makeCsrfHeader } from '../../utils/csrf';


const { func, object } = React.PropTypes;

// Create the uploader by adding blob, request key, custom header, and validation functionality to
// ReactS3FineUploader
const UploaderEnhancements = [
    CustomValidationUploader,
    CustomHeaderOnChangeUploader,
    AscribeBlobUploader,
    AscribeRequestKeyUploader
];
const Uploader = UploaderEnhancements.reduce((Uploader, Enhancer) => Enhancer(Uploader), ReactS3FineUploader);

//FIXME: eventually this should be in a private components library...
const AscribeUploader = React.createClass(uploaderSpecExtender({
    displayName: 'AscribeUploader',

    propTypes: {
        // AscribeBlobUploader props
        createBlobParams: object,
        onCreateBlobError: func,
        onCreateBlobSuccess: func,

        // AscribeRequestKeyUploader props
        requestKeyParams: object.isRequired,
        onRequestKeyError: func,
        onRequestKeySuccess: func,

        // CustomHeaderOnChangeUploader props
        shouldCustomHeaderChange: func

        // All other props are passed through to ReactS3FineUploader
    },

    getDefaultProps() {
        const csrfHeader = makeCsrfHeader(getCsrfToken());

        return {
            shouldCustomHeaderChange: this.shouldCustomHeaderChange,

            // FineUploader options
            autoUpload: true,
            chunking: {
                enabled: true,
                concurrent: {
                    enabled: true
                }
            },
            cors: {
                expected: true,
                sendCredentials: true
            },
            deleteFile: {
                enabled: true,
                method: 'DELETE',
                endpoint: AppUrls.S3_DELETE,
                customHeaders: csrfHeader
            },
            formatFileName: (name) => {
                return (name && name.length > 30) ? `${name.slice(0, 15)}...${name.slice(-15)}`
                                                  : name;
            },
            messages: {},
            objectProperties: {
                acl: 'public-read',
                bucket: UploaderConstants.BUCKET
            },
            request: {
                accessKey: UploaderConstants.ACCESS_KEY,
                //endpoint: UploaderConstants.CDN_UPLOAD_ENDPOINT
                endpoint: UploaderConstants.UPLOAD_ENDPOINT
            },
            resume: {
                enabled: true
            },
            retry: {
                enableAuto: false
            },
            session: {
                endpoint: null
            },
            uploadSuccess: {
                params: {
                    isBrowserPreviewCapable: UploaderSupportedFeatures.imagePreviews
                }
            }
        };
    },

    shouldCustomHeaderChange(currentHeaders) {
        const currentCsrfToken = getCsrfToken();
        const newHeaders = {};

        ['delete', 'request'].forEach((headerKey) => {
            const { [headerKey]: currentHeader } = currentHeaders;

            if (!currentHeader ||
                currentHeader[CsrfConstants.CSRF_CUSTOM_HEADER_NAME] !== currentCsrfToken) {
                newHeaders[headerKey] = {
                    ...currentHeader,
                    ...makeCsrfHeader(currentCsrfToken)
                };
            }
        });

        return newHeaders;
    },

    render() {
        return (<Uploader {...this.props} />);
    }
}));

export default AscribeUploader;
