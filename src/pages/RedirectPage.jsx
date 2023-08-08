import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Loading from '../components/Loading';
import iconsCloud from '../data/icons.json';

import { Card, Button } from 'react-bootstrap';
import RedirectCard from '../components/RedirectCard';
import languages from '../data/language.json';
import { putAPI } from '../utils/api';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';

const RedirectPage = () => {
	const { user: userID, language: lang } = useContext(AuthContext);
	const [user, setUser] = useState('');

	const [buzDnd, setBuzDnd] = useState('');
	const [dnd, setDnd] = useState(false);
	useEffect(() => {
		if(userID){
			const businessStored = localStorage.getItem('businesses')
			? JSON.parse(localStorage.getItem('businesses'))
			: [];
		const url = `users/visitedBusiness/${userID._id}`;
		const thenFunction = (response) => {
			setUser(response.data);
			setBuzDnd(response.data.visitedBusiness);
		};
		putAPI(url, businessStored, thenFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userID]);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!active.id !== over.id) {
			const oldIndex = buzDnd.findIndex((person) => person._id === active.id);
			const newIndex = buzDnd.findIndex((person) => person._id === over.id);
			setBuzDnd(arrayMove(buzDnd, oldIndex, newIndex))

			const url = `users/reorder/${userID._id}`;

			const thenFunction = (response) => {
				setUser(response.data);
			};
			const requestBody = {
				field: 'visitedBusiness',
				array: arrayMove(buzDnd, oldIndex, newIndex),
			};
			putAPI(url, requestBody, thenFunction);
		}
	};

	if (user) {
		return (
			<div className='container-fluid content-container'>
				<h1 className='m-2 text-danger'>{`${languages[0][lang].orders.hi} ${user.username},`}</h1>
				<h3 className='m-2'>{languages[0][lang].redirect.where}</h3>
				<div className='d-flex justify-content-around flex-wrap col-12 col-md-8 mx-auto'>
					<div className='d-flex flex-column-md flex-wrap align-items-center justify-content-around col-12 col-md-3 mx-auto'>
						<h4 className='col-12'>{languages[0][lang].redirect.dashboard}</h4>
						<Link
							className='card cardBg col-4 mx-1 my-2 p-1  mx-md-5 col-md-8'
							to={`/user-dashboard/${user._id}`}
						>
							<Card.Img
								className='p-1'
								variant='top'
								src={iconsCloud[0].dashboard}
							/>
							<Button variant='outline-primary' size='sm'>
								{languages[0][lang].redirect.personal}
							</Button>
						</Link>
						{user.business && (
							<Link
								className='card cardBg col-4 mx-1 my-2 p-1  mx-md-5 col-md-8'
								to={`/view-business/${user.business.name}`}
							>
								<Card.Img
									className='p-2'
									variant='top'
									src={iconsCloud[0].businessDashboard}
								/>
								<Button variant='outline-primary' size='sm'>
									{languages[0][lang].redirect.business}
								</Button>
							</Link>
						)}
					</div>
					<div className='col-md-7 col-11'>
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<div className='d-flex justify-content-between'>
								<h4 className='col-md-12'>{languages[0][lang].redirect.stores}</h4>
								<span
									style={{ fontSize: '10px', padding: '3px' }}
									className={`btn ${
										!dnd ? 'btn-outline-secondary' : 'btn-danger'
									} my-auto`}
									onClick={() => setDnd(!dnd)}
								>
									{languages[0][lang].redirect.reorder}
								</span>
							</div>

							<div
								className='my-2'
								style={{
									maxHeight: `${window.innerWidth < 450 ? '50vh' : '60vh'}`,
									overflow: 'auto',
								}}
							>
								<SortableContext
									items={buzDnd.map((i) => i._id)}
									strategy={verticalListSortingStrategy}
								>
									{buzDnd.map((buz) => (
										<RedirectCard key={buz._id} business={buz} dnd={dnd} />
									))}
								</SortableContext>
							</div>
						</DndContext>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<Loading />
			</div>
		);
	}
};

export default RedirectPage;
