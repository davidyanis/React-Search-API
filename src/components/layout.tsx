import React, { Component, CSSProperties } from 'react';
import Navbar from './navbar';
import ViewContainer from './viewContainer/viewContainer';
import { fullScreen } from '../css';
import { ThemedCSSProperties, ThemeContext } from '../contexts/themeContext';

interface Props {}

interface State {
    currentView: string
}

/** React class component */
export default class Layout extends Component<Props, State> {

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={{ ...columnFlex, ...fullScreen, ...background(theme) }}>
                        <Navbar/>
                        <ViewContainer/>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const columnFlex: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
}

const background: ThemedCSSProperties = (theme) => ({
    background: theme.background.secondary
})
