import React, { Component, CSSProperties } from 'react';
import { centeredContent } from '../css';

interface Props {}
interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false
    };

    reloadPage = () => {
        window.URL = window.URL;
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ ...centeredContent, ...appearance }}>
                    <h2>¡Could not load component!</h2>
                    <b><a href="" onClick={this.reloadPage}>Reload</a></b>
                </div>
            );
        }

        return this.props.children;
    }
}

export function testErrorBoundary() {
    const nullVariable: any = null;
    console.log(nullVariable.somethingThatDoesNotExist);
}

const appearance: CSSProperties = {
    background: '#EEEEEE',
    color: '#0A0A0A',
    height: '100%'
};