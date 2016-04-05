import React from 'react';

import uploaderSpecExtender from 'ascribe-react-components/modules/uploader/utils/uploader_spec_extender';
import { safeInvoke } from 'ascribe-react-components/modules/utils/general';
import { getCsrfToken, makeCsrfHeader } from '../utils/csrf';


const { func, object, shape, string } = React.PropTypes;

//FIXME: eventually this should be in a private components library...
const AscribeRequestKeyUploader = (Uploader) => {
    return React.createClass(uploaderSpecExtender({
        displayName: 'AscribeRequestKeyUploader',

        propTypes: {
            requestKeyParams: shape({
                body: object,
                headers: object,
                url: string.isRequired
            }).isRequired,

            onRequestKeyError: func,
            onRequestKeySuccess: func,

            request: object // FineUploader option that may be modified with a key param

            // All other props are passed unmodified to backing Uploader
        },

        requestKey(fileId) {
            const { onRequestKeyError, onRequestKeySuccess, requestKeyParams } = this.props;

            const filename = this.refs.uploader.getUploader().getName(fileId);
            const uuid = this.refs.uploader.getUploader().getUuid(fileId);

            return window.fetch(requestKeyParams.url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...makeCsrfHeader(getCsrfToken()),
                    ...requestKeyParams.headers
                },
                credentials: 'include',
                body: JSON.stringify({
                    'filename': filename,
                    'uuid': uuid,
                    ...requestKeyParams.body
                })
            })
            .then((res) => {
                const resJson = res.json();

                safeInvoke(onRequestKeySuccess, resJson);

                return resJson.key;
            })
            .catch((err) => {
                safeInvoke(onRequestKeyError, err);

                // Rethrow the error to tell FineUploader the key request failed
                throw err;
            });
        },

        render() {
            const { request } = this.props;
            const {
                onRequestKeyError, // ignore
                onRequestKeySuccess, // ignore
                requestKeyParams, // ignore
                ...uploaderProps
            } = this.props;

            if (!request || !request.hasOwnProperty('key')) {
                uploaderProps = Object.assign({}, uploaderProps, {
                    request: {
                        ...request,
                        key: this.requestKey
                    }
                });
            }

            return (<Uploader ref="uploader" {...uploaderProps} />);
        }
    }));
};

export default AscribeRequestKeyUploader;
