import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { Carousel, Container, Row, Col } from "react-bootstrap";
import testimonials from "../data/testimonials.json";

const TestimonialsCarousel = () => {
  const {language:lang} = useContext(AuthContext);

    return (
        <section id="testimonios" className="py-2">
          <Container>
            <Row className="mb-1">
              <Col>
                <h2 className="text-center mb-1 fw-bold text-danger">Testimonials</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Carousel interval={10000} pauseonhover='true' indicators={false} className="col-md-7 col-11 mx-auto">
                  {testimonials.map((testimonio) => (
                    <Carousel.Item key={testimonio._id} >

                      <div className="d-flex flex-column">
                        <div className="col-12 my-3">
                            <img
                                className="d-block mx-auto border border-dark border-4 rounded-circle"
                                src={testimonio.image}
                                alt={testimonio.business}
                            />
                        </div>
                        <h5>{testimonio.txt[lang]}</h5>
                        <p>{testimonio.business[lang]}</p>
                      
                      </div>
                      
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </section>
      );
};

export default TestimonialsCarousel;
