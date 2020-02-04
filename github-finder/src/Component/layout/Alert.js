import React from 'react'

const Alert = ({alert}) => {
    return (
        
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i style={alertStyle}className="fa fa-info-circle"> {alert.msg} </i>
            </div>
        )
        
    )
    
}
const alertStyle ={
    fontSize:'17px',


}

export default Alert