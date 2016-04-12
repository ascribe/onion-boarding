import React from 'react';

import ButtonList from 'ascribe-react-components/modules/buttons/button_list';

import HeaderButton from './header_button';

import AppUrls from '../constants/app_urls';
import { getLangText } from '../utils/lang';


const Header = ({ hide }) => (
    <div style={{ visibility: hide ? 'hidden' : 'visible' }}>
        <ButtonList pull="right">
            <HeaderButton href={AppUrls.APP_LOGIN}>
                {getLangText('sign in')}
            </HeaderButton>
            <HeaderButton href={AppUrls.APP_SIGNUP}>
                {getLangText('sign up')}
            </HeaderButton>
        </ButtonList>
    </div>
);

export default Header;
