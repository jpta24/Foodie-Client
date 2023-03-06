import { useState, useContext, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Row, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProfileCard from '../components/ProfileCard';

import iconsCloud from '../data/icons.json'
import languages from '../data/language.json'

const ProfilePage = () => { 
	const {language:lang} = useContext(AuthContext);
    const { userID } = useParams();
	const { user:userAuth } = useContext(AuthContext);

    const [user, setUser] = useState('')

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken"); 
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userID}`,{headers: {Authorization: `Bearer ${storedToken}`}})
          .then(response=>{
            
              setUser(response.data)
          })
          .catch((error) => {
              console.log({error});
            })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
    const navigate = useNavigate();

    const initialState = {
        user: false,
        admin: false,
        employee: false,
        developer:false
    }

    const updatedRol = {...initialState,[user.rol]:true}

    // initialState[user.rol] = true

    const [rol, setRol] = useState(updatedRol)
    const [buzname, setBuzname] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [incommingMessage, setIncommingMessage] = useState(undefined);

    if (userAuth._id !== userID) {
         navigate(`/profile/${userAuth._id}`)
    }

    const handleChange = (rolClicked) => {
        const newState = {...initialState}
        newState[rolClicked]= true
        setRol(newState)
    }

    const handleBuzNameSubmit = (e) => {
		e.preventDefault();
        const storedToken = localStorage.getItem("authToken"); 

        let newRol =''
        Object.entries(rol).forEach(eachrol=>{
            if (eachrol[1]) {
                newRol=`${eachrol[0]}Pending`
            }
        })   
        const requestBody = {
            rol:newRol,
            buzname
        } 
		// Make an axios request to the API
		// If POST request is successful redirect to Business/Dashboard page
		// If the request resolves with an error, set the error message in the state
		axios
			.put(`${process.env.REACT_APP_SERVER_URL}/users/rol/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
			.then(() => {
                setIncommingMessage(`${languages[0][lang].profile.inCommingMsg}`)
                // eslint-disable-next-line no-lone-blocks
                {window.innerWidth < 450 ? 
                    toast.success(`${languages[0][lang].tostify.appSent}`, {
                        position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    }) : toast.success(`${languages[0][lang].tostify.appSent}`, { theme: 'dark' });}
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
                // eslint-disable-next-line no-lone-blocks
              {window.innerWidth < 450 ? 
                toast.error(errorDescription, {
                    position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                }) : toast.error(errorDescription, { theme: 'dark' });}
				setErrorMessage(errorDescription);
			});
	};


  return (
    <div className='container'>
        {/* <Row className='justify-content-end'>
            <Button variant='outline-primary' size='sm' className='col-3 col-md-2 m-2 '>Edit Profile</Button>
        </Row> */}
        <Row className='d-flex flex-row justify-content-center pt-3'>
            <div className='col-3 col-md-2 justify-content-center align-items-center mx-2'>
                <img src={user.avatarUrl || iconsCloud[0].userDefault} alt='altProfile' className='w-100 rounded-circle border border-dark p-2 d-block'/>
            </div>
            <div className='col-8 col-md-6 d-flex flex-column align-items-start'>
                <div className='d-flex col-12 justify-content-between'>
                    <h2>{user.username}</h2> 
                    <Button variant='outline-primary' size='sm' className='col-5 col-md-4 m-2 '>{languages[0][lang].profile.editProfile}</Button>
                </div>
                <section className='d-flex flex-column align-items-start col-10 col-md-10'>
                    <p>{languages[0][lang].profile.email} <span className='font-weight-bold'>{user.email}</span></p>
                    <p>{languages[0][lang].profile.rol} <span className='font-weight-bold'>{user.rol}</span></p>
                </section>    
            </div>
        </Row>
        <Row className='justify-content-center'>
            <h5 className='my-2'>{languages[0][lang].profile.changeRol}</h5>
            <Row xs={2} md={2} className='g-4 px-3 my-0 justify-content-center'>
                <ProfileCard onclick={()=>{handleChange('user')}} button='User' src={rol.user ? iconsCloud[0].userActive: iconsCloud[0].userInactive}/>
                <ProfileCard onclick={()=>{handleChange('admin')}} button={languages[0][lang].profile.admin} src={rol.admin ? iconsCloud[0].adminActive: iconsCloud[0].adminInactive}/>
                <ProfileCard onclick={()=>{handleChange('employee')}} button={languages[0][lang].profile.employee} src={rol.employee ? iconsCloud[0].employeeActive: iconsCloud[0].employeeInactive}/>
            </Row>
            
                <Form onSubmit={handleBuzNameSubmit} className='pb-2'>
                {(rol.admin || rol.employee) && (
                    <Form.Group
                        className='mb-3 col-md-6 d-flex flex-column align-items-start'
                        controlId='formBasicBusinessName'
                    >
                        <Form.Label className='mx-2'>{languages[0][lang].profile.formName}</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder={languages[0][lang].profile.phName}
                            value={buzname}
                            onChange={(e) => {
                                setBuzname(e.target.value);
                            }}
                        />
                    </Form.Group>
                   
                )}
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
						
						<Button variant='primary' size="lg" type='submit' className='m-2 col-8 col-md-4'>
                        {languages[0][lang].profile.apply}
						</Button>
                        
                    {incommingMessage && <p className='text-success'>{incommingMessage}</p>}
                </Form>
        </Row>
    </div>
  )
}

export default ProfilePage