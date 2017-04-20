import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({errorMessage}) => (
	<div className='error-message'>
		<p>{errorMessage}</p>
	</div>
)

export default ErrorMessage;