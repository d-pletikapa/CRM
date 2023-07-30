import { renderGoods } from './renderCrm.js';
import { imgBaseURL } from './controlCrm.js';

export const TheURL = 'https://adventurous-fifth-hedge.glitch.me/api/goods';
const TheCategoryURL = 'https://adventurous-fifth-hedge.glitch.me/api/category';
export const TheBaseURL = 'https://adventurous-fifth-hedge.glitch.me/';
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


export const getImg = async (url) => {
  try {
		console.log(url);
    const imgBlob = await fetchGoods(url, { method: 'get' });
    const img = document.createElement('img');
    img.className = 'preview';
    img.style.width = '200px';
    img.src = URL.createObjectURL(imgBlob);
    return img;
  } catch (error) {
    console.warn('Fetch error:', error);
    const img = document.createElement('img');
    img.className = 'preview';
    img.style.width = '200px';
    img.src = `${imgBaseURL}/img/prodCover.jpg`;
    return img;
  }
};


export const loadProdList = () => {
	fetchGoods(TheURL, {
		method: 'get',
		callback: renderGoods,
	});
};

export const getEditProd = async (editProdId) => {
	const editProd = await fetchGoods(`${TheURL}/${editProdId}`, {
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

export const getCategoryList = async () => {
	const categoryList = await fetchGoods(TheCategoryURL, {
		method: 'get',
		callback: (err, data) => {
			if (err) {
				console.warn(err, data);
				return;
			}
			return data;
		},
	});
	return categoryList;
}

