import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { centeredContent, fullScreen } from '../css';
import { ThemeContext } from '../contexts/themeContext';

interface Props {
    size?: number
}

export default function(props: Props) {
    const defaultSize = 6;
    const size = props.size ? (props.size * defaultSize) : defaultSize

    return (
        <div style={{ ...centeredContent, ...fullScreen}}>
            <ThemeContext.Consumer>
                {({ theme }) =>
                    <PropagateLoader
                        color={theme.foreground.primary}
                        size={size}
                        sizeUnit="px"
                    />
                }
            </ThemeContext.Consumer>
        </div>
    );
}