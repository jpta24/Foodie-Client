import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import iconsCloud from '../data/icons.json'

const About = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center">
          <Image src={iconsCloud[0].jean} alt="MyPhoto" fluid roundedCircle className='border border-dark border-4 rounded-circle' />
        </Col>
        <Col xs={12} md={8}>
            <h2 className='fw-bold text-start'>¡Hi! I'm Jean Pierre</h2>
            <p className='h5 text-start pt-2'>I'm a retired US Marine Corps Officer turned Civil Engineer, and now a Full Stack Web and Native App Developer. I have a strong leadership background and have led multidisciplinary teams throughout my career. My skillset includes effective communication, team collaboration, logical thinking, and project management.

            <br/><br/>

            Originally from Venezuela, I am currently based in Berlin, Germany, where I continue to pursue my passion for developing innovative solutions and creating engaging user experiences. I strive to approach each project with a combination of creativity and analytical thinking, and I am always eager to learn and improve my skills.
            <br/><br/>

            Whether you're looking to build a new website, launch a mobile app, or tackle a complex engineering project, I'm here to help bring your ideas to life. Let's work together to build something great!</p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
