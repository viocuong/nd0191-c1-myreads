import { ListAuthor } from '../../components/ListAuthor';
import { useParams } from 'react-router-dom';
import './BookDetail.css';
import { useEffect, useState } from 'react';
import { get } from '../../BooksAPI';

export const BookDetailScreen = () => {
	const { bookId } = useParams();
	const [book, setBook] = useState();
	useEffect(() => {
		const getBook = async () => {
			if (bookId) {
				const res = await get(bookId);
				if (res) {
					setBook(res);
				}
			}
		};
		getBook();
	}, [bookId]);

	return book ? (
		<div className='book-detail'>
			<div className='book-detail-header'>
				<h1>Book detail</h1>
			</div>
			<img
				width={400}
				height={500}
				className='book-detail-thumbnail'
				alt='thumbnail'
				src={`${book.imageLinks.thumbnail}`}
			/>
			<h1 className='book-detail-title'>{book.title}</h1>
			<p className='book-detail-description'>{book.description}</p>
			<ListAuthor className='book-detail-author' authors={book.authors} />
		</div>
	) : null;
};
