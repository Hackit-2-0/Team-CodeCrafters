import React, { Fragment ,Component } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Repos from '../Repos/Repos'


class User extends Component {

    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static prpoTypes = {
        loading : PropTypes.bool,
        getUser : PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos:PropTypes.array.isRequired,
    }

    render() {
        const {
            name,
            login,
            avatar_url, 
            html_url,
            blog,
            public_repos, 
            followers,
            following,
            hireable,
            bio,
            public_gists
            

        } = this.props.user
        
        const {loading} = this.props
        // if(loading) return <Spinner/>
        return (
            <Fragment>
                <div style={linkStyle}>
                    <Link to ="/" className = "btn btn-info" style={{marginRight:'10px'}}>Back to search</Link>

                    Hireable = {''}
                    {hireable ? <i className="fa fa-check-circle text-success"/>
                    :    <i className="fa fa-times-circle text-danger"/>
                    }
                </div>

            <div className="card text-center">
                <div style={cardStyle} className="card-header">

                    <img src={avatar_url} alt="Loading ..." className="round-img" style={{width:'150px'}}/>
                    <h4>{name}</h4>
                    <p>{login}</p>
                
                </div>
                
                <div >
                    { 
                        bio && 
                        
                        <Fragment>
                            <h3>Bio</h3>
                            {bio}
                            
                        </Fragment>
                    }
                </div>
                <div className="">
                    
                    <h3 style={{margin:'10px 0px'}}>Links</h3>                
                    <a href={blog} style={{margin:'3px'}} className='btn btn-outline-info my-1'>Visit My portfolio</a> 
                    <a href={html_url} style={{margin:'3px'}} className='btn btn-outline-info my-1'>Visit github profile </a>

                </div>
                
                <div className="card-body">
                    <h5>Followers : <span className="badge badge-success">{followers}</span></h5>
                    <h5>Following : <span className="badge badge-info">{following}</span></h5>
                    <h5>Public repos : <span className="badge badge-secondary">{public_repos}</span></h5>
                    <h5>Public gists : <span className="badge badge-danger">{public_gists}</span></h5>
                    
                </div>
                    <h5>Public Repository</h5>
                    <div style={{marginBottom:'1em'}}>
                        <Repos repos={this.props.repos}/>
                    </div>
            </div>
            

            </Fragment>
        )
    }
}
const cardStyle = {
    margin:'10px'
}

const linkStyle = {
    margin:'10px'
}
export default User
