import PropType from 'prop-types';

export const PrimaryButton = ({ onClick, title }) => {
	return (
		<button className='primary-button' onClick={onClick}>
			{title}
		</button>
	);
};

PrimaryButton.propTypes = {
	title: PropType.string.isRequired,
};
