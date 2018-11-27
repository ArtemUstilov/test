import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchPhone} from '../../actions/index.js'

class Search extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchPhone(this.state.value)
    }

    render () {
        return (
            <div>
                <div className='search'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            type='text'
                            className='searchInpt'
                        />
                    </form>
                    <span className='input-group-btn'>
<button className='search-btn'
                 onClick={this.handleSubmit}>
    Знайти
</button>
                        <button className='search-btn categoryB'
                                onClick={()=>{
                                    document.getElementById('ctgrs').classList.remove('hide')
                                }}>
    Категорії
</button>
</span>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    searchPhone
}

export default connect(null, mapDispatchToProps)(Search)

