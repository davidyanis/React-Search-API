import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext, ThemedCSSProperties } from '../contexts/themeContext';
import ThemeToggleButton from './themeToggleButton';

/** React function component */
export default function Navbar() {

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <div style={navbar(theme)}>
                    <Link to="/" style={navbarItem(theme)}>
                        <span style={header}>React<span className="sm-hidden"> Playground</span></span>
                    </Link>
                    <div style={navbarItem(theme)}>
                        <ThemeToggleButton/>
                    </div>
                </div>
            )}
        </ThemeContext.Consumer>
    );
}

const navbar: ThemedCSSProperties = (theme) => ({
    height: '4em',
    minHeight: '4em',
    background: theme.background.primary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '0 1em',
    boxShadow: `0 -10px 30px black`
})

const navbarItem: ThemedCSSProperties = (theme) => ({
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.foreground.primary,
})

const header: CSSProperties = {
    fontSize: '1.7em',
    fontWeight: 'bold',
    cursor: 'pointer'
}