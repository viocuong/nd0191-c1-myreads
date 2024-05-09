import PropType from 'prop-types';

export const BookType = PropType.arrayOf(
	PropType.shape({
		title: PropType.string.isRequired,
		imageLinks: PropType.shape({
			smallThumbnail: PropType.string.isRequired,
			thumbnail: PropType.string.isRequired,
		}),
		authors: PropType.arrayOf(PropType.string).isRequired,
		averageRating: PropType.number,
		categories: PropType.arrayOf(PropType.string),
		description: PropType.string,
		id: PropType.string.isRequired,
		previewLink: PropType.string,
		printType: PropType.string,
		publishedDate: PropType.string,
		ratingsCount: PropType.number,
		shelf: PropType.string.isRequired,
		subtitle: PropType.string,
	}),
);
