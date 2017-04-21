import React from 'react';

const Score = ({label, score}) => (
	<div className="score">
		<h4>
			{label}<br />
			{score}
		</h4>
	</div>
)

export default Score;