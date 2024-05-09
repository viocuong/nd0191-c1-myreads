import PropType from 'prop-types';
import { ListBook } from '../../components/ListBook';
import { BookType } from '../../proptype';

export const BookShelf = ({ books, shelfTitle, onChangeShelf, onDropBook }) => {
	const handleOnDrop = (e) => {
		const droppedBookId = e.dataTransfer.getData('text');
		onDropBook(droppedBookId);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className='bookshelf'
			onDragOver={handleDragOver}
			onDrop={handleOnDrop}
		>
			<h2 className='bookshelf-title'>{shelfTitle}</h2>
			<div className='bookshelf-books'>
				<ListBook books={books} onChangeShelf={onChangeShelf} />
			</div>
		</div>
	);
};

BookShelf.propTypes = {
	books: BookType,
	shelfTitle: PropType.string.isRequired,
	onChangeShelf: PropType.func.isRequired,
	onDropBook: PropType.func.isRequired,
};
