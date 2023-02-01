import pageElements from './getPageData.js';
import {renderNewId,
  renderFormPrice,
  renderNewProduct,
  renderCrmPrice,
  removeGoods,
  removeTableRow} from './renderCrm.js';
import {goods} from './getGoods.js';
const {
  modalWindowForm,
  modalWindowCheckbox,
  modalWindowCheckboxInput,
  modalWindowTotalPrice,
  btnAddProduct,
  modalWindowOverlay,
  table,
} = pageElements;
const closeModal = () => {
  modalWindowOverlay.classList.add('crm-modal-window--visible');
};

// id generator
const getRandomNumber = () => {
  const min = Math.ceil(1);
  const max = Math.floor(999999999);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const tempId = {
  tempId: null,
  get value() {
    return this.tempId;
  },
  set value(val) {
    this.tempId = val;
  },
  createNewId() {
    let randomId = getRandomNumber();
    goods.forEach((item) => {
      while (item.id === randomId) {
        randomId = getRandomNumber();
      }
    });
    this.value = randomId;
  },
};

// 7. Итоговая стоимость в модальном окне
// должна правильно высчитываться при смене фокуса
export const getTotalPrice = () => {
  let totalPrice = 0;
  for (const obj of goods) {
    totalPrice += (obj.price * obj.count);
  }
  return totalPrice;
};

// Реализовать добавление нового товара из формы в таблицу
const addNewProduct = (formData) => {
  const newProduct = Object.fromEntries(formData);
  // Переименовать свойство объекта
  // (для соответствия массиву goods) с наследованием параметров чтения
  Object.defineProperty(
      newProduct,
      'title',
      Object.getOwnPropertyDescriptor(newProduct, 'product-name'),
  );
  delete newProduct['product-name'];
  newProduct.id = tempId.value; // добавляем id
  goods.push(newProduct);
};

const dynamicFormPrice = () => {
  let summary = getTotalPrice();
  summary += (modalWindowForm.count.value * modalWindowForm.price.value);
  modalWindowTotalPrice.children[0].innerText = `$ ${summary}`;
};

modalWindowForm.count.addEventListener('input', (e) => {
  dynamicFormPrice();
});
modalWindowForm.price.addEventListener('input', (e) => {
  dynamicFormPrice();
});

// modal open
btnAddProduct.addEventListener('click', () => {
  tempId.createNewId();
  renderNewId(tempId.value);
  renderFormPrice();
  modalWindowOverlay.classList.remove('crm-modal-window--visible');
});
// modal close
modalWindowOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === modalWindowOverlay ||
    target === target.closest('.crm-modal-window--close')) {
    closeModal();
  }
});
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModal(); // закрываем модальное окно на кнопку esc
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
});

modalWindowForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  addNewProduct(formData);
  renderNewProduct();
  renderCrmPrice();
  modalWindowForm.reset();
  closeModal();
});

// delete row
table.addEventListener('click', e => {
  const target = e.target;
  if (target === target.closest('.crm__table__prod-btn--del')) {
    const closestRow = target.closest('tr');
    removeGoods(removeTableRow(closestRow));
  } else if (target === target.closest('.crm__table__prod-btn--img')) {
    const thisBtnPreview = target.closest('.crm__table__prod-btn--img');
    const prodPreviewWindow = open(
        'about:blank',
        '',
        `popup, width=600, height=600,
         top=${(screen.height / 2) - 300},
         left=${(screen.width / 2) - 300}`);

    prodPreviewWindow.document.body.style.backgroundImage =
      `url('${thisBtnPreview.dataset.pic}')`;
    prodPreviewWindow.document.body.innerHTML =
      `<img src="../img/prodCover.jpg" alt="prod-preview">`;
  }
});

