import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { ThemedCSSProperties, ThemeContext } from "../../contexts/themeContext"


interface Props {
    focusOnMount?: boolean
}

interface State {
    inputValue: string
}

export default class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            inputValue: localStorage.getItem("searchterm") || ""
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

   
    updateInput(event) {
        this.setState(
            {
                inputValue: event.target.value
            }
        )
    }

    handleSubmit(event) {
        localStorage.setItem("searchterm", this.state.inputValue)

        this.setState({
            inputValue: localStorage.getItem("searchterm") || '' 
        })

        if (event.which === 13) {
            this.context.router.history.push(this.state.inputValue)
        }

        event.stopPropagation();
    }

    static contextTypes = {
        router: PropTypes.object
    }
    


    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <form>
                        <input style={ inputField(theme) } 
                        onChange={this.updateInput}
                        type="text" 
                        placeholder="Search.." 
                        onKeyPress={this.handleSubmit}
                        value={this.state.inputValue}
                        />
                     
                        <button 
                        style={ searchButton } 
                        type="submit" 
                        onClick={this.handleSubmit}
                        >
                        <Link to={this.state.inputValue} style={LinkStyling}>Search</Link>
                        </button>
                    </form>
                  
                )}
            </ThemeContext.Consumer>
        )
    }
}

const inputField: ThemedCSSProperties = (theme) => ({
    width: '10em',
    fontSize: '1.3em',
    padding: '0.4em',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid grey',
    
    margin: 0,
    color: theme.foreground.secondary,
    background: theme.background.secondary
})

const searchButton: CSSProperties = {
    marginLeft: '1em',
    padding: '0.4em',
    width: '5em',
    fontSize: '1.2em',
    backgroundColor: '#1E1E1E',
    border: '',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '1em'
}

const LinkStyling: CSSProperties = {
    color: 'white',
    textDecoration: 'none'
}
