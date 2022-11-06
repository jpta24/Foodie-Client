import React from 'react'

const Loading = () => {
  return (
    <div className='p-5'>
        <div className='col-4 mx-auto my-4'>
            <img  width={130} src="loading.gif" alt="loadingAnimation" />
        </div>
        <div>
            <p>We're Loading the page...</p>
            <p className='fw-bold'>❤ Remember to Save the Business and add the Link to your bookmark ⭐</p>
        </div>
    </div>
  )
}

export default Loading