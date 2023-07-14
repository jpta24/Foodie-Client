import TestComponent from '../components/TestComponent';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';


function Test() {
	const [people, setPeople] = useState([
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Sarah' },
		{ id: 3, name: 'Paul' },
	]);
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
	return (
		<div className='flex justify-center items-center'>
			<div className='w-4/6'>
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

export default Test;
