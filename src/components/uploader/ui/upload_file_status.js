import React from 'react';
import CssModules from 'react-css-modules';

import FileStatus from 'ascribe-react-components/modules/uploader/constants/file_status';

import { extractFileExtensionFromString } from 'ascribe-react-components/modules/utils/file';
import { truncateTextAtCharIndex } from 'ascribe-react-components/modules/utils/general';
import { kbToMb } from '../../../utils/file';
import { getLangText } from '../../../utils/lang';

import FileSvg from '../../../styles/icons/file_svg.svg';
import UploadCompleteSvg from '../../../styles/icons/upload_complete_svg.svg';

import styles from './upload_file_status.scss';


const FileIcon = CssModules(({ extension }) => (
    <span styleName="file-icon-container">
        <FileSvg height="35" aria-hidden />
        <span styleName="file-icon-extension">{truncateTextAtCharIndex(extension, 3, '')}</span>
    </span>
), styles);

FileIcon.displayName = 'FileIcon';


const UploadFileStatus = ({ file }) => {
    let progressIndicator;

    if (file.status === FileStatus.UPLOADED) {
        progressIndicator = [
            (
                <UploadCompleteSvg
                    key="progress-complete-icon"
                    aria-hidden
                    height="12"
                    styleName="progress-complete-icon" />
            ),
            getLangText('Uploaded')
        ];
    } else {
        progressIndicator = [
            (
                <span key="progress-percent" styleName="progress-percent">
                    {`${Math.ceil(file.progress)}`}
                </span>
            ),
            getLangText('Uploading')
        ];
    }

    return (
        <div styleName="container">
            <FileIcon extension={extractFileExtensionFromString(file.name)} />
            <span styleName="file-name">{truncateTextAtCharIndex(file.name, 15)}</span>
            <span styleName="file-size">{`(${Math.ceil(kbToMb(file.size))}MB)`}</span>
            <span styleName="progress-container">
                {progressIndicator}
            </span>
        </div>
    );
};

UploadFileStatus.displayName = 'UploadFileStatus';

export default CssModules(UploadFileStatus, styles);
