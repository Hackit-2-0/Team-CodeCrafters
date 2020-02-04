import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {

    state = {
        text : ''
    }

    // lesson 23: 
    // const [text , setText] = useState('')
    // "useState()" while using functional comcponent when you want state
    // in your functional component 
    // setText is function 

    // then we don't use setState we will use setText 
    // replace this.setState <=> setText 

    // const {abc} = this.props can be replace by putting in 
    // const function = ({abc}) { }  

    
    onChange = (e) => {
        this.setState({text:e.target.value})
    }

    static propTypes = {
        searchUser:PropTypes.func.isRequired,
        clearSearch:PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert:PropTypes.func.isRequired
    }
    // if we don't use arrow function then we need to bind "this" with onSubmit method
    onSubmit = (e) =>{
        e.preventDefault();
        // console.log(this.state.text);
        
        if(this.state.text === ''){
            this.props.setAlert('Please Enter username ...', 'info');
        }
        else{
            this.props.searchUser(this.state.text);
            this.setState({text:''});
    
        }

    }


    render() {

        return (
            <div>
                <form className= "form" onSubmit ={this.onSubmit} style= {{display:"grid", gridTemplateColumns:'repeat(3, 1fr)', gridGap:'1rem' , margin:"10px 5px"}}>
                    <input type="text" name="username" 
                        className="form-control" 
                        value={this.state.text} 
                        onChange = {this.onChange} 
                        placeholder="Enter the username.."
                    />
                    
                    <input 
                        type="submit" 
                        value="search"
                        className="btn btn-danger"
                    />
                    
                    {this.props.showClear ? 
                    <input type="button" value="clear" 
                        className="btn btn-secondary" 
                        onClick={this.props.clearSearch}/> : null}
                    
                </form>
                
            </div>
        )
    }
}

export default Search
