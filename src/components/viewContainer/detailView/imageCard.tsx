import React, { Component, CSSProperties, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom'
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

interface Props extends RouteComponentProps {
    urls: ImageUrls
}

interface State {
    isHover: boolean
    isModalOpen: boolean
    heart: string
}

export default class ImageCard extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)

        this.state = {
            isHover: false,
            isModalOpen: false,
            heart: 'heart outline large icon'
        }

        this.likeImage = this.likeImage.bind(this);
        
        if (!ls.get("likedImages")) {
            ls.set("likedImages", this.arrayLikedImages)
        } 

        console.log(this.props.location)

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

    onMouseEnter = () => {
        this.setState({ 
            isHover: true 
        })
    }

    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () =>  this.setState({ isModalOpen: true });

    likeImage(event) {
        const imageStorage = this.props.urls.small
        const getItems = ls.get("likedImages")

        this.setState({ heart: 'heart large icon' });
        
        getItems.push(imageStorage)

        ls.set("likedImages", getItems)
        event.stopPropagation();
    }
    
    closeModal = () => this.setState({ isModalOpen: false });

    render() {
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
                            {this.props.urls.small ? 
                            <div style={cardContainer}> 
                                <i 
                                    onClick={this.likeImage} 
                                    style={likeIcon} 
                                    className={this.state.heart} 
                                    >
                                </i>
                                <img 
                                    src={this.props.urls.small} 
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
                            <img src={this.props.urls.regular} style={preview}/>
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