import { useContext, useState, useEffect } from 'react';
import {  Link  } from 'react-router-dom'; 
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import Loading from '../components/Loading';
import iconsCloud from '../data/icons.json'
import { v4 as uuidv4 } from 'uuid';

import { Card, Button } from 'react-bootstrap';
import RedirectCard from '../components/RedirectCard';
import languages from '../data/language.json'

const RedirectPage = () => {
    const { user:userID,language:lang } = useContext(AuthContext)
    const [user, setUser] = useState('')

	useEffect(() => {
        
        const storedToken = localStorage.getItem("authToken"); 
        const businessStored = localStorage.getItem("businesses") ? JSON.parse(localStorage.getItem("businesses"))  : []

        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users/business/${userID._id}`, businessStored,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response)=>{
                setUser(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      if (user) {
        return (
            <div>
                <h1 className='m-2'>{`${languages[0][lang].orders.hi} ${user.username},`}</h1>
                <h3 className='m-2'>{languages[0][lang].redirect.where}</h3>
                <div className="d-flex justify-content-around flex-wrap col-12 col-md-8 mx-auto">
                    <div className="d-flex flex-column-md flex-wrap align-items-center justify-content-around col-12 col-md-3 mx-auto">
                        <h4 className='col-12'>{languages[0][lang].redirect.dashboard}</h4>
                        <Link className='card cardBg col-4 mx-1 my-2 p-1  mx-md-5 col-md-8' to={`/dashboard/${user._id}`}>
                            <Card.Img className='p-1' variant='top' src={iconsCloud[0].dashboard} />
                            <Button variant='outline-success' size='sm'>
                            {languages[0][lang].redirect.personal}
                            </Button>
                        </Link>
                            {user.business && 
                            <Link className='card cardBg col-4 mx-1 my-2 p-1  mx-md-5 col-md-8' to={`/${user.business.name}/dashboard`}>
                                <Card.Img className='p-2' variant='top' src={iconsCloud[0].businessDashboard} />
                                <Button variant='outline-success' size='sm'>
                                {languages[0][lang].redirect.business}
                                </Button>
                            </Link> }
                    </div>
                    <div className='col-md-7 col-11'>
                        <h4 className='col-12'>{languages[0][lang].redirect.stores}</h4>
                        <div className='my-2' style={{'maxHeight': `${window.innerWidth < 450 ?'50vh':'60vh'}`,  'overflow':'auto',}}>
                            {user.savedBusiness.map(buz=><RedirectCard key={uuidv4()} business={buz}/>)}
                        </div>
                    </div>
                    
                </div>
                
            </div>
          )

      }else {
        return (
            <div><Loading/></div>
        )
    }
}

export default RedirectPage