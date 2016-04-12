import React from 'react';
import CssModules from 'react-css-modules';

import styles from './background.scss';


//FIXME: add background image, handle sizing
const Background = (props) => (
    <div {...props} styleName="background" />
);

export default CssModules(Background, styles);
