import pageElements from './getPageData.js';
import {
	renderNewId,
	renderFormPrice,
	renderNewProduct,
	renderCrmPrice,
	removeGoods,
	removeTableRow,
} from './renderCrm.js';
import { URL, fetchGoods } from './getGoods.js';
const {
	modalWindowForm,
	modalWindowCheckbox,
	modalWindowCheckboxInput,
	modalWindowTotalPrice,
	btnAddProduct,
	modalWindowOverlay,
	table,
	createModalErr,
} = pageElements;
const closeModal = () => {
	modalWindowOverlay.classList.add('crm-modal-window--visible');
};

const debounce = (func, timeout = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
// const handle = (arg1, arg2) => {
// 	console.log(count++);
// };
// const debounceHandle = debounce(handle);
// const circle = document.querySelector('.circle');
// circle.addEventListener('mousemove', debounceHandle);

// 7. Итоговая стоимость в модальном окне
// должна правильно высчитываться при смене фокуса
export const getTotalPrice = (err, data) => {
	if (err) {
		console.warn(err, data);
		crmSubtitlePrice.children[0].innerText = err;
		modalWindowTotalPrice.children[0].innerText = err;
		return;
	}
	let totalPrice = 0;

	for (const obj of data) {
		totalPrice += (obj.price * obj.count);
	}
	return totalPrice;
};

// Реализовать добавление нового товара из формы в таблицу
const createNewProduct = (formData) => {
	const newProduct = Object.fromEntries(formData);
	// Переименовать свойство объекта
	// (для соответствия массиву goods) с наследованием параметров чтения
	Object.defineProperty(
		newProduct,
		'title',
		Object.getOwnPropertyDescriptor(newProduct, 'product-name'),
	);
	delete newProduct['product-name'];
	// newProduct.id = tempId.value; // добавляем id
	// goods.push(newProduct);
	return newProduct;
};

const dynamicFormPrice = async () => {
	let summary = await
		fetchGoods(URL, {
			method: 'get',
			callback: getTotalPrice,
		});
	summary += (modalWindowForm.count.value * modalWindowForm.price.value);
	modalWindowTotalPrice.children[0].innerText = `$ ${summary}`;
};

modalWindowForm.count.addEventListener('input', debounce(dynamicFormPrice, 1000));

modalWindowForm.price.addEventListener('input', debounce(dynamicFormPrice, 1000));

// modal open
btnAddProduct.addEventListener('click', () => {
	// tempId.createNewId();
	// renderNewId(tempId.value);
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

	renderNewProduct(fetchGoods(URL,
		{
			method: 'POST',
			body: createNewProduct(formData),
			callback(err, data) {
				if (err) {
					modalWindowForm.append(createModalErr(err));
					const closeErrBtn = document.querySelector('.window__error--close');

					closeErrBtn.addEventListener('click', (e) => {
						const modalError = document.querySelector('.crm-modal-window__error');
						modalWindowForm.removeChild(modalError);
					});
					console.warn(err, data);
				}
				modalWindowForm.textContent = `Товар успешно заведен в систему, id товара ${data.id}`;
				console.info('Товар создан:', data.id);
				setTimeout(closeModal, 4000);
				setTimeout(modalWindowForm.reset(), 4000);
				return data;
			},
			headers: {
				'Content-Type': 'application/json',
			}
		}
	));
	renderCrmPrice();
});

// delete row
const createPopupCoverWindow = (thisBtnPreview) => {
	const prodPreviewWindow = open(
		'about:blank',
		'',
		`popup, width=600, height=600,
         top=${screen.height / 2 - 300},
         left=${screen.width / 2 - 300}`);


	prodPreviewWindow.document.body.style.backgroundImage =
		`url(http://localhost:63342/JS-4-00${thisBtnPreview.dataset.pic})`;

	console.log(thisBtnPreview.dataset.pic);
};
table.addEventListener('click', e => {
	const target = e.target;
	if (target === target.closest('.crm__table__prod-btn--del')) {
		const closestRow = target.closest('tr');
		const rowProductId = +closestRow.firstElementChild.textContent;

		fetchGoods(`${URL}/${rowProductId}`, {
			method: 'delete',
			callback: (err, data) => {
				if (err) {
					console.warn(err, data);
					closestRow.textContent = err;
					return;
				}
				removeTableRow(closestRow);
			},
		});

	} else if (target === target.closest('.crm__table__prod-btn--img')) {
		const thisBtnPreview = target.closest('.crm__table__prod-btn--img');
		createPopupCoverWindow(thisBtnPreview);
	}
});

