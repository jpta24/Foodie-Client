import React from 'react'

const DashboardBusinessIconsCard = ({title,icons,number}) => {
  return (
    <div className='dashboard-order-card-container mx-auto my-4 col-4 col-md-9'>
        <div className="h4 pt-2 mb-0">{title}</div>
        <div className="col-12">{icons}</div>
        <div className="col-12 h5">{number}</div>
    </div>
  )
}

export default DashboardBusinessIconsCard