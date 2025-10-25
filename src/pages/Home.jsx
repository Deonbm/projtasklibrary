import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
<Link to={'/pro'}> <div><button className='btn btn-success'>Set Your Task Now</button></div></Link>
</div>
  )
}

export default Home