import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    getTotalBasketCount,
    getTotalBasketPrice
} from '../../selectors.js'
import basket from './basket.png'

const BasketCart = ({totalBasketCount, totalPrice}) => (
        <div className='basket'>
            <Link
                to='/basket'
                id='dLabel'
                className='basketL'
            >
                <img className='basket-img' id='icon-cart'src={basket} alt=''/>
                <p className='count'>{totalBasketCount} шт</p>
                <p className='total'>{totalPrice} грн</p>
            </Link>
        </div>
)


const mapStateToProps = state => {
    return {
        totalBasketCount: getTotalBasketCount(state),
        totalPrice: getTotalBasketPrice(state)
    }
}

export default connect(mapStateToProps, null)(BasketCart)
