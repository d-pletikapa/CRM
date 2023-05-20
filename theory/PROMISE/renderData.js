const URL = 'https://adventurous-fifth-hedge.glitch.me/api/goods';
import showModal from './modal.js';

const httpRequest = (url, {
	method = 'get',
	callback,
	body = {},
	headers,
}) => {
	try {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		if (headers) {
			for (const [key, value] of Object.entries(headers)) {
				xhr.setRequestHeader(key, value);
			}
		}
		xhr.addEventListener('load', () => {
			if (xhr.status < 200 || xhr.status >= 300) {
				callback(new Error(xhr.status), xhr.response);
				return;
			}
			const data = JSON.parse(xhr.response);
			if (callback) callback(null, data);
		})
		xhr.addEventListener('error', () => {
			callback(new Error(xhr.status), xhr.response);
		})
		xhr.send(JSON.stringify(body));
	} catch (err) {
		callback(new Error(err));
	}
}
const fetchRequest = async (url, {
	method = 'get',
	callback,
	body,
	headers,
}) => {
	try {
		const options = {
			method,
		};
		if (body) options.body = JSON.stringify(body);
		if (headers) options.headers = headers;
		const response = await fetch(url, options);
		if (response.ok) {
			const data = await response.json();
			if (callback) return callback(null, data);
		}
		throw new Error(`Ошибка ${response.status} : ${response.statusText}`);
	} catch (err) {
		return callback(err);
	}
}

const renderGoods = (err, data) => {
	if (err) {
		console.warn(err, data);
		const h2 = document.createElement('h2');
		h2.style.color = `red`;
		h2.textContent = err;
		document.body.append(h2);
		return;
	}
	const cardsWrapper = document.createElement('div');
	cardsWrapper.className = 'cards';
	const goods = data.map(item => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
        <h2>${item.title}</h2>
        <br>
        <p>Цена: ${item.price}Р</p>
        <br>
        <p>${item.description}</p>
		  <button class="open" data-id="${item.id}">Подробнее</button>
        `;
		return card;
	})
	cardsWrapper.append(...goods);
	cardsWrapper.addEventListener('click',
		async ({ target }) => {
			if (target.classList.contains('open')) {
				const checkBuy = await fetchRequest(`
				${URL}/${target.dataset.id}`,
					{
						callback: showModal,
					});
				console.log(checkBuy);
				if (checkBuy) {
					target.textContent = 'В корзине';
				}
			}
		})
	document.body.append(cardsWrapper);
	return true;
};

const get = document.querySelector('#get');
get.addEventListener('click', async () => {
	get.classList.add('get_active');
	const result = await fetchRequest(URL, {
		method: 'get',
		callback: renderGoods,
	});
	if (result === true) get.classList.remove('get_active');
})
