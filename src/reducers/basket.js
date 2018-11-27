import * as R from 'ramda'

import {
    ADD_PHONE_TO_BASKET,
    REMOVE_PHONE_FROM_BASKET,
    ADD_PHONE_FROM_BASKET,
    REMOVE_ONE_PHONE_FROM_BASKET,
    SEND_ORDER_SUCCESS
} from '../actionTypes.js'
const initialState = []

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_PHONE_TO_BASKET:
            return R.append(payload, state)
        case REMOVE_PHONE_FROM_BASKET:
            return R.without(R.of(payload), state)
        case REMOVE_ONE_PHONE_FROM_BASKET:
            let ind = state.findIndex(x=>x===payload);
            if(ind<0)return R.without(R.of(payload), state);
            if(state.filter(x=>x===payload).length < 2)
                return R.without(R.of(payload), state)
            return R.remove(ind,1,state);
        case ADD_PHONE_FROM_BASKET:
            return R.append(payload, state)
        case SEND_ORDER_SUCCESS:
            state.respons = payload;
            return state;
        default:
            return state
    }
}
