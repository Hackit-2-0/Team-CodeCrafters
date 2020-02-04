import React, {Fragment,Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Navbar from './Component/layout/Navbar'
import Users from './Component/Users/Users'
import User from './Component/Users/User'
import Search from './Component/Users/Search'
import Alert from './Component/layout/Alert'
import About from './Component/Pages/About'
import axios from 'axios'

class App extends Component {

    state = {
        title: 'Github search engine',
        users: [],
        user:{},
        repos:[],
        loading : false,
        alert : null

    }

    // async componentWillMount(){
    //     // this.setState({loading:true})
    //     // const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_ID}
    //     // &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_SECRET}`);
    //     // this.setState({users:res.data , loading:false})
    //     // console.log(res.data) 
    // }

    // search github user

    searchUser = async (text) =>{
        this.setState({loading:true})
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_SECRET}`);
        this.setState({users:res.data.items , loading:false})
        
    }

    getUser = async (username) =>{
        
        this.setState({loading:true})
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_SECRET}`);
        this.setState({user:res.data, loading:false})
        
    }

    getUserRepos = async (username) =>{
        
        this.setState({loading:true})
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_OAUTH_SECRET}`);
        this.setState({repos:res.data, loading:false})
        
    }

    clearSearch = () =>{
        this.setState({users:[] , loading:false})
    }

    setAlert = (msg, type) => {
        this.setState({alert:{msg:msg , type:type}});

        setTimeout(() => this.setState({alert:null}), 5000)
    }
    
    render() {

        return ( 
            <Router>
                <div className = "App" >
                  <Navbar icon = 'fa fa-github' title = { this.state.title }/> 
                <br/>
                <div className="container">
                    <Alert alert={this.state.alert}/>
                    <Switch>
                        <Route exact path='/' render={props=>(
                            <Fragment>
                                    
                                    <Search 
                                            searchUser = {this.searchUser} 
                                            clearSearch = {this.clearSearch} 
                                            showClear ={this.state.users.length > 0 ? true :false }
                                            setAlert = {this.setAlert}
                                    />
                                
                                    <Users loading={this.state.loading} users = {this.state.users} />

                            </Fragment>
                        )}>
                            
                        </Route>

                        <Route exact path="/about" component={About}/>

                        <Route exact path='/user/:login' render={props =>(
                            
                                <User 
                                    
                                        {...props} 
                                        getUser={this.getUser} 
                                        getUserRepos = {this.getUserRepos}
                                        repos = {this.state.repos}
                                        user ={this.state.user} 
                                        loading={this.state.loading} 
                                    
                                />
                                 
                                )
                            } 
                        
                        /> 
                        
                        </Switch>

                    </div>
                  </div>
            </Router>
        );
    }

}

export default App;