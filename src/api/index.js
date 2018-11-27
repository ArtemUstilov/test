import * as R from 'ramda'

export const fetchPhones = async () => {
    const response = await fetch("https://nit.tron.net.ua/api/product/list");
    return await response.json();
}
export const fetchPhoneById = async (id) => {
    const response = await fetch(`https://nit.tron.net.ua/api/product/${id}`);
    return await response.json();
}
export const fetchPhonesByCategoryId = async (id) => {
    const response = await fetch(`https://nit.tron.net.ua/api/product/list/category/${id}`);
    return await response.json();
}
export const fetchCategoriesApi = async () => {
    const response = await fetch(`https://nit.tron.net.ua/api/category/list`);
    return await response.json();
}
const token = `BkB1xjHdQ02lctHrbkUT`
export const fetchSendOrder = async (name, email, phone, products) => {

    let obj = R.merge({
        token: token,
        name: name,
        phone: phone,
        email: email,
    }, products)

    let serialize = obj => Object.keys(obj).map(k =>
                    `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&')

    const response = await fetch(`https://nit.tron.net.ua/api/order/add`, {
        method: 'post',
        headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: serialize(obj),
    });
    return await response.json();
}