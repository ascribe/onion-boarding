import React from 'react';
import CssModules from 'react-css-modules';

import Property from 'ascribe-react-components/modules/form/properties/property';

import propertySpecExtender from 'ascribe-react-components/modules/form/utils/property_spec_extender';

import styles from './simple_property.scss';


const SimpleLayout = CssModules(({ children }) => (
    <div styleName="layout">
        {children}
    </div>
), styles);

SimpleLayout.displayName = 'SimpleLayout';


// Needs to be created as a stateful component to allow the Form to attach refs to this component
const SimpleProperty = React.createClass(propertySpecExtender({
    displayName: 'SimpleProperty',

    render() {
        // Don't show any error messages in the individual properties to let the form handle them
        // all
        const noErrorLabel = null;

        return (
            <Property
                {...this.props}
                errorLabelType={noErrorLabel}
                layoutType={SimpleLayout} />
        );
    }
}));

export default CssModules(SimpleProperty, styles);
