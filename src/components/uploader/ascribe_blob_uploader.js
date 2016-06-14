import React from 'react';

import CreateBlobUploader from 'ascribe-react-components/modules/uploader/extended_uploaders/create_blob_uploader';

import uploaderSpecExtender from 'ascribe-react-components/modules/uploader/utils/uploader_spec_extender';
import { getCsrfToken, makeCsrfHeader } from '../../utils/csrf';
import request from '../../utils/request';


const { func, object, shape, string } = React.PropTypes;

// FIXME: eventually this should be in a private components library...
const AscribeBlobUploader = (Uploader) => {
    const BlobUploader = CreateBlobUploader(Uploader);

    return React.createClass(uploaderSpecExtender({
        displayName: 'AscribeBlobUploader',

        propTypes: {
            createBlobParams: shape({
                body: object,
                headers: object,
                url: string.isRequired
            }),
            onCreateBlobError: func,
            onCreateBlobSuccess: func

            // All other props are passed unmodified to backing Uploader
        },

        handleBlobCreation(file) {
            const { createBlobParams, onCreateBlobError, onCreateBlobSuccess } = this.props;

            // If createBlobParams is not defined, progress right away without posting to S3 to let
            // this be done later by another component
            if (!createBlobParams) {
                if (process.env.NODE_ENV !== 'production') {
                    // Still we warn the user of this component during development
                    // eslint-disable-next-line no-console
                    console.warn('createBlobParams was not defined for AscribeBlobUploader. ' +
                                 'Continuing without creating the blob on the server.');
                }
                return Promise.resolve();
            }

            return request(createBlobParams.url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...makeCsrfHeader(getCsrfToken()),
                    ...createBlobParams.headers
                },
                body: JSON.stringify({
                    'filename': file.name,
                    'key': file.key,
                    ...createBlobParams.body
                })
            })
            .then((res) => res.json())
            .then(onCreateBlobSuccess)
            .catch(onCreateBlobError);
        },

        render() {
            const {
                createBlobParams: ignoredCreateBlobParams, // ignore
                onCreateBlobError: ignoredOnCreateBlobError, // ignore
                onCreateBlobSuccess: ignoredOnCreateBlobSuccess, // ignore
                ...uploaderProps
            } = this.props;

            return (
                <BlobUploader
                    ref="uploader"
                    {...uploaderProps}
                    handleBlobCreation={this.handleBlobCreation} />
            );
        }
    }));
};

export default AscribeBlobUploader;
