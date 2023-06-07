import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import TestimonialsCarousel from '../components/HomeCarousel';
import MembershipTable from '../components/MembershipTable';

import iconsCloud from '../data/icons.json';
import languages from '../data/language.json';
import { getAPI } from '../utils/api';

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
			navigate(`/${businessNameEncoded}/memberships`);
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
	return (
		<div className={`container`} style={{ overflow: 'auto' }}>
			{/* Header Section */}
			<section className='header-section my-5'>
				<Container className='pb-5'>
					<Row>
						<Col md={7}>
							<h1
								className='col-11 my-md-5 my-4'
								style={
									window.innerWidth < 450
										? { fontSize: '30px' }
										: { fontSize: '45px' }
								}
							>
								{' '}
								<strong className='text-danger'>FOODIE:</strong> {languages[0][lang].home.slogan}
							</h1>
							<Button
								size='lg'
								className='px-4'
								variant='primary'
								href='/signup'
							>
								{languages[0][lang].home.btnSlg}
							</Button>
						</Col>
						<Col md={5}>
							<Image src={iconsCloud[0].homeImg} className='my-5' fluid />
						</Col>
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className='features-section my-4'>
				<Container>
					<Row className='d-flex justify-content-around pb-4'>
						<Col md={4}>
							<Image src={iconsCloud[0].homeFeatures} fluid />
						</Col>
						<Col md={7}>
							<h2 className='text-danger'>{languages[0][lang].home.feaTitle} FOODIE</h2>
							<h5>{languages[0][lang].home.feaContent}</h5>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Membership Plans Section */}
			<section className='my-5'>
				<MembershipTable
					btnFunction={btnFunctionMembership}
					business={business}
				/>
			</section>
			<div className='my-5'>
				<TestimonialsCarousel />
			</div>

			<Footer />
		</div>
	);
}

export default HomePage;
