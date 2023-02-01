import {goods} from './getGoods.js';
import pageElements from './getPageData.js';
const {
  crmSubtitlePrice,
  modalWindowProductId,
  modalWindowTotalPrice,
} = pageElements;
import {getTotalPrice} from './controlCrm.js';

// 1. Создайте функцию createRow, которая будет получать
// объект и на основе объекта формировать элемент <tr> с <td> внутри
const createRow = (obj) => {
  const tableBody = document.querySelector('.crm__table__t tbody');
  tableBody.insertAdjacentHTML('beforeend', `
    <tr>
       <td>${obj.id}</td>
       <td>${obj.title}</td>
       <td>${obj.category}</td>
       <td>${obj.units}</td>
       <td>${obj.count}</td>
       <td>${obj.price}</td>
       <td>${obj.price * obj.count}</td>
       <td>
         <button type="button" class="crm__table__prod-btn crm__table__prod-btn--img" data-pic="./img/prodCover.jpg">
         </button>
       </td>
       <td>
         <button type="button"
         class="crm__table__prod-btn crm__table__prod-btn--edit">
         </button>
       </td>
       <td>
         <button type="button"
         class="crm__table__prod-btn crm__table__prod-btn--del">
         </button>
       </td>
    </tr>`,
  );
};

// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки,
// созданные на основе createRow, в таблицу (советую использовать метод map)
export const renderGoods = (arrayObj) => {
  arrayObj.map((item) => createRow(item),
  );
};

// 8. Итоговая стоимость над таблицей
// должна корректно отображать сумму всех товаров
export const renderCrmPrice = () => {
  crmSubtitlePrice.children[0].innerText = `$ ${getTotalPrice()}`;
};
export const removeGoods = (dataId) => {
  goods.forEach((item, index, array) => {
    if (item.id === +dataId) {
      array.splice(index, 1);
    }
    renderCrmPrice();
  });
  return goods;
};

export const renderNewProduct = () => {
  // для рендера берется последний объект массива
  createRow(goods[goods.length - 1]);
};

export const removeTableRow = (closestRow) => {
  const rowProductId = +closestRow.firstElementChild.textContent;
  closestRow.remove();
  return rowProductId;
};

export const renderNewId = (id) => {
  modalWindowProductId.innerText = `id: ${id}`;
};
// 7. Итоговая стоимость в модальном окне
// должна правильно высчитываться при смене фокуса
export const renderFormPrice = () => {
  modalWindowTotalPrice.children[0].innerText = `$ ${getTotalPrice()}`;
};
