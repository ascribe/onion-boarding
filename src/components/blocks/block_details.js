import React from 'react';
import CssModules from 'react-css-modules';

import Spinner from '../spinner';

import { getLangText } from '../../utils/lang';

import styles from './block_details.scss';


const { string } = React.PropTypes;

const propTypes = {
    hash: string,
    name: string
};

function renderHash(hash) {
    return hash ? (<p styleName="hash">{hash}</p>)
                : (
        <div styleName="hash-spinner">
            <Spinner size={30} />
        </div>
    );
}

const BlockDetail = ({ hash, name }) => (
    <div styleName="block-detail">
        <h5 styleName="hash-header">{getLangText('Blockchain ID:')}</h5>
        {renderHash(hash)}
        <p styleName="name">{name}</p>
    </div>
);

BlockDetail.propTypes = propTypes;

export default CssModules(BlockDetail, styles);
