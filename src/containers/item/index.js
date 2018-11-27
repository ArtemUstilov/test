import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPhoneById, addPhoneToBasket} from '../../actions/index.js'
import Basket from '../../components/basket/index.js'
import {getPhoneById} from '../../selectors.js'
import Footer from '../../components/footer';
import {animateIcon} from '../../animations/index';


class Phone extends Component {
    componentDidMount () {
        this.props.fetchPhoneById(this.props.match.params.id)
    }
    renderSidebar () {
        const {phone, addPhoneToBasket} = this.props
        return (
            <div className='sidebar'>
                <div className='navs'>
                <Basket />
                <button className='nav-btn '>
                    <Link className="noUnder" to='/'><p className='category-text noUnder'>До товарів</p></Link>
                </button>
                <button
                    type='button'
                    className='nav-btn'
                    onClick={() => addPhoneToBasket(phone.id)}
                >
                    <p className='category-text adItem'> Додати до корзини</p>
                </button>
                </div>
            </div>
        )
    }

    renderContent () {
        const {phone} = this.props;
        const {addPhoneToBasket} = this.props
        return (
            <div className='item-cell lower'>
                <div className='img-wrapper'>

                    <img
                        className='item-img'
                        src={phone.image_url}
                        alt={phone.name}
                    />
                </div>
                <div className='wrapper'>
                    <p>{this.renderPrice(phone)}</p>
                </div>
                <div className='wrapper'>
                        <p className='phone-text'>{phone.name}</p>
                </div>
                <div className='wrapper'>
                    <p className='itemButton'>
                        <button
                            className='add-btn'
                            onClick={() => {
                                animateIcon()
                                addPhoneToBasket(phone.id)
                            }}
                        >
                            Купити
                        </button>
                    </p>
                </div>
            </div>
        )
    }
    renderPrice(phone) {
        if (phone.special_price)
            return (
                <div>
                    <p className='price'><span className='old-price'>{phone.price}  грн</span>   <span className='new-price'>{phone.special_price} грн</span></p>
                </div>
            )
        return (
            <div>
                <p className='price'><span className>{phone.price}</span> грн</p>
            </div>
        )
    }


    render () {
        const {phone} = this.props
        return (
            <div>
                    <div className="item content">
                            {phone && this.renderSidebar()}
                        <div id='top'/>
                        <div className='item-grid mt100'>
                            {phone && this.renderContent()}
                            <div className='item-cell noBorder lower'>
                                {phone && this.renderDescription(phone)}
                            </div>
                        </div>

            </div>
                <Footer/>
            </div>
        )
    }


    renderDescription(phone) {
        return(
            <p>
                <p className='h2-title'>Опис товару: </p>
                {phone.description}
            </p>
        )
    }
}
const mapStateToProps = state => {
    return {
        phone: getPhoneById(state, state.phonePage.id)
    }
}
const mapDispatchToProps = {
    fetchPhoneById,
    addPhoneToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)
