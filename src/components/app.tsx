import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './errorBoundary';
import { WelcomeScreen } from './welcomeScreen';
import { Monkey } from './monkey';
import ThemeProvider from '../contexts/themeProvider';

const Layout = React.lazy(() => import(/* webpackChunkName: "layout" */ './layout'));

interface Props {}
interface State {
    isWelcomeScreenEnabled: boolean
}

/**
 * Application top level component. This is a good place for future
 * top level components - ErrorBoundary, Provider & Suspense, etc.
 */
export default class App extends Component<Props, State> {
    state: State = {
        isWelcomeScreenEnabled: false
    }

    removeWelcomeScreen = () => {
        this.setState({ isWelcomeScreenEnabled: false });
    }

    get WelcomeScreen() {
        if (this.state.isWelcomeScreenEnabled) {
            return <WelcomeScreen dismissed={this.removeWelcomeScreen}/>
        }
    }

    render () {
        return (
            <ErrorBoundary>
                <Router>
                    <ThemeProvider>
                        {this.WelcomeScreen}
                        <Suspense fallback={<Monkey/>}>
                            <Layout/>
                        </Suspense>
                    </ThemeProvider>
                </Router>
            </ErrorBoundary>
        )
    }
}