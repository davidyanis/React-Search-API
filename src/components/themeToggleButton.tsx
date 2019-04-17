import React from 'react'
import { ThemeContext } from "../contexts/themeContext"
import Button from './button';

export default function ThemeToggleButton() {

    return (
        <ThemeContext.Consumer>
            {({ toggleTheme }) => (
                <Button size="small" onClick={toggleTheme}>
                    Toggle Theme
                </Button>
            )}
        </ThemeContext.Consumer>
    )
}