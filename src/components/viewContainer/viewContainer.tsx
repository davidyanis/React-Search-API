import React, { Suspense, CSSProperties } from 'react';
import { Route, Switch, Link, RouteComponentProps} from 'react-router-dom';
import Spinner from '../spinner';
import LikedSection from './likedSection'
import ls from 'local-storage';

import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react'




const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

interface Props extends RouteComponentProps  {
    view: string
}

interface State {
    inputValue: string
}
/** React function component */
export default class ViewContainer extends React.Component<Props, State> {
    view: any;
   
    constructor(props: Props) {
        super(props)

        this.state = {
            inputValue : '',
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    updateInput(event) {
        this.setState({inputValue: event.target.value})
       
    }

    handleSubmit(event) {
        event.stopPropagation();
    }

    static contextTypes = {
        router: PropTypes.object
    }
    
    redirectToTarget = (event) => {
        event.stopPropagation()
        if (event.which === 13) {
            this.context.router.history.push(this.state.inputValue)
        }
      

    }


   /*  private detailViews = ['forest', 'sky', 'desert']; */

    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Route path="/:id" component={DetailView}></Route>
                
                       
                        <div style={centeredForm}>
                        
                            <form onSubmit={this.handleSubmit}>
                                <input style={ inputField } 
                                onChange={this.updateInput}
                                type="text" 
                                placeholder="Search.." 
                                onKeyPress={this.redirectToTarget}
                                />
                                <button 
                                style={ searchButton } 
                                type="submit" 
                                >
                                <Link to={this.state.inputValue} style={LinkStyling}>Search</Link>
                                </button>
                            </form>
                            <div>
                                <LikedSection view={this.view}/>
                            </div>
                        </div>
                        
                    </Switch>
                    
            </Suspense>
            
        );
    }
}

const inputField: CSSProperties = {
    width: '10em',
    fontSize: '1.3em',
    padding: '0.4em',
    backgroundColor: 'inherit',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid grey',
    outline: 'none',
    margin: 0,
    color: 'white'
}

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

const centeredForm: CSSProperties = {
    height: '100%',
    textAlign: 'center',
    marginTop: '5em'
}



