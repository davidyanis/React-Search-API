import React, { CSSProperties } from 'react';
import Modal from './modal';

/**
 * One purpose for this component could be to give an new users an introduction to your app.
 * And in the future even be used to indroduce new features to the users.
 */
export function WelcomeScreen(props: Props) {
    return (
        <Modal persistent shouldClose={props.dismissed}>
            <h3>React <span style={highlighted}>Playground</span></h3>
            <button onClick={props.dismissed}>Enter</button>
        </Modal>
    )
}

interface Props {
    dismissed: () => void
}

const highlighted: CSSProperties = {
    color: 'orange'
}