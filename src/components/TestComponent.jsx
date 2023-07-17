import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';

function TestComponent({ user, dnd=false }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: user._id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return dnd ? (
		<div
			style={style}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className='bg-white p-2 rounded m-2 text-dark col-4'
		>
			<h1>{user.name}</h1>
		</div>
	) : (
		<Link to={'/'} className='bg-white p-2 rounded  m-2 text-dark col-4 '>
			<h1>{user.name}</h1>
		</Link>
	);
}

export default TestComponent;
