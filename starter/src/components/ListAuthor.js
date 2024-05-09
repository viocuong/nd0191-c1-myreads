import PropType from 'prop-types';

export const ListAuthor = ({ authors, className }) => {
	return (
		<div className={className}>
			{authors &&
				authors.map((author) => (
					<div key={author} className='book-authors'>
						{author}
					</div>
				))}
		</div>
	);
};

ListAuthor.propTypes = {
	authors: PropType.array,
};
