import * as R from 'ramda'

import {
    FETCH_PHONES_SUCCESS,
    SEARCH_PHONE,
} from '../actionTypes.js'

const initialState = {
    ids: [],
    catgrs: {},
    search: ''
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_PHONES_SUCCESS:
            return R.merge(state, {
                ids: R.pluck('id', payload)
            })
        case SEARCH_PHONE:
            return R.merge(state, {
                search: payload
            })

        default:
            return state
    }
}