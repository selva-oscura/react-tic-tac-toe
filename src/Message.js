import React from 'react';
import './Message.css';

const Message = ({messageShorthand, updateUserIcon, playAgain}) => {
	var messageContent;
	switch(messageShorthand){
		case "XorO":
			messageContent = (
				<h3>
					Play
					<button
						onClick={() => {
							updateUserIcon("X");
						}
					}>
						X
					</button>
					or
					<button
						onClick={() => {
							updateUserIcon("O");
						}
					}>
						O
					</button>
					?
				</h3>
			);
			break;
		case "userTurn":
			messageContent = (
				<h3 className="left-align">Your Turn</h3>
			);
			break;
		case "compTurn":
			messageContent = (
				<h3 className="right-align">Computer's Turn</h3>
			);
			break;
		case "userWin":
			messageContent = (
				<h3>
					Congrats! You won!<br />
					<button
						onClick={() => {
							playAgain();
						}
					}>
						Play Again?
					</button>
				</h3>
			);
			break;
		case "tie":
			messageContent = (
				<h3>
					Tie Game. 
					<button
						onClick={() => {
							playAgain();
						}
					}>
						Play Again?
					</button>
				</h3>
			);
			break;
		case "compWin":
			messageContent = (
				<h3>
					The Computer won. 
					<button
						onClick={() => {
							playAgain();
						}
					}>
						Play Again?
					</button>
				</h3>
			);
			break;
		default:
			messageContent = (
				<h3>Erk....  default message....</h3>
			);
			break;
	}
	return (
		<div className="message">
			{messageContent}
		</div>
	)
}

export default Message;