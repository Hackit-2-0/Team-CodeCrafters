import React, { Component } from 'react'
// default export is not thier then we use {}
import {Link} from 'react-router-dom' 

// import PropTypes from 'prop-types'

class Navbar extends Component {

    // static defaultProps = {
    //     title: "Github-search-engine",
    //     icon : 'fa fa-github'
    // }

    // static propTypes ={
    //     title : PropTypes.string.isRequired,
    //     icon : PropTypes.string.isRequired
    // }
    render() {
        return (
            <nav style={navbarStyle} className="navbar bg-primary">
                <h4 >
                    <i className={this.props.icon}/> {this.props.title}
                </h4>
                <ul className="list-group" style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)', gridGap:'2rem'}}>
                    <li >
                        <Link style={{color:'white' ,fontSize:'15px' , textDecoration:'none'}} to="/">Home</Link>
                    </li>
                    <li>
                        <Link style={{color:'white' ,fontSize:'15px', textDecoration:'none' }} to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
const navbarStyle = {

    color: 'white',
    textDecoration: 'none',
  }

export default Navbar
