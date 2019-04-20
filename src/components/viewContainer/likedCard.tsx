import React, { Component, CSSProperties, Fragment } from 'react';
import Spinner from '../spinner';
import Modal from '../modal';
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../contexts/themeContext';
import ls from 'local-storage';

export interface ImageUrls {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
}

interface Props {
    urls: ImageUrls
}

interface State {
    isHover: boolean
}

export default class LikedCards extends Component<Props> {

    state: State = {
        isHover: false,
    }

    style(theme: ThemeState): CSSProperties {
        const hover: CSSProperties = this.state.isHover ? {
            boxShadow: `0 8px 40px -5px ${theme.foreground.darkened}`,
            transform: 'scale(1.05, 1.05) translateY(-1%)'
        } : {}
        return {
            ...imageContainer(theme),
            ...hover
        }
    }

    onMouseEnter = () => {
        this.setState({ 
            isHover: true 
        })
    }

    onMouseLeave = () => this.setState({ isHover: false })
 

    render() {
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div
                            style={this.style(theme)}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                        >
                            
                        <div style={cardContainer}> 
                            <i 
                                style={likeIcon} 
                                className="heart large icon">
                            </i>
                            <img 
                                src={this.props.urls} 
                                style={card}
                            /> 
                        </div> 
                        </div>
                    )}
                </ThemeContext.Consumer>
            </Fragment>
        )
    }
}

const imageContainer: ThemedCSSProperties = (theme) => ({
    margin: '1em',
    flexGrow: 1,
    background: `${theme.background.primary}AA`,
    width: '12em',
    height: '18em',
    transition: 'all 300ms'
})

const card: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 50
}

const likeIcon: CSSProperties = {
    color: 'red',
    position: 'absolute',
    top: '8px',
    right: '16px',
    zIndex: 100
}

const cardContainer: CSSProperties = {
    height: '100%',
    position: 'relative'
}