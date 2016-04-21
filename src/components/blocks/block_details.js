import React from 'react';
import CssModules from 'react-css-modules';

import { getLangText } from '../../utils/lang';

import styles from './block_details.scss';


const BlockDetail = ({ hash, name }) => (
    <div styleName="block-detail">
        <h5 styleName="hash-header">{getLangText('Blockchain ID:')}</h5>
        <p styleName="hash">{hash}</p>
        <p styleName="name">{name}</p>
    </div>
);

export default CssModules(BlockDetail, styles);
