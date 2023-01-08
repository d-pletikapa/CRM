import {goods, renderCrmPrice} from '/crm/index.js';
import {renderNewProduct} from '/crm/index.js';
import {getTotalPrice} from '/crm/index.js';

const modalWindowTitle = document.querySelector('.crm-modal-window__title');
const modalWindowProductId = document.querySelector('.crm-modal-window__vendor-code__id');
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
  tempId = createNewId();
  renderNewId(tempId);
  renderFormPrice();
  modalWindowOverlay.classList.remove('crm-modal-window--visible');
});


//remove listeners
const closeModal = () => {
  modalWindowOverlay.classList.add('crm-modal-window--visible');
}
modalWindowOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === modalWindowOverlay || target === target.closest('.crm-modal-window--close')) {
    closeModal();
  }
});
// 5-07
// 1. В форме если поставить чекбокс то поле рядом должно быть разблокировано
// 2. Если чекбокс убрать поле рядом очищается и блокируется

modalWindowCheckbox.addEventListener('change', () => {
  if (modalWindowCheckbox.value === 'Yes') {
    modalWindowCheckbox.value = 'No';
    modalWindowCheckboxInput.value = '';
    modalWindowCheckboxInput.disabled = true;
  } else if (modalWindowCheckbox.value === 'No') {
    modalWindowCheckbox.value = 'Yes';
    modalWindowCheckboxInput.disabled = false;
  }

})
//id generator

const getRandomNumber = () => {
  const min = Math.ceil(1);
  const max = Math.floor(999999999);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createNewId = () => {

  let randomId = getRandomNumber();
    goods.forEach((item) => {
      while (item.id === randomId) {
        randomId = getRandomNumber();
      }
    });
    return randomId;
};
let tempId = null;
const renderNewId = (id) => {
  modalWindowProductId.innerText = `id: ${id}`;
}

// Реализовать добавление нового товара из формы в таблицу
    modalWindowForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    //переименовать свойство объекта (для соответствия массиву goods) с наследованием параметров чтения
      Object.defineProperty(
        newProduct,
        'title',
        Object.getOwnPropertyDescriptor(newProduct, 'product-name')
      );
      delete newProduct['product-name'];
      newProduct.id = tempId; // добавляем id
      goods.push(newProduct);
      renderNewProduct();
      renderCrmPrice();
    modalWindowForm.reset();
    closeModal();
  });


// 7. Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
const renderFormPrice = () => {
    modalWindowTotalPrice.children[0].innerText =`$ ${getTotalPrice()}`;
};

const dynamicFormPrice = () => {
  let summary = getTotalPrice();
  summary += (modalWindowForm.count.value * modalWindowForm.price.value);
  modalWindowTotalPrice.children[0].innerText =`$ ${summary}`;
}

modalWindowForm.count.addEventListener('input', (e) => {
  dynamicFormPrice();
  // let summary = getTotalPrice();
  // summary += (e.target.value * modalWindowForm.price.value);
  // modalWindowTotalPrice.children[0].innerText =`$ ${summary}`;
})

modalWindowForm.price.addEventListener('input', (e) => {
  dynamicFormPrice();
  // let summary = getTotalPrice();
  // summary += (e.target.value * modalWindowForm.count.value);
  // modalWindowTotalPrice.children[0].innerText =`$ ${summary}`;
})



