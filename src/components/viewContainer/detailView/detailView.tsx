import React, { Component, CSSProperties } from 'react';
import { fullscreenAbsolute } from '../../../css';
import { RouteComponentProps } from 'react-router-dom';
import Modal from '../../modal';
import HeaderSection from './headerSection';
import TextSection from './textSection';
import ImageSection from './imageSection';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';
import Button from '../../button';

interface Props extends RouteComponentProps {}

interface State {
    isModalOpen: boolean
}

export default class DetailView extends Component<Props, State> {

    state: State = {
        isModalOpen: false
    }

    get view() {
        return this.props.match.url.substr(1);
    }

    get imageSrc() {
        return `../assets/${this.view}.jpg`;
    }

    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={container}>
                        <img src={this.imageSrc} style={{ ...fullscreenAbsolute }}/>
                        <div style={{ ...content(theme), ...fullscreenAbsolute }}>

                            <div style={flexContainer}>
                                <HeaderSection view={this.view} openModal={this.openModal}/>
                                <TextSection view={this.view}/>
                                <ImageSection view={this.view}/>
                            </div>

                        </div>
                        {
                            this.state.isModalOpen ? (
                                <Modal persistent shouldClose={this.closeModal}>
                                    <h3>Modal opened from <span style={highlighted}>{this.view}</span> view</h3>
                                    <Button onClick={this.closeModal}>Close modal</Button>
                                </Modal>
                            ) : null
                        }
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const highlighted: CSSProperties = {
    color: 'orange'
}

const content: ThemedCSSProperties = (theme) => ({
    zIndex: 10,
    background: `${theme.background.primary}B3`,
    overflowY: 'auto'
})

const container: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%'
}

const flexContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em'
}