import React, { Component } from 'react'
import Spinner from '../layout/Spinner'
// import uuid from 'uuid'
import UserItem from './UserItem'
import PropTypes from 'prop-types';

class Users extends Component {
    state = {
       users: [

        ]
    }
    render() {
        if(this.props.loading)
        {
            return <Spinner/>
        }
        else{
            return (
                <div style={displayStyle}>
                    {this.props.users.map(user => (
                    <UserItem key={user.id} user={user}/>
                    
                    ))}
                    <br/>
                </div>
            )
        }
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading :PropTypes.bool.isRequired,
    
}

const displayStyle = {
    
     display: 'grid',
     gridTemplateColumns:'repeat(4, 1fr)',    
     gridGap:'1rem'
} 

export default Users

