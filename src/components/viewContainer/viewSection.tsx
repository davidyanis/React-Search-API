import React, { Component, CSSProperties } from 'react';
import { centeredContent, fullscreenAbsolute } from '../../css';
import ErrorBoundary from '../errorBoundary';

/** React class component */
export default class ViewSection extends Component {

    render() {
        return (
            <div style={{ ...gridItem, ...centeredContent }}>
                <div style={ fullscreenAbsolute }>
                    <ErrorBoundary>
                        {this.props.children}
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}

const gridItem: CSSProperties = {
    position: 'relative',
    margin: '2em',
    background: '#808080',
    height: '100%',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 0 2px white, 2px 2px 15px black'
}