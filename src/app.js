// Install necessary polyfills (see supported browsers) into global
import 'core-js/es6';
import 'core-js/stage/3';
import 'core-js/stage/4';

import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import Background from './components/background';

// Import global app styles
import styles from './app.scss';

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
            </Background>
        );
    }
});

ReactDOM.render((<OnionboardingApp />), document.getElementById('ascribe--onion-boarding-app'));
