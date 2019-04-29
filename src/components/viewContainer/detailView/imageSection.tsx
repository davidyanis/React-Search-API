import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';

import ImageCard, { ImageUrls } from './imageCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[],
    isLoading: boolean,
    likedImages: ImageUrls[]
    isLiked: boolean
}

export default class ImageSection extends Component<Props, State> {
    /** Not a good place for the key.. well.. what the heck.. - GET YOUR OWN! */
    readonly accessKey = "0a17f32970a9b4ce0a8861b51c82cf37679cd71514ee009c65e39de049c3a2c2"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

        state: State = {
            imagesUrls: new Array().fill({}),
            isLoading: true,
            likedImages: [],
            isLiked: true
        }
   
    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ 
                imagesUrls: images, 
                isLoading: false,
            })
        }
    }
    
    handleImageLiked = (urls: ImageUrls, index: number) => {
        this.setState(
            { 
                likedImages: [...this.state.likedImages, urls],
            }
        );
        this.setState(
            {
                imagesUrls: this.state.imagesUrls.filter((_, i) => i !== index)
            }
        )
    }
 

    storageSavedImages() {
        const urlStorage: ImageUrls[] = JSON.parse(localStorage.getItem(this.props.view) || "{}")

        if(urlStorage.length > 0) {
            this.setState ({
                likedImages: this.state.likedImages = [...urlStorage]
            });
        }
    }

    setLocalStorage() {
        localStorage.setItem(this.props.view, JSON.stringify(this.state.likedImages)) 
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: this.props.view,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            })
            this.handleResponse(response);
        } catch(error) {
            console.error(error)
        }
    }

    componentDidUpdate(isLiked: any, urls: any) {
        if(this.props.view in localStorage && this.state.likedImages.length === 0) {
            this.storageSavedImages();
        } else {
            this.setLocalStorage(); 
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                        {this.state.likedImages.map((urls: ImageUrls, index: number) =>
                            <ImageCard index={index} isLiked={true} view={this.props.view} key={index} urls={urls} onImageLiked={this.handleImageLiked} />
                        )}
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard index={index} isLiked={false} view={this.props.view} key={index} urls={urls} onImageLiked={this.handleImageLiked} />
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: ThemedCSSProperties = (theme) => ({
    margin: '3em -1em -1em -1em',
    display: 'flex',
    flexWrap: 'wrap',
    background: `${theme.background.primary}B3`,
    boxShadow: `0 0px 80px 15px ${theme.background.primary}`
})