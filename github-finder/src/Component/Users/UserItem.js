import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import uuid from 'uuid'
class UserItem extends Component {

   render() {
    //   destructring
      const {login ,avatar_url} = this.props.user;
        return ( 
                <div className= 'text-center' >
                    <img src={avatar_url} alt="" className="rounded-circle" style={{width:'60px'}}/>
                    <h6> {login} </h6>
                    <div >
                        <Link to={`/user/${login}`} target="blank" className='btn btn-secondary btn-sm'>More </Link>  
                    </div> 
                    <br/>
                </div>
        )
    }
}
// const hrefStyle = {
//     margin : '10px 10px',
//     padding:'5px'
// }
export default UserItem;