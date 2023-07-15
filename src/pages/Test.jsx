import TestComponent from '../components/TestComponent';
import { useState, useContext, useEffect } from 'react';
import { putAPI } from '../utils/api';
import { AuthContext } from '../context/auth.context';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';

function Test() {
	const { user: userID, language: lang } = useContext(AuthContext);
	// const [user, setUser] = useState('');
	const [people, setPeople] = useState('')

	useEffect(() => {
		if (userID) {
			const businessStored = localStorage.getItem('businesses')
			? JSON.parse(localStorage.getItem('businesses'))
			: [];

		const url = `users/visitedBusiness/${userID._id}`;
		const thenFunction = (response) => {
			// console.log(response.data.visitedBusiness.map(buz=>{return{name:buz.name,_id:buz._id}}));
			setPeople(response.data.visitedBusiness.map(buz=>{return{name:buz.name,id:buz._id}}));
		};
		putAPI(url, businessStored, thenFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userID]);

	// const [people, setPeople] = useState([
	// 	{ id: 1, name: 'John' },
	// 	{ id: 2, name: 'Sarah' },
	// 	{ id: 3, name: 'Paul' },
	// ]);
	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!active.id !== over.id) {
			setPeople((people) => {
				const oldIndex = people.findIndex((person) => person.id === active.id);
				const newIndex = people.findIndex((person) => person.id === over.id);

				return arrayMove(people, oldIndex, newIndex);
			});
		}
	};
	if (people) {
		// console.log(user);
		return (
			<div className='flex justify-center items-center'>
				<div className=''>
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<h1 className='text-2xl font-bold'>Users List</h1>
						<SortableContext
							items={people}
							strategy={verticalListSortingStrategy}
						>
							{people.map((user) => (
								<TestComponent key={user.id} user={user} />
							))}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		);
	}
}

export default Test;
