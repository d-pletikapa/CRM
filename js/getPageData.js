const modalWindowProductId = document.querySelector(
	'.crm-modal-window__vendor-code__id');
const modalWindowForm = document.querySelector(
	'.crm-modal-window__form');
const modalWindowCheckbox = document.querySelector(
	'.crm-modal-window--checkbox-style');
const modalWindowCheckboxInput = document.querySelector(
	'.crm-modal-window__input--fit-size');
const modalWindowTotalPrice = document.querySelector(
	'.crm-modal-window__totalPrice');
const btnAddProduct = document.querySelector(
	'.crm__table__add-product');
const modalWindowOverlay = document.querySelector(
	'.crm-modal-window--overlay');
const table = document.querySelector('.crm__table__t');
const crmSubtitlePrice = document.querySelector('.crm__subtitle');

const createModalErr = (errMsg = 'Что-то пошло не так') => {
	const modalError = document.createElement('div');
	modalError.className = 'crm-modal-window__error';
	modalError.style.cssText = `
position: absolute;
padding: 20px 30px;
display:flex;
flex-flow: column nowrap;
align-items: center;
width: 350px;
height: 350px;
left: 115px;
top: 28px;
background: #F2F0F9;
box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
`;
	modalError.insertAdjacentHTML('afterbegin', `
<button class="window__error--close" style=" background-image: url(../img/cross.svg); width: 20px;
  height: 20px; backround-repaeat: no-repeat; background-position: center; margin-bottom:60px; align-self: flex-end;" type="button"></button>
<svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:30px;">
<path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
<path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
</svg>
<p class="window__error--msg" style=" font-weight: 700; font-size: 18px; line-height: 22px; letter-spacing: 0.1em; text-transform: uppercase; color: #6E6893;">${errMsg}</p>
`);
	return modalError;
};


export default {
	modalWindowProductId,
	modalWindowForm,
	modalWindowCheckbox,
	modalWindowCheckboxInput,
	modalWindowTotalPrice,
	btnAddProduct,
	modalWindowOverlay,
	table,
	crmSubtitlePrice,
	createModalErr,
};
