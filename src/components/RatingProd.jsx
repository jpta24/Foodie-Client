import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const RatingProd = ({rating}) => {

    const roundRating = (rating) => {
        const decimalPart = rating - Math.floor(rating);
        
        if (decimalPart <= 0.25) {
          return Math.floor(rating);
        } else if (decimalPart <= 0.75) {
          return Math.floor(rating) + 0.5;
        } else {
          return Math.ceil(rating);
        }
      };
      const roundedRating = roundRating(rating);
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating - fullStars === 0.5;

  return (
    <div className='mx-3'>
    {Array.from({ length: fullStars }, (_, index) => (
      <BsStarFill key={index} color="red" />
    ))}
    {halfStar && <BsStarHalf color="red" />}
    {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }, (_, index) => (
      <BsStar key={index} color="black" />
    ))}
  </div>
  )
}

export default RatingProd