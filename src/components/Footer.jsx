import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import languages from '../data/language.json'

function Footer() {
  const {language:lang} = useContext(AuthContext);
  return (
    <footer className="py-1">
    <hr />
      <Container>
        <Row>
          <Col md={4}>
            <h5>{languages[0][lang].home.footer.contactus}</h5>
            <ul className="list-unstyled">
              <li>{languages[0][lang].home.footer.country}, Berlin 10787</li>
              <li>info@foodie.de</li>
              <li>0175-364-3399</li>
            </ul>
          </Col>
          <Col md={4} className="">
            <h5>{languages[0][lang].home.footer.followus}</h5>
            <ul className="list-unstyled d-flex justify-content-around col-6 mx-auto">
              <li>
                <Link href="#">
                  <FaFacebook className="fs-1" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaInstagram className="fs-1"/>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaWhatsapp className="fs-1"/>
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>{languages[0][lang].home.footer.terms}</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#">{languages[0][lang].home.footer.privacy}</Link>
              </li>
              <li>
                <Link href="#">{languages[0][lang].home.footer.conditions}</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
