import React from 'react';
import CssModules from 'react-css-modules';

import styles from './spinner.scss';


const { number, oneOfType, string } = React.PropTypes;

const propTypes = {
    size: oneOfType([number, string])
};

const defaultProps = {
    size: 20
};

const Spinner = ({ size, style, ...props }) => (
    <div {...props} style={Object.assign({ height: size, width: size }, style)} styleName="spinner" />
);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default CssModules(Spinner, styles);
