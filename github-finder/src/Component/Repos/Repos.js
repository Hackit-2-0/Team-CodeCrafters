import React from 'react'
import PropTypes from 'prop-types';
import ReposItem from './ReposItem'

const Repos = ({repos}) => {
    return (   
        repos.map((repo) => <ReposItem  key={repo.id} repo={repo}/>)
    )
    
}

Repos.propTypes ={
    repos: PropTypes.array.isRequired,
}

export default Repos
