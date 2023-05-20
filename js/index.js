import { loadProdList } from './getGoods.js';
import { renderCrmPrice } from './renderCrm.js';
import './renderModal.js';
{
	const init = () => {
		loadProdList();
		// renderGoods(goods);
		renderCrmPrice();
	};
	init();
}

// В проекте CRM (6-08)

// Реализуйте превью для изображения в модальном окне(добавления и редактирования товара)

// Элемент img создайте с помощью JS

// Если файл весит больше 1 - го мегабайта, то вместо изображения показывать сообщение:

// "Изображение не должно превышать размер 1 Мб"