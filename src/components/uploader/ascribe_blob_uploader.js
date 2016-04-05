import React from 'react';

import { CreateBlobUploader, uploaderSpecExtender } from 'ascribe-react-components/modules/uploader';

import AppConstants from '../../constants/app_constants';

import { getCsrfToken, makeCsrfHeader } from '../utils/csrf';


const { func, object, string } = React.PropTypes;

//FIXME: eventually this should be in a private components library...
const AscribeBlobUploader = (Uploader) => {
    const BlobUploader = CreateBlobUploader(Uploader);

    return React.createClass(uploaderSpecExtender({
        displayName: 'AscribeBlobUploader',

        propTypes: {
            createBlobParams: {
                body: object,
                headers: object,
                url: string.isRequired
            },
            onCreateBlobError: func,
            onCreateBlobSuccess: func

            // All other props are passed unmodified to backing Uploader
        },

        handleBlobCreation(file) {
            const { createBlobParams, onCreateBlobError, onCreateBlobSuccess } = this.props;

            // If createBlobParams is not defined, progress right away without posting to S3 to let
            // this be done later by another component
            if (!createBlobParams) {
                // Still we warn the user of this component
                console.warn('createBlobParams was not defined for AscribeBlobUploader. ' +
                             'Continuing without creating the blob on the server.');
                return Promise.resolve();
            }

            return window.fetch(createBlobParams.url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...makeCsrfHeader(getCsrfToken()),
                    ...createBlobParams.headers
                },
                credentials: 'include',
                body: JSON.stringify({
                    'filename': file.name,
                    'key': file.key,
                    ...createBlobParams.body
                })
            })
            .then((res) => onCreateBlobSuccess(res.json()))
            .catch(onCreateBlobError);
        },

        render() {
            const {
                createBlobParams, // ignore
                onCreateBlobError, // ignore
                onCreateBlobSuccess, // ignore
                ...uploaderProps
            } = this.props;

            return (
                <BlobUploader
                    {...uploaderProps}
                    handleBlobCreation={this.handleBlobCreation} />
            );
        }
    }));
};

export default AscribeBlobUploader;
