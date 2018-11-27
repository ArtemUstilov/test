 import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
 import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import './main.css'
import reducers from './reducers/index.js'
import Phone from './containers/item/index.js'
import Phones from './containers/items/index.js'
import Basket from './containers/basket/index.js'
import * as serviceWorker from './serviceWorker.js'
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
))

 ReactDOM.render(
    <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <Route exact path='/' component={Phones} />
                <Route exact path='/categories/:id' component={Phones}/>
                <Route exact path='/phones/:id' component={Phone} />
                <Route exact path='/basket' component ={Basket}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
