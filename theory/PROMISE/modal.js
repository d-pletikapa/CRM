import loadStyles from './loadStyles.js';

const showModal = async (err, data) => {
	await loadStyles('./styles.css');
	const overlay = document.createElement('div');
	const modalWindow = document.createElement('div');
	const title = document.createElement('h2');
	const description = document.createElement('p');
	const price = document.createElement('p');
	const buy = document.createElement('button');
	const close = document.createElement('button');

	overlay.classList.add('overlay');
	modalWindow.classList.add('modal');
	title.classList.add('title');
	title.textContent = data.title;
	description.classList.add('description');
	description.textContent = data.description;
	price.classList.add('price');
	price.textContent = `${data.price}P`;
	buy.classList.add('buy');
	buy.textContent = 'Купить';
	close.classList.add('close');
	close.textContent = 'Закрыть';

	overlay.append(modalWindow);
	modalWindow.append(title, description, price, buy, close);
	document.body.append(overlay);

	return new Promise(resolve => {
		close.addEventListener('click', () => {
			overlay.remove();
			resolve(false);
		})
		buy.addEventListener('click', () => {
			overlay.remove();
			resolve(true);
		});
	});
}

export default showModal;
