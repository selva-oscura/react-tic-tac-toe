import React from 'react';

const Message = ({messageShorthand}) => {
	console.log('messageShorthand', messageShorthand)
	var messageContent;
	switch(messageShorthand){
		case 0:
			messageContent = "X or O choice needs to go here";
			break;
		default:
			messageContent = "Need to work up full list";
			break;
	}
	return (
		<div className="message">
			{messageContent}
		</div>
	)
}

export default Message;