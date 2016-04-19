// Install necessary polyfills (see supported browsers) into global
import 'core-js/es6';
import 'core-js/stage/3';
import 'core-js/stage/4';

import 'isomorphic-fetch';

// Bootstrap global app dependencies
import './utils/error_handling';

import React from 'react';
import ReactDOM from 'react-dom';

import Background from './components/background';
import Header from './components/header';

import WorkRegistrationContainer from './components/work_registration_container';

// Import global app styles
import './app_global.scss';


const OnionboardingApp = React.createClass({
    getInitialState() {
        return {
            hasFile: false,
            fileHash: null
        };
    },

    onReset() {
        this.setState(this.getInitialState());
    },

    onSelectFile(file) {
        this.setState({
            hasFile: true
        });

    },

    onUploadError() {
        this.setState({
            hasFile: false
        });
    },

    render() {
        return (
            <Background>
                <Header hide={this.state.hasFile} />
                <WorkRegistrationContainer
                    onReset={this.onReset}
                    hasFile={this.state.hasFile}
                    onSelectFile={this.onSelectFile}
                    onUploadError={this.onUploadError} />
            </Background>
        );
    }
});

ReactDOM.render((<OnionboardingApp />), document.getElementById('ascribe--onion-boarding-app'));
