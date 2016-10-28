import React from 'react';
import Square from './Square';

const Board = ({board, userPick}) => (
	<div className="board">
		{board.map((square,i) =>(
				<Square 
					key={i} 
					value={square} 
					i={i} 
					userPick={userPick} 
				/>
			)
		)}
	</div>
);

export default Board;