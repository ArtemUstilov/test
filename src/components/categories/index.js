import * as R from 'ramda'
import classNames from 'classnames'
import {Link, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import React from 'react'
import {connect} from 'react-redux'

import {
    getCategories,
    getActiveCategoryId
} from '../../selectors.js'

const Categories = ({categories, activeCategoryId}) => {
    const renderCategory = (category, index) => {
        const getActiveState = R.propEq('id', activeCategoryId)
        let linkClass;
        if (getActiveState(category))
            linkClass = classNames({
                'active': true,
                'ctgrB': true
            })
        else {
            linkClass = classNames({
                'nav-btn': true,
                'ctgrB': true
            })
        }
        let to = '';
        if (!index) {
            if (!activeCategoryId)
                linkClass = classNames({
                    'active': true,
                    'ctgrB': true
                })
            to = '/';
        }
        else
            to = `/categories/${category.id}`;
        return (
            <Link
                to={to}
                key={index}>
                <button className={linkClass}
                        onClick={function up() {
                            let t;
                            if (window.innerWidth < 1000) {
                                setTimeout(() => document.getElementById('ctgrs').classList.add('hide'), 100)
                            } else {
                                document.getElementById('ctgrs').classList.remove('hide')
                            }
                            const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                            if (top > 0) {
                                window.scrollBy(0, -100);
                                t = setTimeout(up, 20);
                            } else clearTimeout(t);
                        }}>
                    <p className='category-text'>
                        {category.name}
                    </p>
                </button>

            </Link>

        )
    }
    const classes = classNames({
        'hide': window.innerWidth < 1000,
        'categories': true
    })
    return (
        <div className={classes} id='ctgrs'>
            {categories.map((category, index) => renderCategory(category, index))}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
})


export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(Categories)


