import PropType from 'prop-types';

export const SearchBookInput = ({ query, onChangeSearchQuery }) => {
	return (
		<div className='search-books-input-wrapper'>
			<input
				value={query}
				onChange={(e) => onChangeSearchQuery(e.target.value)}
				type='text'
				placeholder='Search by title, author, or ISBN'
			/>
		</div>
	);
};

SearchBookInput.propTypes = {
	onChangeSearchQuery: PropType.func.isRequired,
};
