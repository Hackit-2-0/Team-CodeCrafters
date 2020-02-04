import React from 'react'
import PropTypes from 'prop-types';

 const ReposItem = ({repo}) => {

    return (
        <div>   
            <h5>
                <a target="blank" style={repoStyle} href={repo.html_url}>{repo.name}</a>
            </h5>
        </div>
    );

};
const repoStyle = {
    textDecoration:'none'
}
ReposItem.propTypes= {
    repo:PropTypes.object.isRequired
}

export default ReposItem