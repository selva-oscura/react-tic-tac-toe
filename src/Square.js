import React from 'react';

const Square = ({value, i, userPick}) => (
		<div className="square"
			onClick={() => {
				console.log('clicked', i);
				userPick(i);
			}
		}>
			<p>
				{i}, {value}
			</p>
		</div>
)

export default Square;