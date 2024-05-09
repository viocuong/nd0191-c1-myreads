import PropType from 'prop-types';
import { BookType } from '../../proptype';
import { BookShelf } from './BookShelf';
import { useMemo } from 'react';

export const ListBookContent = ({ books, onChangeBookShelf }) => {
	// Get books by shelf by two way
	// const [currentlyReadingBooks, wantToReadBooks, readBooks] = useMemo(() => {
	// 	return [
	// 		filterBooksByShelf(books, 'currentlyReading'),
	// 		filterBooksByShelf(books, 'wantToRead'),
	// 		filterBooksByShelf(books, 'read'),
	// 	];
	// }, [books]);

	// Optimize by normal for loop
	const [currentlyReadingBooks, wantToReadBooks, readBooks] = useMemo(() => {
		const currentlyReadingBooks = [];
		const wantToReadBooks = [];
		const readBooks = [];
		books.forEach((book) => {
			const shelf = book.shelf;
			switch (shelf) {
				case 'currentlyReading': {
					currentlyReadingBooks.push(book);
					break;
				}
				case 'wantToRead': {
					wantToReadBooks.push(book);
					break;
				}
				case 'read': {
					readBooks.push(book);
					break;
				}
				default:
					break;
			}
		});
		return [currentlyReadingBooks, wantToReadBooks, readBooks];
	}, [books]);

	const handleDropBookToShelf = (bookId, shelf) => {
		const book = books.find((book) => book.id === bookId);
		onChangeBookShelf(book, shelf);
	};

	return (
		<div className='list-books-content'>
			<div>
				<BookShelf
					onDropBook={(bookId) =>
						handleDropBookToShelf(bookId, 'currentlyReading')
					}
					onChangeShelf={onChangeBookShelf}
					books={currentlyReadingBooks}
					shelfTitle='Currently Reading'
					shelf='currentReading'
				/>
				<BookShelf
					onDropBook={(bookId) =>
						handleDropBookToShelf(bookId, 'wantToRead')
					}
					onChangeShelf={onChangeBookShelf}
					books={wantToReadBooks}
					shelfTitle='Want to Read'
					shelf='wantToRead'
				/>
				<BookShelf
					onDropBook={(bookId) =>
						handleDropBookToShelf(bookId, 'read')
					}
					books={readBooks}
					shelfTitle='Read'
					onChangeShelf={onChangeBookShelf}
					shelf='read'
				/>
			</div>
		</div>
	);
};

ListBookContent.propTypes = {
	books: BookType,
	onChangeBookShelf: PropType.func.isRequired,
};
