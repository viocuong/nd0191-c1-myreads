import { useLocalStorage } from './useLocalStorage';
import { CREDENTIALS_KEY, USER_SIGNED_IN_KEY } from '../utils/constants';
import { useState } from 'react';

/**
 *
 * @description A custom hook that simulates signup and signin through localStorage
 */
export const useAuth = () => {
	const [value, saveValue] = useLocalStorage(CREDENTIALS_KEY);
	const [userSignedIn, setUserSignedIn] = useLocalStorage(USER_SIGNED_IN_KEY);
	const [status, setStatus] = useState('');

	function signup(credentials) {
		// Check if the registered user exists or not
		if (value && value.some((c) => c.username === credentials.username)) {
			setStatus(AuthStatus.USER_ALREADY_EXISTS);
			return;
		}

		// The user does not exist and can't register
		const newListCredentials = [...(value ?? []), credentials];
		saveValue(newListCredentials);
		setStatus(AuthStatus.SIGN_UP_SUCCESS);
	}

	function signin(credentials) {
		// Check login
		if (value && credentials) {
			const user = value?.find(
				(c) =>
					c.username === credentials.username &&
					c.password === credentials.password,
			);
			if (user) {
				// Save signin information
				setUserSignedIn(USER_SIGNED_IN_KEY, user);
				setStatus(AuthStatus.SIGN_IN_SUCCESS);
				return;
			}
		}

		// There is no user or wrong login
		setStatus(AuthStatus.SIGN_IN_FAIL);
	}

	function reset() {
		setStatus('');
	}

	return [userSignedIn, status, signup, signin, reset];
};

export const AuthStatus = {
	USER_ALREADY_EXISTS: 'User already exists',
	SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
	SIGN_IN_FAIL: 'Username or password is incorrect',
	SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
};
