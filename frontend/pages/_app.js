import React from 'react';
import App from 'next/app';

import UserProvider from '../src/global/providers/UserProvider';

class MainApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </React.Fragment>
        );
    }
}

export default MainApp;