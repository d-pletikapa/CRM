import { URL, fetchGoods } from './getGoods.js';
import pageElements from './getPageData.js';
const {
	crmSubtitlePrice,
	modalWindowProductId,
	modalWindowTotalPrice,
} = pageElements;
import { getTotalPrice } from './controlCrm.js';

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
         <button type="button" class="crm__table__prod-btn
          crm__table__prod-btn--img" data-pic="/img/prodCover.jpg">
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
export const renderGoods = (err, data) => {
	if (err) {
		console.warn(err, data);
		const tableBody = document.querySelector('.crm__table__t tbody');
		tableBody.insertAdjacentHTML('beforeend', `
    <tr>
		<span>${err}</span>
    </tr>`,
		);
	}
	data.map((item) => createRow(item));
};

// 8. Итоговая стоимость над таблицей
// должна корректно отображать сумму всех товаров
export const renderCrmPrice = async () => {
	const totalPrice = await
		fetchGoods(URL, {
			method: 'get',
			callback: getTotalPrice,
		});
	crmSubtitlePrice.children[0].innerText = `$ ${totalPrice}`;
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

export const renderNewProduct = async (newProduct) => {
	// для рендера берется последний объект массива
	createRow(await newProduct);
	console.log(newProduct);
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
export const renderFormPrice = async () => {
	const totalPrice = await
		fetchGoods(URL, {
			method: 'get',
			callback: getTotalPrice,
		});
	modalWindowTotalPrice.children[0].innerText = `$ ${totalPrice}`;
};
