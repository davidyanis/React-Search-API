import React, { Component } from 'react';
import Axios, { AxiosResponse } from 'axios';

import LikedCards, { ImageUrls } from './likedCard';
import { ThemedCSSProperties, ThemeContext } from '../../contexts/themeContext';

import ls from 'local-storage';

interface Props {
    view: string
}


export default class LikedSection extends Component<Props, {}> {
    
    private getLikedImages = ls.get("likedImages")
    
    render() {
            return ( 
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div style={root(theme)}>
                            {this.getLikedImages.map((urls, index) =>
                                <LikedCards key={index} urls={urls} />
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