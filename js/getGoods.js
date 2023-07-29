import { renderGoods } from './renderCrm.js';
import { imgBaseURL } from './controlCrm.js';
import {editImg} from './renderModal.js';

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

const renderImg = async (err, data) => {
  return new Promise(async (resolve, reject) => {
    if (err) {
      console.warn(err, data);
      const img = document.createElement('img');
      img.className = 'preview';
      img.style.width = '200px';
      img.src = `${imgBaseURL}/img/prodCover.jpg`;
      resolve(img);
    } else {
      try {
        const blobData = await fetch(data).then(response => response.blob());
        const img = document.createElement('img');
        img.className = 'preview';
        img.style.width = '200px';
        img.src = URL.createObjectURL(blobData);
        resolve(img);
      } catch (error) {
        console.warn('Fetch error:', error);
        reject(error);
      }
    }
  });
};

// export const getImg = async () => {
//   const url = editImg.get();
// 	// const url = editImg.url
//   if (url) {
//     try {
//       const imgElement = await fetchGoods(url, {
//         method: 'get',
//         callback: renderImg,
//       });
//       return imgElement;
//     } catch (error) {
//       console.warn('Fetch error:', error);
//     }
//   }
//   return null; // Вернем null, если URL изображения пустой или если произошла ошибка
// };

export const getImg = async (url) => {
  return new Promise((resolve, reject) => {
    fetchGoods(url, {
      method: 'get',
      callback: async (err, data) => {
        const imgElement = await renderImg(err, data);
        resolve(imgElement);
      },
    });
  });
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

