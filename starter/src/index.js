import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import SignupScreen from './screens/signup/SignupScreen';
import SigninScreen from './screens/signin/SigninScreen';
import { RouterProvider } from 'react-router-dom';
import SearchScreen from './screens/search/SearchScreen';
import App from './App';
import { ProtectedRoute } from './common/ProtectedRoute';
import MainScreen from './screens/main/MainScreen';
const router = createBrowserRouter([
	{
		path: '/signup',
		element: <SignupScreen />,
	},
	{
		path: '/signin',
		element: <SigninScreen />,
	},
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<MainScreen />
			</ProtectedRoute>
		),
	},
	{
		path: '/search',
		element: <SearchScreen />,
	},
]);
ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById('root'),
);
