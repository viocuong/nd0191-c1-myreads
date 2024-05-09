import { booksInitialState } from './BooksProvider';

export const booksReducer = (state, action) => {
	switch (action.type) {
		case 'fetched_books': {
			return {
				...state,
				books: action.books,
			};
		}
		case 'updated_book_shelf': {
			const newBooks = state.books.map((book) => {
				if (book.id === action.book.id) {
					return { ...book, shelf: action.shelf };
				}
				return book;
			});
			return { ...state, books: newBooks };
		}
		case 'logout': {
			return booksInitialState;
		}
		case 'reset': {
			return booksInitialState;
		}
		default: {
			return state;
		}
	}
};
