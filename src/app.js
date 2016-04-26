// Install necessary polyfills (see supported browsers) into global
import 'core-js/es6';
import 'core-js/stage/3';
import 'core-js/stage/4';

import 'isomorphic-fetch';

// Bootstrap global app dependencies
import './utils/error_handling';

import React from 'react';
import ReactDOM from 'react-dom';
import Bowser from 'bowser';
import CssModules from 'react-css-modules';

import Header from './components/header';
import BlocksConveyor from './components/blocks/blocks_conveyor';
import WorkRegistrationContainer from './components/work_registration_container';

// Import global app styles
import './app_global.scss';

// Import app CSS module
import styles from './app.scss';


const OnionboardingApp = CssModules(React.createClass({
    getInitialState() {
        return {
            fileHash: null,
            selectedFile: null
        };
    },

    onReset() {
        this.setState(this.getInitialState());
    },

    onSelectFile(file) {
        this.setState({
            selectedFile: file
        });

        //TODO: get hash either from webworker or from server
    },

    render() {
        const { fileHash, selectedFile } = this.state;
        const hasFile = !!selectedFile;

        // Turn the browser name from Bowser into a lowercase hypen delimited string for use as a
        // CSS class. See the possible browser names here:
        // https://github.com/ded/bowser/blob/master/src/bowser.js
        const browserName = typeof Bowser.name === 'string' ?
                                Bowser.name.toLowerCase().replace(/ /g, '-') : '';

        return (
            <div className={browserName} styleName="app">
                <Header hide={hasFile} />
                <WorkRegistrationContainer
                    onReset={this.onReset}
                    hasFile={hasFile}
                    onSelectFile={this.onSelectFile} />
                <BlocksConveyor fileHash={fileHash} fileName={selectedFile ? selectedFile.name : null} />
            </div>
        );
    }
}), styles);

ReactDOM.render((<OnionboardingApp />), document.getElementById('ascribe--onion-boarding-app'));
