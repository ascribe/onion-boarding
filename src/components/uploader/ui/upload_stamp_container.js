import React from 'react';
import CssModules from 'react-css-modules';

import UploadFileStatus from './upload_file_status';

import { getLangText } from '../../../utils/lang';

import StampSvg from '../../../styles/icons/stamp_svg.svg';
import UploadSvg from '../../../styles/icons/upload_svg.svg';

import styles from './upload_stamp_container.scss';


const { func } = React.PropTypes;

// Helper components
const UploadStampButton = CssModules((props) => (
    <button {...props} styleName="stamp-button">
        <UploadSvg aria-hidden height="45" styleName="upload-icon" />
        <div styleName="stamp-button-text">{getLangText('Upload your file')}</div>
    </button>
), styles);

const UploadStampHeader = CssModules(() => (
    <h1 styleName="header">
        {getLangText('SAMPLE TEXT: Stamp a claim of authenticity to a global public registry ' +
                     '(Blockchain)')}
    </h1>
), styles);

UploadStampButton.displayName = 'UploadStampButton';
UploadStampHeader.displayName = 'UploadStampHeader';


const UploadStampContainer = ({ selectedFile }, { handleSelectFiles }) => (
    <div styleName="container">
        <UploadStampHeader />
        <div styleName="stamp-container">
            <StampSvg aria-hidden height="130" styleName="stamp-icon" />
            <div styleName="stamp-area">
                {selectedFile ? <UploadFileStatus file={selectedFile} />
                              : <UploadStampButton onClick={handleSelectFiles} />}
            </div>
        </div>
    </div>
);

UploadStampContainer.displayName = 'UploadStampContainer';
UploadStampContainer.contextTypes = {
    handleSelectFiles: func.isRequired
};

export default CssModules(UploadStampContainer, styles);
