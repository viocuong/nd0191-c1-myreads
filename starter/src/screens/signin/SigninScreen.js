import { useNavigate } from 'react-router-dom';
import './Signin.css';
import logo from '../../icons/book.png';
import { SigninForm } from './SigninForm';
import { AuthStatus, useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const SigninScreen = ({}) => {
	const navigate = useNavigate();
	const [, status, , signin, reset] = useAuth();
	useEffect(() => {
		if (status === AuthStatus.SIGN_IN_SUCCESS) {
			navigate('/');
			return;
		}

		if (status === AuthStatus.SIGN_IN_FAIL) {
			alert(AuthStatus.SIGN_IN_FAIL);
			reset();
		}
	}, [status]);
	const handleSignup = (credentials) => {
		signin(credentials);
	};

	return (
		<div className='signin-container'>
			<div className='signin-title'>
				<h1>Sign in</h1>
			</div>
			<img src={logo} className='logo' />
			<SigninForm onSignin={handleSignup} />
		</div>
	);
};

export default SigninScreen;
