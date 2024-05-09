import { useEffect } from 'react';
import { getAll, update } from '../../BooksAPI';
import { Link } from 'react-router-dom';
import { ListBookContent } from './ListBookContent';
import LogoutIcon from '../../icons/ic_logout.png';
import { useAuth } from '../../hooks/useAuth';
import { useBooksLocal } from '../../hooks/useBooksLocal';
import { useBooks, useBooksDispatch } from '../../BooksProvider';

const MainScreen = () => {
	const dispatch = useBooksDispatch();
	const [, saveBooks] = useBooksLocal();
	const state = useBooks();
	const [, , , , , logout] = useAuth();

	useEffect(() => {
		// Fetch all books from Server
		const fetchBooks = async () => {
			const books = await getAll();
			saveBooks(books);
			dispatch({ type: 'fetched_books', books: books });
		};
		fetchBooks();
	}, []);

	useEffect(() => {
		// Save books to local every time books updated
		saveBooks(state.books);
		console.log(`UPDATE BOOK`);
	}, [state.books]);

	const handleOnChangeShelf = async (book, shelf) => {
		const res = await update(book, shelf);
		if (res) {
			dispatch({ type: 'updated_book_shelf', book: book, shelf: shelf });
		}
	};

	return (
		<div className='list-books'>
			<div className='list-books-title'>
				<img
					onClick={() => logout()}
					className='logout-button'
					height={30}
					width={30}
					alt='logout'
					src={LogoutIcon}
				/>
				<h1>MyReads</h1>
			</div>

			<ListBookContent
				onChangeBookShelf={handleOnChangeShelf}
				books={state.books}
			/>

			<div className='open-search'>
				<Link to={'/search'} />
			</div>
		</div>
	);
};

export default MainScreen;
