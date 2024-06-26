const api = 'https://reactnd-books-api.udacity.com';

const headers = () => {
	return {
		Accept: 'application/json',
		Authorization: localStorage.token,
	};
};

export const get = (bookId) =>
	fetch(`${api}/books/${bookId}`, { headers: headers() })
		.then((res) => res.json())
		.then((data) => data.book);

export const getAll = () =>
	fetch(`${api}/books`, { headers: headers() })
		.then((res) => res.json())
		.then((data) => data.books);

export const update = (book, shelf) =>
	fetch(`${api}/books/${book.id}`, {
		method: 'PUT',
		headers: {
			...headers(),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ shelf }),
	}).then((res) => res.json());

export const search = (query, maxResults) =>
	fetch(`${api}/search`, {
		method: 'POST',
		headers: {
			...headers(),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, maxResults }),
	})
		.then((res) => res.json())
		.then((data) => data.books);
