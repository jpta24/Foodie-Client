import React, { useState } from 'react';

const ProdDetailsExpandText = ({ text }) => {
	const [expanded, setExpanded] = useState(false);

	const handleToggle = () => {
		setExpanded(!expanded);
	};
	// console.log(text.length);
	return (
		<p className={`p-expansible ${expanded ? 'expanded' : ''}`}>
			{/* {text} */}
			{/* {text.length > 140 ? <>
                <span>{text.slice(0,140)}</span>...<span className='read-more' onClick={handleToggle}>
				{expanded ? 'read less' : 'read more'}
			</span>
            </>:<span>{text}</span>} */}
			{text.length > 140 && !expanded ? (
				<span>{`${text.slice(0, 140)}... `}</span>
			) : (
				<span>{text}</span>
			)}
			{text.length > 140 && <span className='read-more' onClick={handleToggle}>
				{expanded ? ' read less' : ' read more'}
			</span>}
		</p>
	);
};

export default ProdDetailsExpandText;
