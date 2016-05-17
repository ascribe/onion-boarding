import React from 'react';

import uploaderSpecExtender from 'ascribe-react-components/modules/uploader/utils/uploader_spec_extender';
import { safeInvoke } from 'ascribe-react-components/modules/utils/general';
import { getCsrfToken, makeCsrfHeader } from '../../utils/csrf';
import request from '../../utils/request';


const { func, object, shape, string } = React.PropTypes;

// FIXME: eventually this should be in a private components library...
const AscribeRequestKeyUploader = (Uploader) => (
    React.createClass(uploaderSpecExtender({
        displayName: 'AscribeRequestKeyUploader',

        propTypes: {
            requestKeyParams: shape({
                body: object,
                headers: object,
                url: string.isRequired
            }).isRequired,

            onRequestKeyError: func,
            onRequestKeySuccess: func,

            // FineUploader option that contains the key as a string or function.
            // If the key is already set, don't override it, but if not, provide one that will call
            // `requestKeyParams.url` to get the key.
            objectProperties: object // eslint-disable-line react/sort-prop-types

            // All other props are passed unmodified to backing Uploader
        },

        requestKey(fileId) {
            const { onRequestKeyError, onRequestKeySuccess, requestKeyParams } = this.props;
            const file = this.refs.uploader.getFiles()[fileId];

            return request(requestKeyParams.url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...makeCsrfHeader(getCsrfToken()),
                    ...requestKeyParams.headers
                },
                body: JSON.stringify({
                    filename: file.name,
                    uuid: file.uuid,
                    ...requestKeyParams.body
                })
            })
            .then((res) => res.json())
            .then((resJson) => {
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
            const { objectProperties } = this.props;
            const {
                onRequestKeyError: ignoredOnRequestKeyError, // ignore
                onRequestKeySuccess: ignoredOnRequestKeySuccess, // ignore
                requestKeyParams: ignoredRequestKeyParams, // ignore
                ...uploaderProps
            } = this.props;

            let uploaderPropsWithObjectKey = uploaderProps;
            if (!objectProperties || !objectProperties.hasOwnProperty('key')) {
                uploaderPropsWithObjectKey = Object.assign({}, uploaderProps, {
                    objectProperties: {
                        ...objectProperties,
                        key: this.requestKey
                    }
                });
            }

            return (<Uploader ref="uploader" {...uploaderPropsWithObjectKey} />);
        }
    }))
);

export default AscribeRequestKeyUploader;
