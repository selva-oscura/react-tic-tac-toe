import React from 'react';

const Token = ({userIcon, playerToken}) => {
	var token;
	// user is always playerToken 1; computer is always playerToken -1;
	
	// display X if user chose X and playerToken is 1 or if user chose O and playerToken is -1
	if((playerToken === 1 && userIcon === "X") || (playerToken === -1 && userIcon === "O")){
		token = "X";
	}
	
	// display O if user chose O and playerToken is 1 or if user chose X and playerToken is -1
	else if((playerToken === 1 && userIcon === "O") || (playerToken === -1 && userIcon === "X")){
		token = "O";

	// if no playerToken in a space, leave blank
	}else{
		token = " ";
	}
	return(
		<h3>{token}</h3>
	)
}

export default Token;