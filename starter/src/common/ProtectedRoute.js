import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './common.css';

/**
 * @description A component wrap screen that require user must login
 * @param {ReactNode} children
 */
export const ProtectedRoute = ({ children }) => {
	const [userSignedIn] = useAuth();
	const navigate = useNavigate();
	if (!userSignedIn) {
		navigate('/signin');
	}
	return children;
};
