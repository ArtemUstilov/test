import React from 'react'
import Sidebar from '../../components/navbar'
import Footer from '../../components/footer'

const Layout = ({children}) => (
        <div className='container'>
                <div className='content2'>
                <div className='sidebar'>
                    <Sidebar/>
                </div>
                    <div className='list'>
                    {children}
                </div>
                </div>
            <div>
                <Footer/>
            </div>
    </div>
)

export default Layout
