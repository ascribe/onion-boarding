import React from 'react';
import CssModules from 'react-css-modules';

import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';

import { getLangText } from '../../utils/lang';

import styles from './work_registration_header.scss';


const WorkRegistrationHeader = () => {
    // Popover needs an id for accessibility reasons:
    // https://react-bootstrap.github.io/components.html#popover-props
    const popover = (
        <Popover id="help-text-popover">
            {getLangText('Sample explainer text...')}
        </Popover>
    );

    return (
        <div styleName="container">
            <h2 styleName="header-text">
                <div styleName="pretext">{getLangText('Generate a')}</div>
                <div styleName="emphasis">{getLangText('Certificate of Authenticity')}</div>
                <div styleName="subtext">{getLangText('Enter the details on the right')}</div>
            </h2>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <button styleName="help-text-button">{getLangText('What is happening?')}</button>
            </OverlayTrigger>
        </div>
    );
};

export default CssModules(WorkRegistrationHeader, styles);
