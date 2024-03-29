import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { Row, Col, Image, Button, Carousel } from 'react-bootstrap';
import Footer from '../components/Footer';
import TestimonialsCarousel from '../components/HomeCarousel';
import MembershipTable from '../components/MembershipTable';
import CookiesComponent from '../components/CookiesComponent';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import { getAPI } from '../utils/api';
import HomeStores from '../components/HomeStores';
import { v4 as uuidv4 } from 'uuid';
import homeImg1 from '../assets/Imagen1.png';
import homeImg2 from '../assets/Imagen2.png';
import homeImg3 from '../assets/Imagen3.png';
import homeImg4 from '../assets/Imagen4.png';
import homeImg5 from '../assets/Imagen5.png';

import { listenerResize } from '../utils/functions';

function HomePage() {
	const { language: lang, user: userID } = useContext(AuthContext);
	const navigate = useNavigate();
	const initialState = {
		membership: {
			plan: 'x',
			usedTrial: false,
		},
		name: null,
	};

	const [business, setBusiness] = useState(initialState);

	const btnFunctionMembership = (string) => {
		if (business.name) {
			let businessNameEncoded = business.name.split(' ').join('-');
			navigate(`/memberships/${businessNameEncoded}`);
		} else if (userID) {
			navigate(`/create-business`);
		} else {
			navigate(`/signup`);
		}
	};

	useEffect(() => {
		if (userID) {
			const url = `users/home/${userID._id}`;
			const thenFunction = (response) => {
				if (response.data.name) {
					setBusiness(response.data);
				}
			};
			getAPI(url, thenFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userID]);

	// const images = [
	// 	iconsCloud[0].homeImg1,
	// 	iconsCloud[0].homeImg2,
	// 	iconsCloud[0].homeImg3,
	// 	iconsCloud[0].homeImg4,
	// 	iconsCloud[0].homeImg5,
	// ];
	const images = [homeImg1, homeImg2, homeImg3, homeImg4, homeImg5];
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		listenerResize(setIsMobile, 450);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div
			className={`container-fluid content-container`}
			style={{ overflow: 'auto' }}
		>
			<div className='col-10 mx-auto'>
				{/* Header Section */}
				<section className='header-section my-5'>
					<div className='pb-3'>
						<Row>
							<Col lg={7}>
								<h1
									className='col-11 my-md-5 my-4'
									style={isMobile ? { fontSize: '30px' } : { fontSize: '45px' }}
								>
									{' '}
									<strong className='text-danger foodie-title'>
										FOODYS:
									</strong>{' '}
									{languages[0][lang].home.slogan}
								</h1>
								<Button
									size='lg'
									className='px-4 mb-5'
									variant='primary'
									href='/signup'
								>
									{languages[0][lang].home.btnSlg}
								</Button>
							</Col>
							<Col lg={5} className='col-8 mx-auto col-lg-5'>
								<Carousel
									interval={5000}
									pauseonhover='true'
									indicators={false}
									controls={false}
									className='col-12 mx-auto mt-5 pb-2'
								>
									{images.map((image) => (
										<Carousel.Item key={uuidv4()}>
											<div className='col-12 my-1'>
												<img
													className='home-img'
													width={'100%'}
													src={image}
													alt='Foddie'
													loading='lazy'
												/>
											</div>
										</Carousel.Item>
									))}
								</Carousel>
								{/* <Image src={iconsCloud[0].homeImg} className='my-5 home-img' fluid /> */}
							</Col>
						</Row>
					</div>
				</section>

				{/* Features Stores*/}
				<section className='my-5 pb-3'>
					<HomeStores />
				</section>
				{/* Features Section */}
				<section className='features-section my-4'>
					<div>
						<Row className='d-flex justify-content-around pb-4'>
							<Col lg={4} className='col-6 col-lg-4'>
								<Image loading='lazy' src={iconsCloud[0].homeFeatures} fluid />
							</Col>
							<Col lg={7}>
								<h2 className='text-danger'>
									{languages[0][lang].home.feaTitle} FOODYS
								</h2>
								<h5>{languages[0][lang].home.feaContent}</h5>
							</Col>
						</Row>
					</div>
				</section>

				{/* Membership Plans Section */}
				<section className='my-5'>
					<MembershipTable
						btnFunction={btnFunctionMembership}
						business={business}
					/>
				</section>
				<div className='mt-5'>
					<TestimonialsCarousel />
				</div>
				<Footer />
				<CookiesComponent page={'home'} />
			</div>
		</div>
	);
}

export default HomePage;
