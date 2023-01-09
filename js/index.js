// 1. Создайте функцию createRow, которая будет получать объект и на основе объекта формировать элемент <tr> с <td> внутри
// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки, созданные на основе createRow, в таблицу (советую использовать метод map)

export const goods = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "category": "mobile-phone",
    "units": "шт.",
    "count": 3,
    "price": 27000,
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "category": "toys",
    "price": 4000,
    "units": "шт.",
    "count": 1,
  },
];

const createRow = (obj) => {
  const tableBody = document.querySelector('.crm__table__t tbody');
  tableBody.insertAdjacentHTML('beforeend', `<tr>
                     <td>${obj.id}</td>
                     <td>${obj.title}</td>
                     <td>${obj.category}</td>
                     <td>${obj.units}</td>
                     <td>${obj.count}</td>
                     <td>${obj.price}</td>
                     <td>${obj.price * obj.count}</td>
                     <td><button class="crm__table__prod-btn crm__table__prod-btn--img">
                     </button></td>
                     <td><button class="crm__table__prod-btn crm__table__prod-btn--edit"></button></td>
                     <td><button class="crm__table__prod-btn crm__table__prod-btn--del"></button></td>
                 </tr>`
  );
}

const renderGoods = (arrayObj) => {
  arrayObj.map((item) => {
      return createRow(item);
  }
  )
}
renderGoods(goods);

const removeGoods = (dataId) => {
  goods.forEach((item, index,array) => {
    if (item.id === +dataId) {
      array.splice(index, 1);
    }
    renderCrmPrice();
  })
  return goods;
}

export const renderNewProduct = () => {
  createRow(goods[goods.length -1]); // для рендера берется последний объект массива
}

const table = document.querySelector('.crm__table__t');
table.addEventListener('click', e => {
  const target = e.target;
  if (target === target.closest('.crm__table__prod-btn--del')) {
    const closestRow = target.closest('tr');
    const rowProductId = +closestRow.firstElementChild.textContent;
    closestRow.remove();
    removeGoods(rowProductId);
    console.log(goods);
  }
})

// 7. Итоговая стоимость в модальном окне должна правильно высчитываться при смене фокуса
export const getTotalPrice = () => {
  let totalPrice = 0;
  for (const obj of goods) {
    totalPrice += (obj.price * obj.count);
  }
  return totalPrice;
}

// 8. Итоговая стоимость над таблицей должна корректно отображать сумму всех товаров
const crmSubtitlePrice = document.querySelector('.crm__subtitle');
export const renderCrmPrice = () => {
  crmSubtitlePrice.children[0].innerText = `$ ${getTotalPrice()}`;
}
renderCrmPrice();




