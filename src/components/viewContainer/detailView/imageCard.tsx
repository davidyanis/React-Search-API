import React, { Component, CSSProperties, Fragment } from 'react';
import Spinner from '../../spinner';
import Modal from '../../modal';
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../../contexts/themeContext';
import ls from 'local-storage';
import { array } from 'prop-types';

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
    isModalOpen: boolean
}

export default class ImageCard extends Component<Props> {

    state: State = {
        isHover: false,
        isModalOpen: false,
    }

    private arrayLikedImages = []

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
    componentDidMount() {
        ls.set("likedImages", this.arrayLikedImages)
    }
    onMouseEnter = () => {
        this.setState({ 
            isHover: true 
        })
    }

    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () =>  this.setState({ isModalOpen: true });

    likeImage = (event) => {
        const imageStorage = this.props.urls.small
        const getItems = ls.get("likedImages")

        getItems.push(imageStorage)

        ls.set("likedImages", getItems)
      
        event.stopPropagation();
    }
    
    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        const { urls } = this.props
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div
                            style={this.style(theme)}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            onClick={this.openModal}
                        >
                            {urls.small ? 
                            <div style={cardContainer}> 
                                <i 
                                    onClick={this.likeImage} 
                                    style={likeIcon} 
                                    className="heart outline large icon">
                                </i>
                                <img 
                                    src={urls.small} 
                                    style={card}
                                /> 
                            </div> 
                            : <Spinner/> }
                        </div>
                    )}
                </ThemeContext.Consumer>
                {
                    this.state.isModalOpen ? (
                        <Modal shouldClose={this.closeModal}>
                            <img src={urls.regular} style={preview}/>
                        </Modal>
                    ) : null
                }
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
const preview: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
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