import React from 'react';
import Token from './Token';

const Square = ({value, i, userPick}) => (
		<div className="square"
			onClick={() => {
				console.log('clicked', i);
				userPick(i);
			}
		}>
			<Token playerToken={value} />
		</div>
)

export default Square;
