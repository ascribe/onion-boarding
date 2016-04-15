import React from 'react';
import CssModules from 'react-css-modules';

import Button from 'ascribe-react-components/modules/buttons/button';

import styles from './form_submit_button.scss';


const FormSubmitButton = (props) => (
    <Button {...props} classType="form" styles={styles} wide />
);

export default CssModules(FormSubmitButton, styles);
