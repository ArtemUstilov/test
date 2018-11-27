import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import phones from './items.js'
import phonesPage from './itemsPage.js'
import phonePage from './itemPage.js'
import basket from './basket.js'
import categories from './categories.js'

export default combineReducers({
    routing: routerReducer,
    phones,
    phonesPage,
    phonePage,
    basket,
    categories
})