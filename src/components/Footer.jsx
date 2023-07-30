import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import languages from '../data/language.json';

function Footer() {
	const { language: lang } = useContext(AuthContext);
	return (
		<footer className='py-1'>
			<hr />
			<div>
				<Row>
					<Col md={4}>
						<h5>{languages[0][lang].home.footer.contactus}</h5>
						<ul className='list-unstyled'>
							<li>{languages[0][lang].home.footer.country}, Berlin 10787</li>
							<li>info@foodie.de</li>
							<li>0175-364-3399</li>
						</ul>
					</Col>
					<Col md={4} className=''>
						<h5>{languages[0][lang].home.footer.followus}</h5>
						<ul className='list-unstyled d-flex justify-content-around col-6 mx-auto'>
							<li>
								<a
									href='https://www.facebook.com/foodie'
									target='_blank'
									rel='noopener noreferrer'
								>
									<FaFacebook className='fs-1' />
								</a>
							</li>
							<li>
								<a
									href='https://www.instagram.com/foodie'
									target='_blank'
									rel='noopener noreferrer'
								>
									<FaInstagram className='fs-1' />
								</a>
							</li>
							<li>
								<a
									href='https://api.whatsapp.com/send?phone=491753649395'
									target='_blank'
									rel='noopener noreferrer'
								>
									<FaWhatsapp className='fs-1' />
								</a>
							</li>
						</ul>
					</Col>
					<Col md={4}>
						<h5>{languages[0][lang].home.footer.terms}</h5>
						<ul className='list-unstyled'>
							<li>
								<Link to={'/private-policy'}>{languages[0][lang].home.footer.privacy}</Link>
							</li>
							<li>
								<Link href='#'>
									{languages[0][lang].home.footer.conditions}
								</Link>
							</li>
						</ul>
					</Col>
				</Row>
			</div>
		</footer>
	);
}

export default Footer;
