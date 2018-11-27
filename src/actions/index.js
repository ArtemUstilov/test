import {
    FETCH_PHONES_START,
    FETCH_PHONES_SUCCESS,
    FETCH_PHONES_FAILURE,
    FETCH_PHONE_BY_ID_START,
    FETCH_PHONE_BY_ID_SUCCESS,
    FETCH_PHONE_BY_ID_FAILURE,
    ADD_PHONE_TO_BASKET,
    SEARCH_PHONE,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_PHONES_CATEGORY_FAILURE,
    FETCH_PHONES_CATEGORY_START,
    FETCH_PHONES_CATEGORY_SUCCESS,
    REMOVE_PHONE_FROM_BASKET,
    REMOVE_ONE_PHONE_FROM_BASKET,
    ADD_PHONE_FROM_BASKET,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_START
} from '../actionTypes'
import {alertMessage} from "../selectors";

import {fetchPhones as fetchPhonesApi,
    fetchPhoneById as fetchPhoneByIdApi,
    fetchCategoriesApi,
    fetchPhonesByCategoryId as fetchPhoneByCategoryIdApi,
    fetchSendOrder as fetchSendOrderApi} from '../api/index.js'


export const searchPhone = (text) => dispatch => {
    dispatch({
        type: SEARCH_PHONE,
        payload: text
    })
}
export const fetchCategories = () => async dispatch => {
    dispatch({type: FETCH_CATEGORIES_START})

    try {
        const phones = await fetchCategoriesApi()
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: phones
        })
    } catch (err) {
        dispatch({
            type: FETCH_CATEGORIES_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const fetchPhones = () => async dispatch => {
    dispatch({type: FETCH_PHONES_START})

    try {
        const phones = await fetchPhonesApi()
        dispatch({
            type: FETCH_PHONES_SUCCESS,
            payload: phones
        })
    } catch (err) {
        dispatch({
            type: FETCH_PHONES_FAILURE,
            payload: err,
            error: true
        })
    }
}
export const addPhoneToBasket = id => dispatch => {
    dispatch({
        type: ADD_PHONE_TO_BASKET,
        payload: id
    })
}

export const fetchPhoneById = (id) => async dispatch => {
    dispatch({type: FETCH_PHONE_BY_ID_START})

    try {
        const phone = await fetchPhoneByIdApi(id)
        dispatch({
            type: FETCH_PHONE_BY_ID_SUCCESS,
            payload: phone
        })
    } catch (err) {
        dispatch({
            type: FETCH_PHONE_BY_ID_FAILURE,
            payload: err,
            error: true
        })
    }
}
export const removePhoneFromBasket = id => async dispatch => {
    dispatch({
        type: REMOVE_PHONE_FROM_BASKET,
        payload: id
    })
}
export const clearBasket = ids => async dispatch => {
    ids.map(id=>
    dispatch({
        type: REMOVE_PHONE_FROM_BASKET,
        payload: id
    }))
}
export const sendOrder = (name, email, phone, products)=>async dispatch=>{
    dispatch({type:SEND_ORDER_START})
    const request = await fetchSendOrderApi(name, email, phone, products);
    if(request.status == 'success')
        alertMessage('Замовлення успішне')
    dispatch({
        type:SEND_ORDER_SUCCESS,
        payload: request
    })
}
export const removeOnePhoneFromBasket = id => async dispatch => {
    dispatch({
        type: REMOVE_ONE_PHONE_FROM_BASKET,
        payload: id
    })
}
export const addPhoneFromBasket = id => async dispatch => {
    dispatch({
        type: ADD_PHONE_FROM_BASKET,
        payload: id
    })
}

export const fetchPhoneByCategoryId = () => async dispatch => {
    const categories = await fetchCategoriesApi();
    dispatch({type: FETCH_PHONES_CATEGORY_START})
    let fetchCategoryId = async function(id){
        try {
            const phones = await fetchPhoneByCategoryIdApi(id);
            dispatch({
                type: FETCH_PHONES_CATEGORY_SUCCESS,
                payload: {
                    id:id,
                    phones:phones
                }
            })
        } catch (err) {
            dispatch({
                type: FETCH_PHONES_CATEGORY_FAILURE,
                payload: err,
                error: true
            })
        }}
    await categories.forEach(x=>fetchCategoryId(x.id));

}
