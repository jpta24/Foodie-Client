import { useState, useContext } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

import { Row, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProfileCard from '../components/ProfileCard';

const ProfilePage = () => {
	const { user } = useContext(AuthContext);
    const { userID } = useParams();
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

    if (user._id !== userID) {
         navigate(`/profile/${user._id}`)
    }

    const handleChange = (rolClicked) => {
        const newState = {...initialState}
        newState[rolClicked]= true
        console.log(newState)
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
            update:1,
            rol:newRol,
            buzname
        } 
		// Make an axios request to the API
		// If POST request is successful redirect to Business/Dashboard page
		// If the request resolves with an error, set the error message in the state
		axios
			.put(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}`, requestBody,  {headers: {Authorization: `Bearer ${storedToken}`}})
			.then(() => {
                setIncommingMessage("Business's owner would let you know about your application")
		        toast.success('Application Sent', { theme: 'dark' });
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
                toast.error(errorDescription, { theme: 'dark' });
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
                <img src={user.avatarUrl || 'https://res.cloudinary.com/dwtnqtdcs/image/upload/v1664807121/foodie-gallery/userActive_g8bwbi.png'} alt='altProfile' className='w-100 rounded-circle border border-dark p-2 d-block'/>
            </div>
            <div className='col-8 col-md-6 d-flex flex-column align-items-start'>
                <div className='d-flex col-12 justify-content-between'>
                    <h2>{user.username}</h2> 
                    <Button variant='outline-primary' size='sm' className='col-5 col-md-4 m-2 '>Edit Profile</Button>
                </div>
                <section className='d-flex flex-column align-items-start col-10 col-md-10'>
                    <p>E-mail: <span className='font-weight-bold'>{user.email}</span></p>
                    <p>Rol: <span className='font-weight-bold'>{user.rol}</span></p>
                </section>    
            </div>
        </Row>
        <Row className='justify-content-center'>
            <h5 className='my-2'>Change Rol</h5>
            <Row xs={2} md={2} className='g-4 px-3 my-0 justify-content-center'>
                <ProfileCard onclick={()=>{handleChange('user')}} button='User' src={`/user${rol.user ? 'A': 'Ina'}ctive.png`}/>
                <ProfileCard onclick={()=>{handleChange('admin')}} button='Admin' src={`/admin${rol.admin ? 'A': 'Ina'}ctive.png`}/>
                <ProfileCard onclick={()=>{handleChange('employee')}} button='Employee' src={`/employee${rol.employee ? 'A': 'Ina'}ctive.png`}/>
            </Row>
            
                <Form onSubmit={handleBuzNameSubmit}>
                {(rol.admin || rol.employee) && (
                    <Form.Group
                        className='mb-3 col-md-6 d-flex flex-column align-items-start'
                        controlId='formBasicBusinessName'
                    >
                        <Form.Label className='mx-2'>Enter the Business's Name you're applying to:</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter a Name for your Business'
                            value={buzname}
                            onChange={(e) => {
                                setBuzname(e.target.value);
                            }}
                        />
                    </Form.Group>
                   
                )}
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
						
						<Button variant='primary' size="lg" type='submit' className='mx-2 mt-2 col-8 col-md-4'>
							Apply
						</Button>
                        
                    {incommingMessage && <p className='text-success'>{incommingMessage}</p>}
                </Form>




            
        </Row>
    </div>
  )
}

export default ProfilePage