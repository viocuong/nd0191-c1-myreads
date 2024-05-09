export const initialSearchState = {
	query: '',
	books: [],
};

export function searchReducer(state, action) {
	switch (action.type) {
		case 'changed_search_query': {
			return {
				...state,
				query: action.query,
			};
		}
		case 'received_search_result': {
			// Search results are not shown when query is empty
			if (
				state.query === '' ||
				action.books === undefined ||
				action.books.error
			) {
				return { ...state, books: [] };
			}

			// Books have thumbnails
			const validBooks = action.books.filter(
				(book) => book.imageLinks !== undefined,
			);

			// Generate a Map for mapping the searched books with shelf
			const booksWithShelfs = new Map();
			action.booksOnShelf.forEach((book) =>
				booksWithShelfs.set(book.id, book.shelf),
			);

			// Map the searched books with shelf
			const booksResult = validBooks.map((book) => {
				return { ...book, shelf: booksWithShelfs.get(book.id) };
			});

			return { ...state, books: booksResult };
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

		default: {
			return state;
		}
	}
}
