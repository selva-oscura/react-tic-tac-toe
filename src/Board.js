import React from 'react';
import './Board.css';
import Square from './Square';

const Board = ({board, userIcon, userPick}) => (
	<div className="board">
		{board.map((square,i) =>(
				<Square 
					key={i} 
					value={square} 
					i={i} 
					userIcon={userIcon}
					userPick={userPick} 
				/>
			)
		)}
	</div>
);

export default Board;