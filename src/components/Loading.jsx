import React from 'react'

const Loading = () => {
  const imgSrc = 'https://res.cloudinary.com/dwtnqtdcs/image/upload/v1667777007/foodie-gallery/loading_v69hwy.gif'
  return (
    <div className='container p-5'>
        <div className='col-4 mx-auto my-4'>
            <img  width={130} src={"/loading.gif" || imgSrc} alt="loadingAnimation" />
        </div>
        <div>
            <p>We're Loading the page...</p>
            <p className='fw-bold'>❤ Remember to Save the Business and add the Link to your bookmark ⭐</p>
        </div>
    </div>
  )
}

export default Loading