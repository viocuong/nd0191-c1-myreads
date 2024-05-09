import { useEffect, useReducer } from 'react';
import { initialSearchState, searchReducer } from './searchReducer';
import { search, update } from '../../BooksAPI';
import { ListBook } from '../../components/ListBook';
import { SearchBookInput } from './SearchBookInput';
import { Link, useNavigate } from 'react-router-dom';
import { useBooksLocal } from '../../hooks/useBooksLocal';

const SearchScreen = () => {
	const [state, dispatch] = useReducer(searchReducer, initialSearchState);
	const [books, saveBooks] = useBooksLocal();
	const navigate = useNavigate();

	useEffect(() => {
		// Perform debounce when search
		const searchJob = setTimeout(async () => {
			const res = await search(state.query, MAX_SEARCH_RESULT);
			dispatch({
				type: 'received_search_result',
				books: res,
				booksOnShelf: books,
			});
		}, 1000);
		return () => clearTimeout(searchJob);
	}, [state.query]);

	useEffect(() => {
		// Also save books locally
		if (state.books.length > 0) {
			saveBooks(state.books);
		}
	}, [state.books]);

	const handleOnChangeShelf = async (book, shelf) => {
		const res = await update(book, shelf);
		if (res) {
			// If shelf is None, mean is book not in any shelf
			if (!book.shelf) {
				// Save book to local
				saveBooks(books.concat([{ ...book, shelf: shelf }]));
			}
			dispatch({ type: 'updated_book_shelf', book: book, shelf: shelf });
		}
	};

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link
					onClick={() => navigate('/', { replace: true })}
					replace={true}
					className='close-search'
				>
					Close
				</Link>
				<SearchBookInput
					query={state.query}
					onChangeSearchQuery={(query) =>
						dispatch({ type: 'changed_search_query', query: query })
					}
				/>
			</div>
			<div className='search-books-results'>
				<ListBook
					books={state.books}
					onChangeShelf={handleOnChangeShelf}
				/>
			</div>
		</div>
	);
};

const MAX_SEARCH_RESULT = 100;

export default SearchScreen;
