import React from 'react';

const Message = ({messageShorthand}) => {
	console.log('messageShorthand', messageShorthand)
	var messageContent;
	switch(messageShorthand){
		case "XorO":
			messageContent = (
				<h3>
					Play
					<button>X</button>
					or
					<button>O</button>
					?
				</h3>
			);
			break;
		case "compTurn":
			messageContent = (
				<h3>Computer's Turn</h3>
			);
			break;
		case "userTurn":
			messageContent = (
				<h3>Your Turn</h3>
			);
			break;
		case "XorO":
			messageContent = (
				<h3>
					Congratulations! You won!
					<button>Play Again?</button>
				</h3>
			);
			break;
		case "XorO":
			messageContent = (
				<h3>
					Tie Game. 
					<button>Play Again?</button>
				</h3>
			);
			break;
		case "XorO":
			messageContent = (
				<h3>
					The Computer won. 
					<button>Play Again?</button>
				</h3>
			);
			break;
		default:
			messageContent = (
				<h3>Default</h3>
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