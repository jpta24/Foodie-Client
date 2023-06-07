import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Row, Col, Image } from 'react-bootstrap';

import iconsCloud from '../data/icons.json'
import languages from '../data/language.json'

const About = () => {
  const {language:lang,isDark} = useContext(AuthContext);
  return (
    <Container className={`my-5`}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center">
          <Image src={iconsCloud[0].jean} alt="MyPhoto" fluid roundedCircle className='border border-dark border-4 rounded-circle' />
        </Col>
        <Col xs={12} md={8}>
            <h2 className={`fw-bold text-start ${isDark ? 'text-danger':''}`}>{languages[0][lang].aboutus.greeting}</h2>
            <p className='h5 text-start pt-2'>{languages[0][lang].aboutus.aboutText1}

            <br/><br/>

            {languages[0][lang].aboutus.aboutText2}
            
            <br/><br/>

            {languages[0][lang].aboutus.aboutText3}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
