import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda'
import del from './del.png'
import {
    getBasketPhonesWithCount,
    getTotalBasketPrice
} from '../../selectors.js'
import {Link} from "react-router-dom";
import {
    removePhoneFromBasket,
    removeOnePhoneFromBasket,
    addPhoneFromBasket,
    sendOrder
} from '../../actions/index.js'
import Layout from "../layout";
import Order from "../../components/order";
import Footer from "../../components/footer";
const Basket = ({
                    phones, totalPrice, removePhoneFromBasket,
                    addPhoneFromBasket, removeOnePhoneFromBasket, sendOrder
                }) => {
    const isBasketEmpty = R.isEmpty(phones)

    const renderPrice = (phone) => {
        if (phone.special_price)
            return (
                <div>
                    <p className='price'><span className='new-price'>{phone.special_price} грн</span></p>
                </div>
            )
        return (
            <div>
                <p className='price'><span className='new-price'>{phone.price}</span> грн</p>
            </div>
        )
    }
    const renderContent = () => {
        return (
            <div className='mt100'>
                {isBasketEmpty &&
                <div className='empty-basket lower'>Ваша корзина порожня, <Link className='link-tostore' to='/'>повернутись
                    до товарів</Link></div>}

                <div className='basket-grid'>
                    {phones.map((phone, index) => (
                        <div className='item-cell lower' key={index}>
                            <div className='img-wrapper'>
                                <img
                                    className='item-img'
                                    src={phone.image_url}
                                    alt={phone.name}
                                />
                            </div>
                            <div className='wrapper'>
                                {renderPrice(phone)}
                            </div>
                            <div className='wrapper'>
                                <p className='amount'>{phone.count} шт</p>
                            </div>
                            <div className='wrapper'>
                                <Link to={`/phones/${phone.id}`} className='link-phone'>
                                    <p className='link-text'>{phone.name}</p>
                                </Link>
                            </div>
                            <div className='wrapper basket-btns'>
                                <Link to={`/phones/${phone.id}`} className='upright'>
                                    <button className='add-btn'>
                                        <p className='smaller-link'>Детальніше про товар</p>
                                    </button>
                                </Link>
                                <button
                                    className='add-btn del add-link'
                                    onClick={() => {
                                        addPhoneFromBasket(phone.id)
                                    }}
                                > +
                                </button>
                                <button
                                    className='add-btn del remove-link'
                                    onClick={() => {
                                        removeOnePhoneFromBasket(phone.id)
                                    }}
                                > -
                                </button>
                                <button
                                    className='add-btn del del-link'
                                    onClick={() => {
                                        removePhoneFromBasket(phone.id)
                                    }}
                                >
                                    <img className='del-img' src={del} alt='Видалити'/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderSidebar = () => (
        <div className='sidebar'>
            <div className='basket-n'>
                <Link to='/' className='category'>
                    <button className='nav-btn'>
                        <p className='category-text back'>Назад</p>
                    </button>
                </Link>
                <div className='category'>
                    <p className='category-text back'><span className='adItem'>Всього: </span>{totalPrice} грн</p>
                </div>
                <button className='nav-btn'
                        onClick={() => {
                            !isBasketEmpty && document.getElementById('order').classList.remove('hidden')
                        }}>
                    <p className='category-text back bnav-btn'>Замовлення</p>
                </button>
            </div>
        </div>
    )

    return (
        <div>
            <div id='top'/>
            <div className='alert hide' id='alert'/>
            <div className='content2'>
                <div>

                    {renderContent()}
                </div>
                <div>
                    {renderSidebar()}
                </div>
                <div>
                    <Order/>
                </div>

            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        phones: getBasketPhonesWithCount(state),
        totalPrice: getTotalBasketPrice(state)
    }
}
const mapDispatchToProps = {
    removePhoneFromBasket,
    addPhoneFromBasket,
    removeOnePhoneFromBasket,
    sendOrder
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket)
