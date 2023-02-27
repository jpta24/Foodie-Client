import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-1">
    <hr />
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Germany, Berlin 10787</li>
              <li>info@foodie.de</li>
              <li>0175-364-3399</li>
            </ul>
          </Col>
          <Col md={4} className="">
            <h5>Follow Us</h5>
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
            <h5>Terms of Service</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms and Conditions</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
