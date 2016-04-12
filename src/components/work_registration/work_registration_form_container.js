import React from 'react';
import CssModules from 'react-css-modules';

import WorkRegistrationForm from './work_registration_form';
import WorkRegistrationHeader from './work_registration_header';

import { getLangText } from '../../utils/lang';

import styles from './work_registration_form_container.scss';


const WorkRegistrationBackButton = CssModules((props) => (
    <button {...props} styleName="back-button" />
), styles);

const WorkRegistrationFormBackground = CssModules(({ children }) => (
    <div styleName="background">{children}</div>
), styles);

WorkRegistrationBackButton.displayName = 'WorkRegistrationBackButton';
WorkRegistrationFormBackground.displayName = 'WorkRegistrationFormBackground';


const WorkRegistrationFormContainer = ({ onFormSubmit, onReset, selectedFile }) => (
    <WorkRegistrationFormBackground>
        <WorkRegistrationBackButton onClick={onReset}>
            {getLangText('Start over')}
        </WorkRegistrationBackButton>
        <WorkRegistrationHeader />
        <WorkRegistrationForm
            onSubmit={onFormSubmit}
            selectedFile={selectedFile} />
    </WorkRegistrationFormBackground>
);

WorkRegistrationFormContainer.displayName = 'WorkRegistrationFormContainer';

export default WorkRegistrationFormContainer;
