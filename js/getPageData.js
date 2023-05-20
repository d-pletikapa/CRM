const table = document.querySelector('.crm__table__t');
const crmSubtitlePrice = document.querySelector('.crm__subtitle');
const btnAddProduct = document.querySelector(
	'.crm__table__add-product');

const inputNaming = document.querySelector('.crm-modal-window__item--naming input');
const inputCategory = document.querySelector('.crm-modal-window__item--category input');
const inputDescription = document.querySelector('.crm-modal-window--textarea-big');
const inputCounter = document.querySelector('.crm-modal-window__item--counter select');
const inputQuantity = document.querySelector('.crm-modal-window__item--quantity input');
const inputPrice = document.querySelector('.crm-modal-window__item--price input');
const inputDiscount = document.querySelector('.crm-modal-window__input-discount');
const descriptionLegend = document.querySelector('.crm-modal-window__legend-description');
export default {
	table,
	crmSubtitlePrice,
	btnAddProduct,
};
