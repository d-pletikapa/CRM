// export const goods = [
// 	{
// 		'id': 253842678,
// 		'title': 'Смартфон Xiaomi 11T 8/128GB',
// 		'category': 'mobile-phone',
// 		'units': 'шт.',
// 		'count': 3,
// 		'price': 27000,
// 	},
// 	{
// 		'id': 296378448,
// 		'title': 'Радиоуправляемый автомобиль Cheetan',
// 		'category': 'toys',
// 		'price': 4000,
// 		'units': 'шт.',
// 		'count': 1,
// 	},
// ];
import { renderGoods } from './renderCrm.js';

export const URL = 'https://adventurous-fifth-hedge.glitch.me/api/goods';
export const fetchGoods = async (url, {
	method = 'get',
	callback = (err, data) => {
		if (err) {
			console.warn(err, data);
		}
	},
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
			// return;
		}
		throw new Error(`Ошибка ${response.status} : ${response.statusText}`);
	} catch (err) {
		callback(err);
	}
};

export const loadProdList = () => {
	fetchGoods(URL, {
		method: 'get',
		callback: renderGoods,
	});
};

export const getEditProd = async (editProdId) => {
	const editProd = await fetchGoods(`${URL}/${editProdId}`, {
		method: 'get',
		callback: (err, data) => {
			if (err) {
				console.warn(err, data);
				return;
			}
			return data;
		},
	});
	return editProd;
};
