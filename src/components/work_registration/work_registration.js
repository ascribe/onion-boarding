import React from 'react';

import { uploadingFilesFilter, uploadedFilesFilter, validFilesFilter } from 'ascribe-react-components/modules/uploader/utils/file_filters'

import WorkRegistrationFormContainer from './work_registration_form_container';

import UploadStampContainer from '../uploader/ui/upload_stamp_container';

import { safeInvoke } from 'ascribe-react-components/modules/utils/general';
import { getLangText } from '../../utils/lang';
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
    },

    handleReset() {
        const { onReset, uploaderFiles } = this.props;
        const { handleCancelFile, handleDeleteFile } = this.context;

        uploaderFiles.filter(uploadingFilesFilter).forEach(handleCancelFile);
        uploaderFiles.filter(uploadedFilesFilter).forEach(handleDeleteFile);

        // Don't need to reset the form since it should get reset by react when it's rerendered.

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
