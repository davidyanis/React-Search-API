import React, { Suspense, CSSProperties } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { centeredContent, fullscreenAbsolute} from '../../css';
import Spinner from '../spinner';


const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

interface Props {
    
}

interface State {
    inputValue: string
}
/** React function component */
export default class ViewContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            inputValue : ''
        }

        this.updateInput = this.updateInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateInput(event: any) {
        this.setState({inputValue: event.target.value})
    }

    handleSubmit(event: any) {
        event.preventDefault()
        console.log(this.state.inputValue)
    }

   /*  private detailViews = ['forest', 'sky', 'desert']; */

    render() {
    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <div style={{ ...centeredContent, ...fullscreenAbsolute }}>
                <Link to={this.state.inputValue}></Link>
                    <form onSubmit={this.handleSubmit}>
                        <input style={ inputField } 
                        onChange={this.updateInput}
                        type="text" 
                        placeholder="Search.." 
                        />
                        <button 
                        onClick={this.handleSubmit}
                        style={ searchButton } 
                        type="submit" >Search</button>
                    </form>
                </div>
                {/* <Route exact path="/" render={() =>
                    <MasterView detailViews={detailViews}/>
                }/> */}
                    {/* <Route path="/forest" component={DetailView}/>
                    <Route path="/sky" component={DetailView}/>
                    <Route path="/desert" component={DetailView}/> */}
            </Switch>
        </Suspense>
    );
    }
}

const inputField: CSSProperties = {
    width: '10em',
    fontSize: '1.3em',
    borderRadius: '0.3em',
    padding: '0.4em'
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

