import React, { useState } from 'react';

function SwitchMode() {
	const [isDark, setIsDark] = useState(true);
	const handleToggle = () => {
		setIsDark(!isDark);
	};
	return (
		<div
			className={`switch-container slide-transitio my-auto ${
				isDark ? 'switch-dark' : 'switch-light'
			}`}
			style={{ position: 'relative' }}
		>
			<div
				className={`slider ${isDark ? 'slider-dark' : 'slider-light'}`}
				onClick={handleToggle}
			>
				{isDark ? '☀' : '🌙'}
			</div>
		</div>
	);
}

export default SwitchMode;