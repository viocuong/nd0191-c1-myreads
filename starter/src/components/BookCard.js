import PropType from 'prop-types';
import { ChangeBookShelf } from './ChangeBookShelf';
import { ListAuthor } from './ListAuthor';
import { useNavigate } from 'react-router-dom';

export const BookCard = ({ book, onChangeShelf }) => {
	const navigate = useNavigate();

	const handleOnDragStart = (e) => {
		e.dataTransfer.setData('text', `${book.id}`);
	};

	return (
		<div
			draggable
			onDragStart={handleOnDragStart}
			onClick={() => navigate(`/book-detail/${book.id}`)}
			className='book'
		>
			<div className='book-top'>
				<div
					className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
					}}
				></div>
				<ChangeBookShelf
					shelf={book.shelf}
					onChangeShelf={onChangeShelf}
				/>
			</div>
			<div className='book-title'>{book.title}</div>
			<ListAuthor authors={book.authors} />
		</div>
	);
};

BookCard.propTypes = {
	book: PropType.object.isRequired,
	onChangeShelf: PropType.func,
};
