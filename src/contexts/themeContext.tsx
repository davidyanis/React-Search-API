import { createContext, CSSProperties } from 'react'

interface Themes {
    light: ThemeState
    dark: ThemeState
}

export interface ThemeState {
    foreground: {
        primary: string,
        secondary: string,
        darkened: string
    },
    background: {
        primary: string,
        secondary: string,
    },
}

/* Available themes */
export const themes: Themes = {
    light: {
        foreground: {
            primary: '#0A0A0A',
            secondary: '#1F1F1F',
            darkened: '#000000'
        },
        background: {
            primary: '#EEEEEE',
            secondary: '#EAEAEA',
        },
    },
    dark: {
        foreground: {
            primary: '#EEEEEE',
            secondary: '#EAEAEA',
            darkened: '#707070'
        },
        background: {
            primary: '#0A0A0A',
            secondary: '#1F1F1F',
        },
    },
}

/** The exported context to use in components to consume state and/or action  */
export const ThemeContext = createContext({
    theme: themes.dark, // default
    toggleTheme: () => {}, // default
})

/** Helper type for dealing with CSS styling */
export type ThemedCSSProperties = (theme: ThemeState) => CSSProperties
