import React from 'react';
import CssModules from 'react-css-modules';

import styles from './block.scss';


const { node } = React.PropTypes;

const propTypes = {
    front: node,
    side: node,
    top: node
};

const Block = ({ front, top, side, ...props }) => (
    <div {...props} styleName="container">
        <div styleName="front">{front}</div>
        <div styleName="top">{top}</div>
        <div styleName="side">{side}</div>
    </div>
);

Block.propTypes = propTypes;

// Make sure this is in sync with the width in block.scss!
// Unfortunately there's no way to export the value directly from the stylesheet, and using an
// inline style here is less than ideal because the transforms used to maniuplate the top and
// right sides of the cube are tightly coupled with a given dimension (ie. they'll have to be
// tweaked if the width or height changes).
export const BLOCK_WIDTH = 145;

export default CssModules(Block, styles);
