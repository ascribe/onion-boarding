import React from 'react';
import CssModules from 'react-css-modules';

import Grouping from 'ascribe-react-components/modules/ui/grouping';

import HeaderButton from './header_button';

import AppUrls from '../constants/app_urls';
import { getLangText } from '../utils/lang';

import styles from './header.scss';


const Header = ({ hide }) => (
    <div style={{ visibility: hide ? 'hidden' : 'visible' }} styleName="header">
        <Grouping className="pull-right" margin={0}>
            <HeaderButton href={AppUrls.APP_LOGIN}>
                {getLangText('sign in')}
            </HeaderButton>
            <HeaderButton href={AppUrls.APP_SIGNUP}>
                {getLangText('sign up')}
            </HeaderButton>
        </Grouping>
    </div>
);

export default CssModules(Header, styles);
