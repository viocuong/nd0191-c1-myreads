import { useEffect, useState } from 'react';

/**
 * @description A custom hook for get books from local storage
 */
export const useBooksLocal = () => {
	const [books, setBooks] = useState();
	useEffect(() => {
		const booksLocal = JSON.parse(localStorage.getItem('books'));
		setBooks(booksLocal);
	}, []);

	const saveBooks = (books) => {
		localStorage.setItem('books', JSON.stringify(books));
	};
	return [books, saveBooks];
};
