const modalWindowTitle = document.querySelector('.crm-modal-window__title');
const modalWindowProductId = document.querySelector('.crm-modal-window__product-id');
const modalWindowForm = document.querySelector('.crm-modal-window__form');
const modalWindowCheckbox = document.querySelector('.crm-modal-window--checkbox-style');
const modalWindowCheckboxInput = document.querySelector('.crm-modal-window__input--fit-size');
const modalWindowTotalPrice = document.querySelector('.crm-modal-window__totalPrice');

//5-05

const btnAddProduct = document.querySelector('.crm__table__add-product');
const modalWindowCloseBtn = document.querySelector('.crm-modal-window--close');
const modalWindowOverlay = document.querySelector('.crm-modal-window--overlay');
const modalWindowBlock = document.querySelector('.crm-modal-window__block');

//add listeners
btnAddProduct.addEventListener('click', () => {
  modalWindowOverlay.classList.remove('crm-modal-window--visible');
});


//remove listeners
modalWindowOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === modalWindowOverlay || target === target.closest('.crm-modal-window--close')) {
    modalWindowOverlay.classList.add('crm-modal-window--visible');
  }
});


