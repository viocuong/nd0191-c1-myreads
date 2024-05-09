import { createContext, useContext, useReducer } from 'react';
import { booksReducer } from './booksReducer';

export const booksInitialState = {
	books: [],
	userLoggedIn: false,
};

export const BooksProvider = ({ children }) => {
	const [state, dispatch] = useReducer(booksReducer, booksInitialState);

	return (
		<BooksContext.Provider value={state}>
			<BooksDispatchContext.Provider value={dispatch}>
				{children}
			</BooksDispatchContext.Provider>
		</BooksContext.Provider>
	);
};

const BooksContext = createContext(booksInitialState);
const BooksDispatchContext = createContext(null);

export const useBooks = () => useContext(BooksContext);
export const useBooksDispatch = () => useContext(BooksDispatchContext);
