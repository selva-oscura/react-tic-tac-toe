import React from 'react';
import Score from './Score';
import './Scores.css';

const Scores = ({scores}) => (
	<div className="scores">
		<Score 
			label="Player"
			score={scores.userWins}
		/>
		<Score 
			label="Ties"
			score={scores.ties}
		/>
		<Score 
			label="Computer"
			score={scores.computerWins}
		/>
	</div>
);

export default Scores;
