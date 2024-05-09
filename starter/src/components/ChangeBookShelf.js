import PropType from 'prop-types';

export const ChangeBookShelf = ({ shelf, onChangeShelf }) => {
	return (
		<div className='book-shelf-changer'>
			<select
				onClick={(e) => e.stopPropagation()}
				value={shelf ?? 'none'}
				onChange={(e) => onChangeShelf(e.target.value)}
			>
				<option value='' disabled>
					Move to...
				</option>
				<option value='currentlyReading'>Currently Reading</option>
				<option value='wantToRead'>Want to Read</option>
				<option value='read'>Read</option>
				<option value='none'>None</option>
			</select>
		</div>
	);
};

ChangeBookShelf.propTypes = {
	shelf: PropType.string,
	onChangeShelf: PropType.func.isRequired,
};
