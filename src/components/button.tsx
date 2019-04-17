import React, { Component, CSSProperties } from 'react'
import { ThemeContext, ThemeState } from "../contexts/themeContext"

interface Props {
    size?: 'small' | 'regular' | 'large'
    onClick: () => void
}
interface State {
    isHover: boolean
    isPressing: boolean
}

export default class Button extends Component<Props, State> {

    state: State = {
        isHover: false,
        isPressing: false
    }

    onMouseEnter = () => this.setState({ isHover: true })
    onMouseLeave = () => this.setState({ isHover: false, isPressing: false })
    onMouseDown = () => this.setState({ isPressing: true })
    onMouseUp = () => this.setState({ isPressing: false })

    render() {
        const { onClick, children } = this.props
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <button
                        onClick={onClick}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        style={root(theme, this.state, this.props)}
                    >
                        {children}
                    </button>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root = (theme: ThemeState, state: State, props: Props) => {
    const defaultStyle: CSSProperties = {
        background: theme.background.primary,
        color: theme.foreground.primary,
        border: `solid 0.1em ${theme.background.secondary}`,
        borderRadius: '100em',
        padding: '0.5em 0.8em',
        fontWeight: 'bold',
        boxShadow: `0 0 15px -3px ${theme.foreground.darkened}`,
        cursor: 'pointer',
        outline: 'inherit',
        transition: 'all 100ms'
    }

    switch(props.size) {
        case 'small': defaultStyle.fontSize = '0.8em'; break;
        case 'large': defaultStyle.fontSize = '1.3em'; break;
        default: defaultStyle.fontSize = '1em';
    }

    

    if (state.isPressing) {
        const pressedStyle: CSSProperties = {
            boxShadow: `0 0 15px -4px ${theme.foreground.darkened}`,
            transform: 'scale(0.95, 0.95)',
        }
        return { ...defaultStyle, ...pressedStyle }
    }

    if (state.isHover) {
        const hoverStyle: CSSProperties = {
            boxShadow: `0 0 15px -2px ${theme.foreground.darkened}`
        }
        return { ...defaultStyle, ...hoverStyle }
    }

    return defaultStyle
}