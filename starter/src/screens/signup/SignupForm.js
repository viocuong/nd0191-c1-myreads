import { useState } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton';
import PropType from 'prop-types';

const initialSigninState = {
	username: '',
	password: '',
	confirmPassword: '',
};

export const SignupForm = ({ onSignup }) => {
	const [credentials, setCredentials] = useState(initialSigninState);
	const [error, setError] = useState(); // error = 'not_enter' | 'confirm_pass_wrong'

	const handleChangeUsername = (event) => {
		setCredentials({ ...credentials, username: event.target.value });
	};

	const handleChangePassword = (event) => {
		setCredentials({ ...credentials, password: event.target.value });
	};

	const handleChangeConfirmPassword = (event) => {
		setCredentials({ ...credentials, confirmPassword: event.target.value });
	};

	const signup = (event) => {
		event.preventDefault();
		if (
			credentials.username === '' ||
			credentials.password === '' ||
			credentials.confirmPassword === ''
		) {
			setError('not_enter');
			return;
		}

		if (credentials.password !== credentials.confirmPassword) {
			setError('confirm_pass_wrong');
			return;
		}
		onSignup(credentials);
		setCredentials(initialSigninState);
	};

	return (
		<form onSubmit={signup} className='signin-form-container'>
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
			<input
				onChange={handleChangeConfirmPassword}
				type='password'
				value={credentials.confirmPassword}
				className='signin-form-input'
				placeholder='confirm password'
			/>
			{error ? (
				<p className='error-message'>
					{error === 'not_enter'
						? 'Please fill in all fields'
						: 'The entered password does not match'}
				</p>
			) : null}

			<PrimaryButton title='signup' />
		</form>
	);
};

SignupForm.propTypes = {
	onSignup: PropType.func.isRequired,
};
