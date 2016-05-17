import React from 'react';
import CssModules from 'react-css-modules';

import Form from 'ascribe-react-components/modules/form/form';
import InputCheckbox from 'ascribe-react-components/modules/form/inputs/input_checkbox';

import FileStatus from 'ascribe-react-components/modules/uploader/constants/file_status';

import Spinner from '../spinner';

import FormSubmitButton from '../form/form_submit_button';
import PropertySubtextFooter from '../form/property_subtext_footer';
import SimpleProperty from '../form/simple_property';

import UploadFileStatus from '../uploader/ui/upload_file_status';

import AppUrls from '../../constants/app_urls';

import { getLangText } from '../../utils/lang';

import styles from './work_registration_form.scss';


const { func, object } = React.PropTypes;

const WorkRegistrationErrorMessage = CssModules(({ errors, isCreator }) => {
    let errorMessage = null;

    if (!isCreator) {
        errorMessage = [
            getLangText("If you don't have any creations to register at the moment, " +
                        'you can still '),
            (<a key="signup-link" href={AppUrls.APP_SIGNUP}>
                {getLangText('sign up')}
            </a>),
            getLangText(' now for an account.')
        ];
    } else if (errors && Object.keys(errors).length) {
        errorMessage = getLangText('Please fill in all fields to register your Artwork');
    }

    // If there's no error message to display, still render the element as a height placeholder
    return (
        <p styleName="error-message">
            <span styleName="error-message-centered">
                {errorMessage}
            </span>
        </p>
    );
}, styles);

WorkRegistrationErrorMessage.displayName = 'WorkRegistrationErrorMessage';


const WorkRegistrationForm = React.createClass({
    propTypes: {
        onSubmit: func.isRequired,

        selectedFile: object
    },

    getInitialState() {
        return ({
            errors: null,
            isCreator: true
        });
    },

    onCreatorCheckboxChange(value) {
        this.setState({
            isCreator: value
        });
    },

    onSubmit(formData) {
        this.setState({ errors: null });

        return this.props.onSubmit(formData);
    },

    onValidationError(errors) {
        this.setState({ errors });
    },

    render() {
        const { selectedFile } = this.props;
        const { errors, isCreator } = this.state;

        return (
            <Form
                buttonDefault={(
                    <FormSubmitButton
                        disabled={!isCreator || selectedFile.status !== FileStatus.UPLOADED}>
                        {getLangText('Generate Certificate')}
                    </FormSubmitButton>
                )}
                buttonEdited={null}
                buttonSubmitting={(
                    <FormSubmitButton disabled>
                        {getLangText('Generating Certificate')} <Spinner className={styles['submit-spinner']} />
                    </FormSubmitButton>
                )}
                customPropertyTypes={[SimpleProperty]}
                disabled={!isCreator}
                onSubmit={this.onSubmit}
                onValidationError={this.onValidationError}
                styleName="form">
                <UploadFileStatus file={selectedFile} />
                <hr styleName="property-divider" />
                <SimpleProperty
                    overrideFormDefaults
                    footer={getLangText('SAMPLE TEXT: When you are registering as the owner you ' +
                                        'create a permanent record of your work on the blockchain.')}
                    footerType={PropertySubtextFooter}
                    name="is_creator"
                    onChange={this.onCreatorCheckboxChange}>
                    <InputCheckbox
                        defaultChecked
                        required
                        label={getLangText('Yes, I am the creator of this file')}
                        styleName="checkbox-input" />
                </SimpleProperty>
                <SimpleProperty name="title">
                    <input
                        required
                        placeholder={getLangText('Title of work')}
                        type="text" />
                </SimpleProperty>
                <SimpleProperty name="artist_name">
                    <input
                        required
                        placeholder={getLangText("Creator's Name")}
                        type="text" />
                </SimpleProperty>
                <SimpleProperty name="date_created">
                    <input
                        required
                        min={1900}
                        placeholder={getLangText('Year created')}
                        type="number" />
                </SimpleProperty>
                <WorkRegistrationErrorMessage errors={errors} isCreator={isCreator} />
            </Form>
        );
    }
});

export default CssModules(WorkRegistrationForm, styles);
