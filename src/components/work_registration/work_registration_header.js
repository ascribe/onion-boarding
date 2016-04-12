import React from 'react';
import CssModules from 'react-css-modules';

import { getLangText } from '../../utils/lang';

import styles from './work_registration_header.scss';


const WorkRegistrationHeader = React.createClass({
    onHelpToggle() {
    },

    render() {
        return (
            <div styleName="container">
                <h2 styleName="header-text">
                    <div styleName="pretext">{getLangText('Generate a')}</div>
                    <div styleName="emphasis">{getLangText('Certificate of Authenticity')}</div>
                    <div styleName="subtext">{getLangText('Enter the details on the right')}</div>
                </h2>
                <button onClick={this.onHelpToggle} styleName="help-text-button">{getLangText('What is happening?')}</button>
            </div>
        );
    }
});

export default CssModules(WorkRegistrationHeader, styles);
