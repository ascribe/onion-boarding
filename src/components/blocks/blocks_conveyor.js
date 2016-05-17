import React from 'react';
import CssModules from 'react-css-modules';

import BlocksGroup from './blocks_group';

import styles from './blocks_conveyor.scss';


const { string } = React.PropTypes;

const propTypes = {
    fileHash: string,
    fileName: string
};

const BlocksConveyor = ({ fileHash, fileName }) => (
    <div styleName="container">
        <div styleName="conveyor-belt" />
        <BlocksGroup blockDetails={{ hash: fileHash, name: fileName }} />
    </div>
);

BlocksConveyor.propTypes = propTypes;

export default CssModules(BlocksConveyor, styles);
