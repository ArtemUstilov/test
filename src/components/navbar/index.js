import React from 'react'

import Basket from '../../components/basket/index.js'
import Search from '../../components/search/index.js'
import Categories from '../../components/categories/index.js'

const Sidebar = () => {
    return (
        <div className="navs">
            <Basket />
            <Search />
            <Categories/>
        </div>
    )
}

export default Sidebar
