import { renderNewProduct } from './renderCrm.js';
import { getTotalPrice } from './controlCrm.js';
import { createModalErr } from './renderModal.js';
import { debounce } from './controlCrm.js';
import { renderCrmPrice } from './renderCrm.js';
import { URL, fetchGoods } from './getGoods.js';


export const formPriceControl = () => {
	const modalWindowForm = document.querySelector(
		'.crm-modal-window__form');
	const modalWindowTotalPrice = document.querySelector(
		'.crm-modal-window__totalPrice');

	// 7. Итоговая стоимость в модальном окне
	// должна правильно высчитываться при смене фокуса
	const renderFormPrice = async () => {
		const totalPrice = await
			fetchGoods(URL, {
				method: 'get',
				callback: getTotalPrice,
			});
		modalWindowTotalPrice.children[0].innerText = `$ ${totalPrice}`;
	};

	renderFormPrice();

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
}


//EVENTS
export const launchModalEvents = (editProdId) => {
	const modalWindowForm = document.querySelector(
		'.crm-modal-window__form');
	const modalWindowCheckbox = document.querySelector(
		'.crm-modal-window--checkbox-style');
	const modalWindowCheckboxInput = document.querySelector(
		'.crm-modal-window__input--fit-size');
	const modalWindowOverlay = document.querySelector(
		'.crm-modal-window--overlay');

	// modal close
	const closeModal = () => {
		// modalWindowOverlay.classList.add('crm-modal-window--visible');
		modalWindowOverlay.remove();
	};

	// Реализовать добавление нового товара из формы в таблицу 1
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

	const sendAndRenderProd = (formData, id) => {
		let method = 'POST';
		let body = createNewProduct(formData);
		let url = URL;
		let replace = false;

		if (id) {
			method = 'PATCH';
			body = JSON.stringify(createNewProduct(formData));
			url = `${URL}/${id}`;
			replace = true;
		}

		renderNewProduct(fetchGoods(url,
			{
				method: method,
				body: body,
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
		), replace, id);
	}

	document.addEventListener('keydown', e => {
		if (e.code === 'Escape') {
			closeModal(); // закрываем модальное окно на кнопку esc
		}
	});

	modalWindowOverlay.addEventListener('click', e => {
		const target = e.target;
		if (target === modalWindowOverlay ||
			target === target.closest('.crm-modal-window--close')) {
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
	});

	modalWindowForm.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		sendAndRenderProd(formData, editProdId);
		renderCrmPrice();
	});

};