import React from 'react';

import { uploadingFilesFilter, uploadedFilesFilter, validFilesFilter } from 'ascribe-react-components/modules/uploader/utils/file_filters';
import { safeInvoke } from 'js-utility-belt/es6';

import WorkRegistrationFormContainer from './work_registration_form_container';

import UploadStampContainer from '../uploader/ui/upload_stamp_container';

import { isMobileResolution } from '../../utils/responsive';


const { arrayOf, bool, func, object } = React.PropTypes;

const WorkRegistration = React.createClass({
    propTypes: {
        onReset: func,
        uploaderFiles: arrayOf(object),
        uploadInProgress: bool
    },

    contextTypes: {
        handleCancelFile: func.isRequired,
        handleDeleteFile: func.isRequired
    },

    getSelectedFile() {
        const validFiles = this.props.uploaderFiles.filter(this.selectedFileFilter);

        if (validFiles.length > 1) {
            console.logSentry('More than one valid file was available in the uploader, selecting ' +
                              'only the first one');
        }

        return validFiles[0];
    },

    handleFormSubmit(formData) {
        // TODO: go to onion by passing file key, name, etc. as url params.
        // Since we're in an iframe, make sure to use target="_top" or window.top.location.href
        // to navigate the top window and not just this iframe.
    },

    handleReset() {
        const { onReset, uploaderFiles } = this.props;
        const { handleCancelFile, handleDeleteFile } = this.context;

        // Reset the uploader here, and let WorkRegistrationFormContainer handle reseting the form
        // if it needs to
        uploaderFiles.filter(uploadingFilesFilter).forEach(handleCancelFile);
        uploaderFiles.filter(uploadedFilesFilter).forEach(handleDeleteFile);

        safeInvoke(onReset);
    },

    selectedFileFilter(file) {
        return validFilesFilter(file) && file.progress > 0;
    },

    renderRegistrationForm(selectedFile) {
        return (
            <WorkRegistrationFormContainer
                onFormSubmit={this.handleFormSubmit}
                onReset={this.handleReset}
                selectedFile={selectedFile} />
        );
    },

    renderUploaderInput(selectedFile) {
        return (<UploadStampContainer selectedFile={selectedFile} />);
    },

    render() {
        const selectedFile = this.getSelectedFile();

        if (selectedFile && !(this.props.uploadInProgress && isMobileResolution())) {
            return this.renderRegistrationForm(selectedFile);
        } else {
            return this.renderUploaderInput(selectedFile);
        }
    }
});

export default WorkRegistration;
