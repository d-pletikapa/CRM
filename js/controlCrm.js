import pageElements from './getPageData.js';
const { modalWindowTotalPrice, table, btnAddProduct } = pageElements;
import { removeTableRow } from './renderCrm.js';
import { TheURL, fetchGoods } from './getGoods.js';
import { renderModal } from './renderModal.js';

export const debounce = (func, timeout = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

// 7. Итоговая стоимость в модальном окне
// должна правильно высчитываться при смене фокуса
export const getTotalPrice = (err, data) => {
	if (err) {
		console.warn(err, data);
		crmSubtitlePrice.children[0].innerText = err;
		modalWindowTotalPrice.children[0].innerText = err;
		return;
	}
	let totalPrice = 0;

	for (const obj of data) {
		totalPrice += (obj.price * obj.count);
	}
	return totalPrice;
};

const port = window.location.port ? `:${window.location.port}` : '';
export const imgBaseURL = window.location.protocol + '//' + window.location.hostname + port;
// product image preview
const createPopupCoverWindow = (thisBtnPreview) => {
	const prodPreviewWindow = open(
		'about:blank',
		'',
		`popup, width=600, height=600,
         top=${screen.height / 2 - 300},
         left=${screen.width / 2 - 300}
				 `
				 );

	prodPreviewWindow.document.body.style.backgroundImage =
		`url(${imgBaseURL}${thisBtnPreview.dataset.pic})`;

	console.log(thisBtnPreview.dataset.pic);
};
// delete row
table.addEventListener('click', e => {
	const target = e.target;
	if (target === target.closest('.crm__table__prod-btn--del')) {
		if (confirm('Удалить товар?')) {
		const closestRow = target.closest('tr');
		const rowProductId = closestRow.firstElementChild.textContent;

		fetchGoods(`${TheURL}/${rowProductId}`, {
			method: 'delete',
			callback: (err, data) => {
				if (err) {
					console.warn(err, data);
					closestRow.textContent = err;
					return;
				}
				removeTableRow(closestRow);
			},
		});
	}

	} else if (target === target.closest('.crm__table__prod-btn--img')) {
		const thisBtnPreview = target.closest('.crm__table__prod-btn--img');
		createPopupCoverWindow(thisBtnPreview);
	} else if (target === target.closest('.crm__table__prod-btn--edit')) {
		const closestRow = target.closest('tr');
		const rowProductId = closestRow.firstElementChild.textContent;
		renderModal(rowProductId);
	}
});

// modal open
btnAddProduct.addEventListener('click', () => {
	renderModal();
});

