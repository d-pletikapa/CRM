import { URL, fetchGoods } from './getGoods.js';
import pageElements from './getPageData.js';
const {
	crmSubtitlePrice,
	modalWindowProductId,
} = pageElements;
import { getTotalPrice } from './controlCrm.js';

// 1. Создайте функцию createRow, которая будет получать
// объект и на основе объекта формировать элемент <tr> с <td> внутри
const createRow = (obj) => {
	const tableBody = document.querySelector('.crm__table__t tbody');
	const newRow = document.createElement('tr');
	newRow.insertAdjacentHTML('afterbegin', `
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
		 `);

	// const editBtn = newRow.querySelector(
	// 	'.crm__table__prod-btn--edit');

	// editBtn.addEventListener('click', ({ target }) => {
	// 	const closestRow = target.closest('tr');
	// 	const rowProductId = closestRow.firstElementChild.textContent;
	// 	renderModal(rowProductId);
	// });
	tableBody.append(newRow);
};

const replaceRow = (obj, id) => {
	const allRows = document.querySelectorAll('.crm__table__t tbody tr');
	const newRow = document.createElement('tr');
	newRow.innerHTML = `
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
	`;
	// allRows.forEach(item => {
	// 	if (item.firstElementChild.textContent == id) {
	// 		item.parentNode.replaceChild(newRow, item);
	// 		item.addEventListener('click', () => {
	// 			const rowProductId = +closestRow.firstElementChild.textContent;
	// 			renderModal(rowProductId);
	// 		});
	// 	};
	// });
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
	// setEventsAllEditBtns();
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

export const renderNewProduct = async (newProduct, replace, id) => {
	if (replace === true) {
		replaceRow(await newProduct, id);
	} else {
		createRow(await newProduct);
	}
	renderCrmPrice();
};

export const removeTableRow = (closestRow) => {
	const rowProductId = closestRow.firstElementChild.textContent;

	let count = 6;
	closestRow.innerHTML = `
<td>Данные удалены, скрытие через: ${count}</td>
`;

	setInterval(() => {
		if (count <= 0) {
			closestRow.innerHTML = `
			<td>Готово</td>`;
			setTimeout(() => {
				closestRow.remove();
			}, 2000);
			clearInterval();
		} else {
			count--;
			closestRow.innerHTML = `
				<td> Данные удалены, скрытие через: ${count}</td>
					`;
		};
	}, 1000);



	return rowProductId;
};

export const renderNewId = (id) => {
	modalWindowProductId.innerText = `id: ${id} `;
};

