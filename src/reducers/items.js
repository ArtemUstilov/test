import * as R from 'ramda'
import {
    FETCH_PHONES_SUCCESS,
    FETCH_PHONE_BY_ID_SUCCESS,
    FETCH_PHONES_CATEGORY_SUCCESS

} from '../actionTypes.js'

const initialState = {
    catgrs :{}
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_PHONES_SUCCESS:
            const newValues = R.indexBy(R.prop('id'), payload)
            return R.merge(state, newValues)
        case FETCH_PHONE_BY_ID_SUCCESS:
            return R.assoc(payload.id, payload, state)
        case FETCH_PHONES_CATEGORY_SUCCESS:
            if(!payload)return state;
            let id = payload.id;
            state.catgrs[id] = payload;
            return state;
        default:
            return state
    }
}
