import React from 'react';
import './Score.css';

const Score = ({label, score}) => (
	<div className="score">
		<h4>
			{label}<br />
			{score}
		</h4>
	</div>
)

export default Score;