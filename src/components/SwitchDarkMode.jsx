
function SwitchMode({isDark,handleMode}) {
	return (
		<div
			className={`switch-container slide-transitio my-1 ${
				isDark ? 'switch-dark' : 'switch-light'
			}`}
			style={{ position: 'relative' }}
		>
			<div
				className={`slider ${isDark ? 'slider-dark' : 'slider-light'}`}
				onClick={()=>handleMode(!isDark)}
			>
				{isDark ? '☀' : '🌙'}
			</div>
		</div>
	);
}

export default SwitchMode;