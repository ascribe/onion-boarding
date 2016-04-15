import React from 'react';
import CssModules from 'react-css-modules';

import WorkRegistrationForm from './work_registration_form';
import WorkRegistrationHeader from './work_registration_header';

import { getLangText } from '../../utils/lang';

import BackArrowSvg from '../../styles/icons/back_arrow_svg.svg';

import styles from './work_registration_form_container.scss';


const WorkRegistrationBackButton = CssModules(({ children, ...buttonProps }) => (
    <button {...buttonProps} styleName="back-button">
        <BackArrowSvg aria-hidden height="7" styleName="back-arrow-icon" />
        {children}
    </button>
), styles);

WorkRegistrationBackButton.displayName = 'WorkRegistrationBackButton';


const WorkRegistrationFormContainer = ({ onFormSubmit, onReset, selectedFile }) => (
    <div styleName="container">
        <WorkRegistrationBackButton onClick={onReset}>
            {getLangText('Start over')}
        </WorkRegistrationBackButton>
        <WorkRegistrationHeader />
        <WorkRegistrationForm
            onSubmit={onFormSubmit}
            selectedFile={selectedFile} />
    </div>
);

export default CssModules(WorkRegistrationFormContainer, styles);
