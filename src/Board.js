import React from 'react';
import Square from './Square';

const Board = (props) => 
		(
			<div className="board">
				{props.board.map((square,i) =>(
						<Square key={i} square={square} />
					)
				)}
			</div>
		)

export default Board;