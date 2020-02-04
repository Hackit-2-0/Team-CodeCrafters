import React , {Fragment} from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
 
    return (
        <Fragment>
            <img src={spinner} alt="Loading..." 
                style={{margin:'auto' , display:'block', width:'200px'}}
            />    
        </Fragment>
    )
}

export default Spinner
