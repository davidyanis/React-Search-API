import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import ls from 'local-storage';

import ImageCard, { ImageUrls } from './imageCard';
import LikedCards from '../likedCard';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[],
    isLoading: boolean,
    likedImages: ImageUrls[]
}

export default class ImageSection extends Component<Props, State> {
    /** Not a good place for the key.. well.. what the heck.. - GET YOUR OWN! */
    readonly accessKey = "0a17f32970a9b4ce0a8861b51c82cf37679cd71514ee009c65e39de049c3a2c2"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    state: State = {
        imagesUrls: new Array().fill({}),
        isLoading: true,
        likedImages: ls.get(this.props.view) || []
    }
   
  
    handleResponse(response: AxiosResponse) {
        if (response.data && response.data.results) {
            const images = response.data.results.map((img: any) => img.urls)
            this.setState({ imagesUrls: images, isLoading: false })
        }
    }

    handleImageLiked = (urls: ImageUrls) => {
        this.setState(
            { 
                likedImages: ls.set(this.props.view, [urls.small])
            }
        )
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

    componentDidUpdate() {
        
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root(theme)}>
                      {/*   {this.state.likedImages.map((urls, index) =>
                            <ImageCard isLiked={true} view={this.props.view} key={index} urls={urls} onImageLiked={this.handleImageLiked} />
                        )}  */}
                        {this.state.imagesUrls.map((urls, index) =>
                            <ImageCard isLiked={false} view={this.props.view} key={index} urls={urls} onImageLiked={this.handleImageLiked} />
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