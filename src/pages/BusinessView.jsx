import { useState, useContext,useEffect } from 'react';
import {  useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo';
import { Modal,Button } from 'react-bootstrap';

import { toast } from 'react-toastify';
import BusinessViewCard from '../components/BusinessViewCard';

import iconsCloud from '../data/icons.json'
import languages from '../data/language.json'
import Loading from '../components/Loading';

const BusinessView = () => {
	const {language:lang} = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const { businessName } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken"); 

    let businessNameEncoded = businessName.split(' ').join('-')

    const [business, setBusiness] = useState('')

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
        .then(response=>{
            setBusiness(response.data.business)
        })
        .catch((error) => {
            console.log({error});
            // eslint-disable-next-line no-lone-blocks
            {window.innerWidth < 450 ? 
              toast.error(`${languages[0][lang].tostify.redirect}`, {
                  position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
              }) : toast.error(`${languages[0][lang].tostify.redirect}`, { theme: 'dark' });}
            navigate('/')
            })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const modalInitialState = {
        show:false,
        businessName:'',
        businessID:''
    }

    const [show, setShow] = useState(modalInitialState)

    const handleClose = () => setShow(modalInitialState);
    const handleModal = (businessName,businessID) => {
        setShow({show:true,businessName,businessID})
    }
    const deleteBusiness =()=>{
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/business/delete/${show.businessID}`,  {headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => {
            //     return axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${businessNameEncoded}`,{headers: {Authorization: `Bearer ${storedToken}`}})
            // }).then(response=>{
            //     setBusiness(response.data.business)
            //     setShow(modalInitialState)
            navigate(`/dashboard/${user._id}`)
            }).catch((error) => {
                console.log(error);
                const errorDescription = error.response.data.message;
                toast.error(errorDescription, { theme: 'dark' });
                // eslint-disable-next-line no-lone-blocks
                {window.innerWidth < 450 ? 
                    toast.error(errorDescription, {
                        position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                    }) : toast.error(errorDescription, { theme: 'dark' });}
            });
    }
    
    if (business!=='') {
        if(business.owner !== user._id){
            navigate('/')
        }
        const link = `https://foodie-de.netlify.app/${business.name}`

        let arrCategories = []
        if (business.products) {
            business.products.forEach(prod=>{
                prod.categories.forEach(cate=>{
                    if(!arrCategories.includes(cate)){
                    arrCategories.push(cate) 
                    // initialMenu[cate]=false
                    } 
                })
            })
        }

        const download = () => {
            const canvas = document.getElementById("react-qrcode-logo");
            if (canvas) {
              const pngUrl = canvas
                .toDataURL("image/png");
              let downloadLink = document.createElement("a");
              downloadLink.href = pngUrl;
              downloadLink.download = `qrBusiness.png`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }
          };
          

        let formatsArr = []
        
        Object.entries(business.format).forEach(format=>{
            if(format[1]){
                formatsArr.push(format[0])
            }
        })

        let typesArr = []
        
        Object.entries(business.type).forEach(type=>{
            if(type[1]){
                typesArr.push(type[0])
            }
        })


        return (
    
            <div className='container-fluid'>
                <div className="row p-0">
                    <div className="d-flex align-items-end justify-content-center" 
                    style={{  
                        backgroundImage: `url('${business.bgUrl}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '150px'
                        }}>
                        
                        <div className='rounded-circle border border-dark bg-dark d-flex justify-content-center align-items-center' style={{  
                            height: '90px',
                            width: '90px'
                        }}>
                           <img src={business.logoUrl} alt='altLogo' width={65}  /> 
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 d-flex flex-row my-2 justify-content-center">
                    <div className='col-6 d-flex justify-content-start flex-column align-items-start' >
                        <div className="d-flex justify-content-between col-12">
                            <h1 className='text-start'>{business.name}</h1>
                            <div>
                                <Link to={`/edit-business/${businessNameEncoded}`}>
                                    <span style={{cursor:"pointer"}}  className='mx-1'>🖊</span>
                                </Link>
                                <span style={{cursor:"pointer"}} className='mx-1' 
                                    onClick={()=>{handleModal(business.name,business._id)}}
                                >❌</span>
                            </div>
                            
                        </div>
                        
        
                        <p className='text-start'>{`${business.address.street}, ${business.address.city}, ${business.address.country }`}</p>
                        <span>{languages[0][lang].businessView.delivery}</span>
                        <div className='d-flex'>
                             {formatsArr.map(format => {
                                return <span key={format} className="badge rounded-pill bg-danger m-1" >{format}</span>
                                    })} 
                        </div>
                        <span>{languages[0][lang].businessView.products}</span>
                        <div className='d-flex'>
                             {typesArr.map(type => {
                                return <span key={type} className="badge rounded-pill bg-primary m-1" >{type}</span>
                                    })} 
                        </div>
                    </div>
                    <div className="p-1 col-6 m-auto" style={{
                            width: '190px'
                        }}>
                        <div className="border border-dark shadow-lg">
                            <Link to={`/${business.name}`}>
                                <QRCode value={`https://foodie-de.netlify.app/${business.name}`} size='150' logoImage={business.logoUrl} enableCORS={true} removeQrCodeBehindLogo='true' qrStyle='dots' ecLevel='H' />
                            </Link>
                        </div>
                        <Button  className='btn btn-secondary m-1 btn-sm' onClick={() =>  download()}>Download</Button>
                        <Button  className='btn btn-secondary m-1 btn-sm' onClick={() =>  {
                            navigator.clipboard.writeText(link)
                            // eslint-disable-next-line no-lone-blocks
                            {window.innerWidth < 450 ? 
                            toast.success(`${languages[0][lang].tostify.copy}`, {
                                position: toast.POSITION.BOTTOM_CENTER, theme: 'dark'
                            }) : toast.success(`${languages[0][lang].tostify.copy}`, { theme: 'dark' });}
                            
                            
                            }}>{languages[0][lang].businessView.copy}</Button>
                    </div>     
                    </div>
                    
                </div>
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 d-flex justify-content-start flex-column align-items-start">
                        <span>{languages[0][lang].businessView.categories}</span>
                        <div className='d-flex flex-wrap'>
                        
                             {arrCategories.map(cat => {
                                return <span key={cat} className="badge rounded-pill bg-success m-1">{cat}</span>
                                    })}
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-row my-2 justify-content-center">
                    <div className="col-md-8 col-12 d-flex justify-content-start align-items-start">
                        <BusinessViewCard href={`/${businessNameEncoded}/products`} button='Products' src={iconsCloud[0].products} />
                        <BusinessViewCard href={`/${businessNameEncoded}/employees`} button='Employees' src={iconsCloud[0].employeeManage} />
                        <BusinessViewCard href={`/${businessNameEncoded}/orders`} button='Orders' src={iconsCloud[0].orders} />
                    </div>
                </div>
                <Modal
                show={show.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{languages[0][lang].businessView.mTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {`${languages[0][lang].business.mBody1} "${show.businessName}" ${languages[0][lang].businessView.mbody2}`} <br/>
                   {languages[0][lang].business.mBody3}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                {languages[0][lang].business.btnCancel}
                </Button>
                <Button variant="danger" onClick={deleteBusiness}>
                {languages[0][lang].business.btnDelete}
                </Button>
                </Modal.Footer>
            </Modal>

            </div>
          )
    } else {
        return (
            <div><Loading/></div>
        )
    }
    
}

export default BusinessView