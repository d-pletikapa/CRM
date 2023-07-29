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
