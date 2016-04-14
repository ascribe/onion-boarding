import React from 'react';
import CssModules from 'react-css-modules';

import UploadDragAndDropArea from 'ascribe-react-components/modules/uploader/upload_drag_and_drop_area';

import AscribeUploader from './uploader/ascribe_uploader';

import WorkRegistration from './work_registration/work_registration';

import AppUrls from '../constants/app_urls';
import UploaderConstants from '../constants/uploader_constants';

import { getCsrfToken, makeCsrfHeader } from '../utils/csrf';

import styles from './work_registration_container.scss';


const { bool, func } = React.PropTypes;

const WorkRegistrationContainer = React.createClass({
    propTypes: {
        hasFile: bool,
        onReset: func,
        onSelectFile: func,
        onUploadError: func
    },

    getInitialState() {
        return {
            failedDeleteFiles: {}
        }
    },

    onDeleteComplete(file, xhr, isError) {
        if (isError) {
            // If any of the files failed to delete upon resetting, just nuke the uploader to
            // reset our state completely
            this.refs.uploader.reset();
        }
    },

    onUploaderValidationError(errors) {
    },

    render() {
        const { onReset, hasFile, onSelectFile, onUploadError } = this.props;

        return (
            <div styleName="layout-container">
                <div styleName="drag-and-drop-container">
                    <UploadDragAndDropArea
                        ref="uploader"
                        disabled={hasFile}
                        styleName="main-interaction-area"
                        uploaderProps={{
                            multiple: false,
                            onDeleteComplete: this.onDeleteComplete,
                            onError: onUploadError,
                            onSubmitted: onSelectFile,
                            onValidationError: this.onUploaderValidationError,
                            requestKeyParams: {
                                body: {
                                    category: UploaderConstants.FILE_CATEGORY.DIGITAL_WORK
                                },
                                url: AppUrls.S3_KEY
                            },
                            signature: {
                                customHeaders: makeCsrfHeader(getCsrfToken()),
                                endpoint: AppUrls.S3_SIGNATURE
                            }
                        }}
                        uploaderType={AscribeUploader}>
                        <WorkRegistration onReset={onReset} />
                    </UploadDragAndDropArea>
                </div>
            </div>
        );
    }
});

export default CssModules(WorkRegistrationContainer, styles);
