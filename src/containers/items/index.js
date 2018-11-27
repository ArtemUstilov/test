import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPhones, getPhonesByCategory,
    getActiveCategoryId} from '../../selectors.js'
import {
    fetchPhones,
    addPhoneToBasket,
    fetchCategories,
    fetchPhoneByCategoryId
} from '../../actions/index.js'
import {
    animateIcon
} from '../../animations/index.js'
import {Link} from 'react-router-dom'
import Layout from '../../containers/layout/index.js'
class Phones extends Component {
    componentDidMount() {
        this.props.fetchPhones()
        this.props.fetchCategories()
        this.props.fetchPhoneByCategoryId()
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
                <p className='price'><span>{phone.price}</span> грн</p>
            </div>
        )
    }

    renderPhone(phone, index) {
        const {addPhoneToBasket} = this.props
        return (
            <div className='item-cell' key={index}>
                <Link to={`/phones/${phone.id}`} className='img-wrapper'>
                    <img
                        className='item-img'
                        src={phone.image_url}
                        alt={phone.name}
                    />
                </Link>
                <div className='wrapper'>
                    {this.renderPrice(phone)}
                </div>
                <div className='wrapper'>
                    <Link to={`/phones/${phone.id}`} className='link-phone'>
                            <p className='link-text'>{phone.name}</p>
                        </Link>
                </div>
                <div className='wrapper'>
                        <button
                            className='add-btn'
                            onClick={() => {
                                animateIcon()
                                addPhoneToBasket(phone.id)}}
                        >
                            Купити
                        </button>
                </div>
            </div>
        )
    }


    render() {
        const {phones} = this.props
        if (!phones) return (<div/>);

        return (
            <div>
                <Layout>
                <div className='items-grid marg'>
                    {Object.keys(phones).map((phone, index) => this.renderPhone(phones[phone], index))}
                </div>
                </Layout>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const actCatId = getActiveCategoryId(ownProps);
    let ob = getPhonesByCategory(state, actCatId);
    return (ob && {phones:ob}) || {phones: getPhones(state)}
}

const mapDispatchToProps = {
    fetchPhones,
    addPhoneToBasket,
    fetchCategories,
    fetchPhoneByCategoryId,
}

export default connect(mapStateToProps, mapDispatchToProps)(Phones)
