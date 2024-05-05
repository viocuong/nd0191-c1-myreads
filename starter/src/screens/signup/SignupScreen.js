import { useNavigate } from 'react-router-dom';
import { SignupForm } from './SignupForm';
import logo from '../../icons/book.png';
import { AuthStatus, useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const SignupScreen = ({}) => {
	const navigate = useNavigate();
	const [value, status, signup, reset] = useAuth();
	useEffect(() => {
		if (status === AuthStatus.SIGN_UP_SUCCESS) {
			navigate(-1); // Go back signin screen
			return;
		}

		if (status === AuthStatus.USER_ALREADY_EXISTS) {
			alert(AuthStatus.USER_ALREADY_EXISTS);
			reset();
		}
	}, [status]);

	const handleSignup = (credentials) => {
		signup(credentials);
	};

	return (
		<div className='signin-container'>
			<div className='signin-title'>
				<h1>Sign up</h1>
			</div>
			<img src={logo} className='logo' />
			<SignupForm onSignup={handleSignup} />
		</div>
	);
};

export default SignupScreen;
