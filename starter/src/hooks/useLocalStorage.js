import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * @description A custom hook retrieves and sets the value into local storage by key
 * @param {string} key
 * @returns: {object} Storaged value get by key
 */
export const useLocalStorage = (key) => {
	const [value, setValue] = useState();

	const saveValue = (value) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	useEffect(() => {
		const storagedValue = localStorage.getItem(key);
		setValue(JSON.parse(storagedValue));
	}, [key]);

	return [value, saveValue];
};

useLocalStorage.propTypes = {
	key: PropTypes.string.isRequired,
};
