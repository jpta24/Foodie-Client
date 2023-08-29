import React from 'react'
import DashboardBusinessIconsCard from './DashboardBusinessIconsCard'
import { BsClipboardData } from "react-icons/bs";
import { BiDollarCircle } from "react-icons/bi";


const DashboardBusinessIcons = ({chartState}) => {
    console.log(chartState);
    const iconOrders = <BsClipboardData className='fs-3'/>
    const iconSales = <BiDollarCircle className='fs-2'/>
    const getNumber = (arr)=>{
        arr.reduce((acc, val) => {
            return acc + val;
        }, 0)
    }
    const sales = getNumber(chartState.charData.reversedSales)
    const orders = getNumber(chartState.charData.reversedOrders)
  return (
    <div className='col-12 col-md-5 my-4 d-flex flex-wrap'>
    <DashboardBusinessIconsCard title={'Sales'} icons={iconSales} number={sales}/>
    <DashboardBusinessIconsCard title={'Orders'} icons={iconOrders} number={orders}/>
    </div>
  )
}

export default DashboardBusinessIcons