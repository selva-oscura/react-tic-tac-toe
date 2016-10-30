import React from 'react';

const Scores = ({userScore, computerScore}) => (
	<div className="scores">		
			<div className="left">
				<h4>
					Player<br />
					{userScore}
					</h4>
			</div>
			<div className="right">
				<h4>
					Computer<br />
					{computerScore}
				</h4>
			</div>
	</div>
)

export default Scores;