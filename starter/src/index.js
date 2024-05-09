import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import SignupScreen from './screens/signup/SignupScreen';
import SigninScreen from './screens/signin/SigninScreen';
import { RouterProvider } from 'react-router-dom';
import SearchScreen from './screens/search/SearchScreen';
import './App.css';
import { ProtectedRoute } from './common/ProtectedRoute';
import MainScreen from './screens/main/MainScreen';
import { BooksProvider } from './BooksProvider';
import { BookDetailScreen } from './screens/bookdetail/BookDetailScreen';
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
		element: (
			<ProtectedRoute>
				<SearchScreen />
			</ProtectedRoute>
		),
	},
	{
		path: '/book-detail/:bookId',
		element: (
			<ProtectedRoute>
				<BookDetailScreen />
			</ProtectedRoute>
		),
	},
]);
ReactDOM.render(
	<React.StrictMode>
		<BooksProvider>
			<RouterProvider router={router} />
		</BooksProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
