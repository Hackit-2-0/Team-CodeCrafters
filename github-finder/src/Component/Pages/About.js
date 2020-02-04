import React,{Fragment} from 'react'

function About() {
    return ( <Fragment >
        <h2> This is github search engine</h2> 
        <p style = { styling } > Version: 1.1.0 </p> 
        </Fragment >
    )
}
const styling = {
    fontSize: '20px'
}
export default About;