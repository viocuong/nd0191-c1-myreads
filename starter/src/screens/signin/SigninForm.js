import { useState } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../../common/SecondaryButton';

const initialSigninState = {
	username: '',
	password: '',
};

export const SigninForm = ({ onSignin }) => {
	const [credentials, setCredentials] = useState(initialSigninState);

	const handleChangeUsername = (event) => {
		setCredentials({ ...credentials, username: event.target.value });
	};

	const handleChangePassword = (event) => {
		setCredentials({ ...credentials, password: event.target.value });
	};

	const signin = (event) => {
		event.preventDefault();
		onSignin(credentials);
		setCredentials(initialSigninState);
	};

	return (
		<form onSubmit={signin} className='signin-form-container'>
			<input
				onChange={handleChangeUsername}
				value={credentials.username}
				className='signin-form-input'
				placeholder='username'
			/>
			<input
				onChange={handleChangePassword}
				type='password'
				value={credentials.password}
				className='signin-form-input'
				placeholder='password'
			/>
			<p className='signup-link'>
				Don't have an account yet?,{' '}
				<Link to={'/signup'}>Sign up now</Link>
			</p>
			<PrimaryButton title='sign in' />
		</form>
	);
};

SigninForm.propTypes = {
	onSignin: PropType.func.isRequired,
};
