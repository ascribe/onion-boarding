import React from 'react';
import CssModules from 'react-css-modules';

import Button from 'ascribe-react-components/modules/buttons/button';

import styles from './header_button.scss';


const HeaderButton = (props) => (
    <Button {...props} classType="header" styles={styles} />
);

export default CssModules(HeaderButton, styles);
