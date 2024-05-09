import PropType from 'prop-types';
import { BookCard } from './BookCard';

export const ListBook = ({ books, onChangeShelf }) => {
	return (
		<ol className='books-grid'>
			{books.map((book) => {
				return (
					<li key={book.id}>
						<BookCard
							book={book}
							onChangeShelf={(shelf) => {
								onChangeShelf(book, shelf);
							}}
						/>
					</li>
				);
			})}
		</ol>
	);
};

ListBook.propTypes = {
	books: PropType.array.isRequired,
	onChangeShelf: PropType.func.isRequired,
};
