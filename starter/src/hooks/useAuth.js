import { useLocalStorage } from './useLocalStorage';
import { CREDENTIALS_KEY, USER_SIGNED_IN_KEY } from '../utils/constants';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

/**
 * @description A custom hook that simulates signup and signin through localStorage
 */
export const useAuth = () => {
	const [credentialsList, saveCredentialsList] =
		useLocalStorage(CREDENTIALS_KEY);
	const [userSignedIn, setUserSignedIn, clearLoggedInUser] =
		useLocalStorage(USER_SIGNED_IN_KEY);
	const [status, setStatus] = useState('');
	const navigate = useNavigate();
	function signup(credentials) {
		// Check if the registered user exists or not
		if (
			credentialsList &&
			credentialsList.some((c) => c.username === credentials.username)
		) {
			setStatus(AuthStatus.USER_ALREADY_EXISTS);
			return;
		}

		// The user does not exist, so can register
		// Generate tokens for each new user, to call the api with unique data for each user
		const token = (localStorage.token = Math.random()
			.toString(36)
			.substr(-8));
		const newListCredentials = [
			...(credentialsList ?? []),
			{ ...credentials, token },
		];
		saveCredentialsList(newListCredentials);
		setStatus(AuthStatus.SIGN_UP_SUCCESS);
	}

	function signin(credentials) {
		// Check login
		if (credentialsList && credentials) {
			const user = credentialsList?.find(
				(c) =>
					c.username === credentials.username &&
					c.password === credentials.password,
			);
			if (user) {
				// Save signin information
				setUserSignedIn(user);

				// Set token for this user
				localStorage.token = user.token;
				setStatus(AuthStatus.SIGN_IN_SUCCESS);
				return;
			}
		}

		// There is no user or wrong login
		setStatus(AuthStatus.SIGN_IN_FAIL);
	}

	function logout() {
		clearLoggedInUser();
		navigate('/signin');
	}

	function reset() {
		setStatus('');
	}

	return [userSignedIn, status, signup, signin, reset, logout];
};

export const AuthStatus = {
	USER_ALREADY_EXISTS: 'User already exists',
	SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
	SIGN_IN_FAIL: 'Username or password is incorrect',
	SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
};
