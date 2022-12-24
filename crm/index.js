// 1. Создайте функцию createRow, которая будет получать объект и на основе объекта формировать элемент <tr> с <td> внутри
// 2. Создайте функцию renderGoods, принимает один параметр массив с объектами
// Функция renderGoods перебирает массив и вставляет строки, созданные на основе createRow, в таблицу (советую использовать метод map)

const goods = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "category": "mobile-phone",
    "units": "шт",
    "count": 3,
    "price": 27000,
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "category": "toys",
    "price": 4000,
    "units": "шт",
    "count": 1,
  },
]

const createRow = (obj) => {
  const tableBody = document.querySelector('.crm__table__t tbody');
  tableBody.insertAdjacentHTML('beforeend', `<tr>
                     <td>${obj.id}</td>
                     <td>${obj.title}</td>
                     <td>${obj.category}</td>
                     <td>${obj.units}</td>
                     <td>${obj.count}</td>
                     <td>$${obj.price}</td>
                     <td>$${obj.price * obj.count}</td>
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
  })
  return goods;
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
