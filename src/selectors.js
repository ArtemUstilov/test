import * as R from 'ramda'

export const getTotalBasketCount = state => R.length(state.basket);
export const getPhoneById = (state, id) => R.prop(id, state.phones)

export const getPhones = state => {
    const applySearch = item => R.contains(
        state.phonesPage.search,
        R.prop('name', item)
    )
    const phones = R.compose(
        R.filter(applySearch),
        R.map(id => getPhoneById(state, id))
    )(state.phonesPage.ids)

    return phones
}
export const getPhonesByCategory = (state, id)=>{
    if(Object.keys(state.phones.catgrs).length === 0 || !id)return;
    const applySearch = item => R.contains(
        state.phonesPage.search,
        R.prop('name', item)
    )
    const phones = state.phones.catgrs[id].phones.filter(x=>applySearch(x));
    return phones;
}
export const getBasketPhonesWithCount = state => {
    const phoneCount = id => R.compose(
        R.length,
        R.filter(basketId => R.equals(id, basketId))
    )(state.basket)
    const phoneWithCount = phone => R.assoc('count', phoneCount(phone.id), phone)

    const uniqueIds = R.uniq(state.basket)
    return R.compose(
        R.map(phoneWithCount),
        R.map(id => getPhoneById(state, id))
    )(uniqueIds)
}

export const getTotalBasketPrice = state => {
    const totalPrice = R.compose(
        R.sum,
        R.map(phone => phone.special_price?phone.special_price:phone.price),
        R.map(id => getPhoneById(state, id))
    )(state.basket)
    return totalPrice
}
export const getCategories = state=>{
    return R.values(state.categories);
}
export const getActiveCategoryId = ownProps => {
    return R.path(['params', 'id'], ownProps.match)
}
export const alertMessage = message => {
    let alert = document.getElementById('alert');
    alert.innerText = message;
    // alert.classList.add('hide')
    alert.classList.remove('hide');
    setTimeout(()=>alert.classList.add('hide'), 2000)
}
