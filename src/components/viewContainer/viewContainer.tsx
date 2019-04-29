import React, { Suspense, CSSProperties } from 'react';
import { Route, Switch, Link, RouteComponentProps} from 'react-router-dom';
import Spinner from '../spinner';

import SearchBar from './searchBar'
import ImageCard, { ImageUrls } from './detailView/imageCard';



const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));


interface Props {
    view: string
}

interface State {
    imagesUrls: ImageUrls[],
}
/** React function component */
export default class ViewContainer extends React.Component<Props, State> {
    

    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Route path="/:id" component={DetailView}></Route>       
                        <div style={centeredForm}>
                            <SearchBar />      
                        </div>
                    </Switch>
                    
            </Suspense>
            
        );
    }
}

const centeredForm: CSSProperties = {
    height: '100%',
    textAlign: 'center',
    marginTop: '5em'
}



