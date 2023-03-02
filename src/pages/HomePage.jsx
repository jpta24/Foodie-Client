import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import TestimonialsCarousel from "../components/HomeCarousel";


// import LanguageDetector from '../config/LanguageDetector';

import iconsCloud from '../data/icons.json'
import languages from '../data/language.json'

// import iconsCloud from '../data/icons.json'

function HomePage() {
  
  const {language:lang} = useContext(AuthContext);
  // const language = LanguageDetector.cacheUserLanguage();
  // const currency = LanguageDetector.options.getDetectedLanguage()['currency'];
  // console.log(`El idioma es: ${language} y la moneda es: ${currency}`);
  return (
    <div className="container" style={{overflow:"auto"}}>
      {/* Header Section */}
      <section className="header-section my-5">
          <Container className="pb-5">
            <Row>
              <Col md={7}>
                <h1 className="col-11 my-md-5 my-4" style={window.innerWidth < 450 ? {fontSize:"30px"} : {fontSize:"45px"}}> <strong>FOODIE:</strong> {languages[0][lang].home.slogan}</h1>
                <Button size="lg" className="px-4" variant="primary" href="/signup">{languages[0][lang].home.btnSlg}</Button>
              </Col>
              <Col md={5}>
                <Image src={iconsCloud[0].homeImg} className="my-5" fluid />
              </Col>
            </Row>
          </Container>
        </section>


        {/* Features Section */}
        <section className="features-section my-4">
          <Container>
            <Row className="d-flex justify-content-around pb-4">
              <Col md={4}>
                <Image src={iconsCloud[0].homeFeatures} fluid />
              </Col>
              <Col md={7}>
                <h2>{languages[0][lang].home.feaTitle} FOODIE</h2>
                <h5>{languages[0][lang].home.feaContent}</h5>
              </Col>
            </Row>
          </Container>
        </section>

         {/* Membership Plans Section */}
        <section className="membership-section my-5">
          <Container>
            <Row className="d-flex justify-content-around">
              <Col md={4} className="card py-4 cardBg">
                <h3>{languages[0][lang].home.freeTitle}</h3>
                <h5>-</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{languages[0][lang].home.free1}</li>
                  <li className="list-group-item">{languages[0][lang].home.free2}</li>
                  <li className="list-group-item">{languages[0][lang].home.free3}</li>
                  <li className="list-group-item">{languages[0][lang].home.free4}</li>
                  <li className="list-group-item">{languages[0][lang].home.free5}</li>
                </ul>
                <Button variant="primary"  className="my-3">{languages[0][lang].home.btnSelect}</Button>
              </Col>
              <Col md={4} className="card py-4 cardBg">
                <h3>{languages[0][lang].home.basicTitle}</h3>
                <h5>$5{languages[0][lang].home.perMon}</h5>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">{languages[0][lang].home.basic1}</li>
                  <li className="list-group-item">{languages[0][lang].home.basic2}</li>
                  <li className="list-group-item">{languages[0][lang].home.basic3}</li>
                  <li className="list-group-item">{languages[0][lang].home.basic4}</li>
                  <li className="list-group-item">{languages[0][lang].home.basic5}</li>
                </ul>
                <Button variant="primary"  className="my-3">{languages[0][lang].home.btnSelect}</Button>
              </Col>
              <Col md={4} className="card py-4 cardBg">
                <h3>{languages[0][lang].home.premTitle}</h3>
                <h5>$10{languages[0][lang].home.perMon}</h5>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">{languages[0][lang].home.prem1}</li>
                  <li className="list-group-item">{languages[0][lang].home.prem2}</li>
                  <li className="list-group-item">{languages[0][lang].home.prem3}</li>
                  <li className="list-group-item">{languages[0][lang].home.prem4}</li>
                  <li className="list-group-item">{languages[0][lang].home.prem5}</li>
                </ul>
                <Button variant="primary"  className="my-3">{languages[0][lang].home.btnSelect}</Button>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="my-5">
          <TestimonialsCarousel/>
        </div>
        
        <Footer/>
      {/* <div className="d-flex flex-column justify-content-between align-items-start col-12 m-" 
          style={{  
              backgroundImage: `url('/homeBg.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '558px',
          }}>
            <h1 className='m-5' style={{  
              fontSize:'5rem',
              fontWeight:'bolder',
          }}>Foodie!</h1>
          {window.innerWidth > 450 && 
          <h2 className='m-5 col-2' style={{  
                  fontSize:'2rem',
                  fontWeight:'bolder',
              }}>Create your Business and bring your clients to you!
              </h2>}
          <div>
            <div className="d-flex flex-column justify-content-around">
            <div></div>
              
            </div>
              
          </div>
        </div>
        {window.innerWidth < 450 && <>
          <h2 className='m-auto col-11' style={{  
                  fontSize:'1.5rem',
                  fontWeight:'bolder',
              }}>Create your Business and bring your clients to you!
              </h2>
              <Button href='/signup' size='lg' className='mx-2 my-3'>Sign Up</Button>
              <Button href='/login'  size='lg' variant='outline-primary' className='mx-2 my-3'>Log In</Button></>
              } */}
    </div>
  );
}

export default HomePage;
