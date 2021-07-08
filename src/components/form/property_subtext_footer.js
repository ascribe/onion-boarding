import React from 'react';
import CssModules from 'react-css-modules';

import styles from './property_subtext_footer.scss';


const PropertySubtextFooter = (props) => (
    <p {...props} styleName="footer" />
);

export default CssModules(PropertySubtextFooter, styles);
