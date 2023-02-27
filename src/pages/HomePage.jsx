import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import TestimonialsCarousel from "../components/HomeCarousel";

import iconsCloud from '../data/icons.json'

// import iconsCloud from '../data/icons.json'

function HomePage() {
  return (
    <div className="container" style={{overflow:"auto"}}>
      {/* Header Section */}
      <section className="header-section my-5">
          <Container className="pb-5">
            <Row>
              <Col md={7}>
                <h1 className="col-11 my-md-5 my-4" style={window.innerWidth < 450 ? {fontSize:"30px"} : {fontSize:"45px"}}> <strong>FOODIE:</strong> the e-commerce platform designed for chefs and culinary entrepreneurs who want to take their food business to the next level.</h1>
                <Button size="lg" className="px-4" variant="primary" href="/signup">Open an Account</Button>
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
                <h2>Features and Benefits of FOODIE</h2>
                <h5>Here, you can easily create an online store for your food products and reach more customers everywhere. The platform offers a variety of tools and features, such as the ability to customize your online store, manage your products and orders, and offer flexible payment and delivery options. In addition, FOODIE also allows you to generate a unique QR code and URL for your online store, making it easy for your customers to find and purchase your products. With FOODIE, you have everything you need to successfully and efficiently grow your culinary business online.</h5>
              </Col>
            </Row>
          </Container>
        </section>

         {/* Membership Plans Section */}
        <section className="membership-section my-5">
          <Container>
            <Row className="d-flex justify-content-around">
              <Col md={4} className="card py-4 cardBg">
                <h3>Free Plan</h3>
                <h5>-</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Up to 10 products</li>
                  <li className="list-group-item">Monthly sales up to $500</li>
                  <li className="list-group-item">ads on store</li>
                  <li className="list-group-item">Zelle and cash payments accepted</li>
                  <li className="list-group-item">5% commission fees</li>
                </ul>
                <Button variant="primary"  className="my-3">Select Plan</Button>
              </Col>
              <Col md={4} className="card py-4 cardBg">
                <h3>Basic Plan</h3>
                <h5>$5</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Up to 50 products</li>
                  <li className="list-group-item">Monthly sales up to $2,000</li>
                  <li className="list-group-item">No ads</li>
                  <li className="list-group-item">PayPal and credit card payment options</li>
                  <li className="list-group-item">2% commission fees</li>
                </ul>
                <Button variant="primary" className="my-3">Select Plan</Button>
              </Col>
              <Col md={4} className="card py-4 cardBg">
                <h3>Premium Plan</h3>
                <h5>$10</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Unlimited products</li>
                  <li className="list-group-item">Unlimited sales</li>
                  <li className="list-group-item">No ads</li>
                  <li className="list-group-item">PayPal and credit card payment options</li>
                  <li className="list-group-item">1% commission fees</li>
                </ul>
                <Button variant="primary"  className="my-3">Select Plan</Button>
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
