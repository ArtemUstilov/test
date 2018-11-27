import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda'
import {
    getBasketPhonesWithCount,
    getTotalBasketPrice,
    alertMessage
} from '../../selectors.js'
import {
    sendOrder,
  clearBasket
} from '../../actions/index.js'

function Order({phones, totalPrice,sendOrder, clearBasket,alertMessage}) {

    return  (
            <div className='hidden modal' id='order'>
            <div className="login-page">
                <div className="form">
                    <button
                        className="cancel-btn"
                        onClick={() => {
                            document.getElementById('order').classList.add('hidden')
                        }}>
                        <div className='cancel-text'>+</div>
                    </button>
                    <div className="login-form">
                        <input id='1' type="text" placeholder="ім'я"/>
                        <input id='2' type='tel' placeholder='номер телефону' pattern='^\+380\d{9} || \d{9}$'/>
                        <input id = '3' type="email" placeholder="пошта"/>
                        <button type='submit' className='btn-buy' onClick={()=>{
                            let name = document.getElementById('1').value;
                            let num = document.getElementById('2').value;
                            let email = document.getElementById('3').value;
                            if(name.length < 5){

                                alertMessage('Name must be at least 5 characters')
                                return;
                            }
                            if(!/^\+380\d{9}$/.test(num)){
                                alertMessage('Phone must be +380xxxxxxxxx')
                                return;
                            }
                            if(!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(email)){
                                alertMessage('Wrong email format')
                                return;
                            }
                            sendOrder(
                                name,
                                email,
                                num,
                                R.compose(
                                    R.fromPairs,
                                    R.map(x =>  [`products[${x.id}]`, x.count])
                                )(phones)
                            )
                            const ids = R.compose(
                                R.uniq,
                                R.pluck('id')
                            )(phones)
                            clearBasket(ids)
                            document.getElementById('order').classList.add('hide');
                        }

                        }>Купити</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        phones: getBasketPhonesWithCount(state),
        totalPrice: getTotalBasketPrice(state),
        alertMessage: alertMessage
    }
}
const mapDispatchToProps = {
    sendOrder,
    clearBasket,
}
export default connect(mapStateToProps, mapDispatchToProps)(Order)
