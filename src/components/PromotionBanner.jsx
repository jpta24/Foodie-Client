import PromotionCard from './PromotionCard';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

const PromotionBanner = ({
	maxHeight,
	business,
	currency,
	lang,
	businessHighlightedProducts,
	dnd = false,
	promDnd,
	handlePromoDragEnd,
}) => {
	console.log();
	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handlePromoDragEnd}
		>
			<div
				className='promotions d-flex flex-column align-items-center h4 pb-5'
				style={maxHeight ? { maxHeight: '100vh' } : { display: 'flex' }}
			>
				<SortableContext
					items={promDnd || businessHighlightedProducts.highlightedProducts}
					strategy={horizontalListSortingStrategy}
				>
					<span>{languages[0][lang].business.bestSeller}</span>
					{businessHighlightedProducts.highlightedProducts
						.map((id) =>
							business.products.find((product) => product._id === id)
						)
						.map((product) => {
							return (
								<PromotionCard
									key={uuidv4()}
									product={product}
									currency={currency}
									dnd={dnd}
								/>
							);
						})}
					{/* 
					{business.products
						.filter((prod) =>
							businessHighlightedProducts.highlightedProducts.includes(prod._id)
						)
						.map((product) => {
							return (
								<PromotionCard
									key={uuidv4()}
									product={product}
									currency={currency}
									dnd={dnd}
								/>
							);
						})} */}
				</SortableContext>
			</div>
		</DndContext>
	);
};

export default PromotionBanner;
