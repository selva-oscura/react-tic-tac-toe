import React from 'react';
import Token from './Token';
import './Square.css';

const Square = ({value, i, userIcon, userPick}) => (
		<div className="square"
			onClick={() => {
				userPick(i);
			}
		}>
			<Token 
				playerToken={value} 
				userIcon={userIcon}
			/>
		</div>
)

export default Square;
