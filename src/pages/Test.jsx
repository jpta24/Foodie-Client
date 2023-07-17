import TestComponent from '../components/TestComponent';
import { useState, useContext, useEffect } from 'react';
import { putAPI } from '../utils/api';
import languages from '../data/language.json';
import { AuthContext } from '../context/auth.context';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	rectSwappingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';

function Test() {
	const { user: userID, language: lang } = useContext(AuthContext);
	const [user, setUser] = useState('');
	const [buzDnd, setBuzDnd] = useState('')
	const [dnd, setDnd] = useState(true)

	useEffect(() => {
		if (userID) {
			const businessStored = localStorage.getItem('businesses')
			? JSON.parse(localStorage.getItem('businesses'))
			: [];

		const url = `users/visitedBusiness/${userID._id}`;
		const thenFunction = (response) => {
			setUser(response.data)
			setBuzDnd(response.data.visitedBusiness);
		};
		putAPI(url, businessStored, thenFunction);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userID]);

	// const [buzDnd, setBuzDnd] = useState([
	// 	{ id: 1, name: 'John' },
	// 	{ id: 2, name: 'Sarah' },
	// 	{ id: 3, name: 'Paul' },
	// ]);
	const handleDragEnd = (event) => {
		const { active, over } = event;
		
		if (!active.id !== over.id) {
			setBuzDnd((buzDnd) => {
				const oldIndex = buzDnd.findIndex((person) => person._id === active.id);
				const newIndex = buzDnd.findIndex((person) => person._id === over.id);

				return arrayMove(buzDnd, oldIndex, newIndex);
				
			});
			setUser({...user,visitedBusiness:buzDnd})
		}
	};
	if (buzDnd) {
		// console.log(user);
		return (
				<div className='col-12 mx-auto'>
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<h1 className=''>Users List</h1>
						<span style={{fontSize:'10px',padding:'3px'}} className='btn btn-outline-secondary' onClick={()=>setDnd(!dnd)}>{languages[0][lang].redirect.reorder}</span>
						<div className='d-flex flex-wrap justify-content-center'>
							<SortableContext
							items={buzDnd.map((i) => i._id)}
							strategy={rectSwappingStrategy}
						>
							{buzDnd.map((user) => (
								<TestComponent key={user._id} user={user} dnd={dnd} />
							))}
						</SortableContext>
						</div>
						
					</DndContext>
				</div>
		);
	}
}

export default Test;
