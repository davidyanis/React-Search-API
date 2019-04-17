import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fullScreen, centeredContent } from '../css';

interface Props {
    /** Using a persistent modal may cause it to never close if not handled manually */
    persistent?: boolean;
    shouldClose: () => void;
}

export default class Modal extends Component<Props> {
    
    element: HTMLDivElement 

    constructor(props: Props) {
        super(props);
        this.element = document.createElement('div');
        this.element.id = 'modal-root';
    }

    onclick = () => {
        if (!this.props.persistent) {
            this.props.shouldClose();
        }
    }

    componentDidMount() {
        document.body.appendChild(this.element);
    }

    componentWillUnmount() {
        document.body.removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(
            <div style={{ ...fullScreen, ...centeredContent }} onClick={this.onclick}>
                {this.props.children}
            </div>,
            this.element,
        );
    }
}