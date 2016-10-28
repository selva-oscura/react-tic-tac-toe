import React from 'react';

const Token = ({playerToken}) => {
	var token;
	if(playerToken === 1){
		token = "X";
	}
	else if(playerToken === -1){
		token = "O";
	}else{
		token = " ";
	}
	return(
		<h3>{token}</h3>
	)
}

export default Token;