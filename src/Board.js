import React from 'react';


const Board = (props) => 
		(
			<div className="board">
				{props.board.map((square,i) =>(
							<p key={i}> square {square} </p>
					)
				)}
			</div>
		)

export default Board;
