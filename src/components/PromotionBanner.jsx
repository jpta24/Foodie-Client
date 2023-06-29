import React from 'react';
import PromotionCard from './PromotionCard';
import languages from '../data/language.json';

import { v4 as uuidv4 } from 'uuid';

const PromotionBanner = ({
	maxHeight,
	business,
	currency,
	lang,
	businessHighlightedProducts,
}) => {
	return (
		<div className='promotions d-flex flex-column align-items-center h4 pb-5'>
			<span>{languages[0][lang].business.bestSeller}</span>

			{business.products
				.filter((prod) =>
					businessHighlightedProducts.highlightedProducts.includes(prod._id)
				)
				.sort((x, y) => {
					const indexX =
						businessHighlightedProducts.highlightedProducts.indexOf(x._id);
					const indexY =
						businessHighlightedProducts.highlightedProducts.indexOf(y._id);
					return indexX - indexY;
				})
				.map((product) => {
					return (
						<PromotionCard
							key={uuidv4()}
							product={product}
							currency={currency}
						/>
					);
				})}
		</div>
	);
};

export default PromotionBanner;
