import React from 'react';
import CssModules from 'react-css-modules';
import Dimensions from 'react-dimensions';

import Grouping from 'ascribe-react-components/modules/ui/grouping';

import { default as Block, BLOCK_WIDTH } from './block';
import BlockDetails from './block_details';

import styles from './blocks_conveyor.scss';


const { string } = React.PropTypes;

const BLOCK_MARGIN = 25;
const BLOCK_GROUP_SHIFT_X = -150;

// We need to define another component for Dimensions to hook into and provide dimension props
const BlocksGroup = Dimensions()(CssModules(({ blockDetails: { hash, name } = {}, containerWidth }) => {
    const blocks = [];

    // Somewhat hacky here, since we have no way of querying a non-rendered Block for its width.
    // We have to make do with taking the magically defined width value by Block and use it to
    // calculate the number of blocks it'll take to fill up the width of the container.
    //
    // We shift the blocks on the x-axis and add margin between each block, so let's take those
    // into consideration here too.
    //
    // And just to be safe, let's render an extra block to add a small buffer in case the browser's
    // slow at rerendering on resizes.
    const numBlocks = Math.ceil((containerWidth - BLOCK_GROUP_SHIFT_X) / (145 + BLOCK_MARGIN)) + 1;

    for (let ii = 0; ii < numBlocks; ++ii) {
        blocks.push(
            <Block
                key={ii}
                front={
                    // Put the selected file details onto the second block (which should be the
                    // first fully visible block on the left)
                    ii === 1 && (hash || name) ? (
                        <BlockDetails hash={hash} name={name} />
                    ) : null
                }
                style={{ zIndex: ii }} />
        );
    }

    return (
        <Grouping
            margin={BLOCK_MARGIN}
            style={{ transform: `translateX(${BLOCK_GROUP_SHIFT_X}px)` }}
            styleName="blocks-container">
            {blocks}
        </Grouping>
    );
}, styles));

BlocksGroup.displayName = 'BlocksGroup';


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
