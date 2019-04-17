import React, { CSSProperties, Component } from 'react';
import Axios, { AxiosResponse } from 'axios';
import Spinner from '../../spinner';
import { ThemeContext, ThemedCSSProperties } from '../../../contexts/themeContext';

interface Props {
    view: string
}

interface State {
    paragraphs: string[]
    isLoading: boolean
}

export default class TextSection extends Component<Props, State> {

    state: State = {
        paragraphs: [],
        isLoading: true
    }

    get wikipediaApiUrl() {
        return (
            'http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text'
        )
    }

    stripHtmlAndReferences(htmlText: string) {
        var doc = new DOMParser().parseFromString(htmlText, 'text/html')
        const text = doc.body.textContent || ""
        return this.removeReferences(text)
    }

    removeReferences(text: string) {
        return text.replace(/ *\[[^)]*\] */g, "")
    }

    handleResponse(response: AxiosResponse) {
        const htmlPageText: string = response.data.parse.text['*']
        const paragraphs = this.extractBeginningOfText(htmlPageText)
        this.setState({ paragraphs, isLoading: false })
    }

    extractBeginningOfText(htmlPageText: string): string[] {
        // Split on <p>
        const paragraphs = htmlPageText.split('<p>')
        // Remove first content
        paragraphs.shift()
        // Trim end of last paragraph
        let lastParapgraph = paragraphs.pop() || ""
        lastParapgraph = lastParapgraph.substr(0, lastParapgraph.indexOf('</p>'))
        paragraphs.push(lastParapgraph)

        return paragraphs.map((p) => this.stripHtmlAndReferences(p))
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(this.wikipediaApiUrl, {
                params: {
                    page: this.props.view,
                    origin: '*',
                    format: 'json'
                }
            })
            this.handleResponse(response)
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        const { isLoading, paragraphs } = this.state
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div style={root}>
                        {isLoading ? <Spinner/> : null}
                        {paragraphs.map((paragraph) =>
                            <p key={paragraph.substr(0, 10)} style={text(theme)}>{paragraph}</p>
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const root: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '15em'
}

const text: ThemedCSSProperties = (theme) => ({
    display: 'block',
    lineHeight: '1.5',
    fontSize: '1.1em',
    color: theme.foreground.primary,
    textShadow: `1px 1px 2px ${theme.background.primary}`
})