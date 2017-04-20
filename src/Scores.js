import React from 'react';
import './Scores.css';

const Scores = ({scores}) => (
	<div className="scores">		
			<div>
				<h4>
					Player<br />
					{scores.userWins}
				</h4>
			</div>
			<div>
				<h4>
					Ties<br />
					{scores.ties}
				</h4>
			</div>
			<div>
				<h4>
					Computer<br />
					{scores.computerWins}
				</h4>
			</div>
	</div>
)

export default Scores;