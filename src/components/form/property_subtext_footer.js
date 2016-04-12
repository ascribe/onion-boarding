import React from 'react';
import CssModules from 'react-css-modules';

import styles from './property_subtext_footer.scss';


const PropertySubtextFooter = (props) => (
    <p {...props} styleName="footer" />
);

PropertySubtextFooter.displayName = 'PropertySubtextFooter';

export default CssModules(PropertySubtextFooter, styles);
