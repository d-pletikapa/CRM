import { renderNewProduct } from './renderCrm.js';
import { getTotalPrice } from './controlCrm.js';
import { createModalErr } from './renderModal.js';
import { debounce } from './controlCrm.js';
import { TheURL, fetchGoods } from './getGoods.js';
import {reg1, reg2, reg3} from './reg.js';

export const formPriceControl = () => {
	const modalWindowForm = document.querySelector(
		'.crm-modal-window__form');
	const modalWindowTotalPrice = document.querySelector(
		'.crm-modal-window__totalPrice');
	const modalWindowImagePreview = document.querySelector('.crm-modal-window__image-preview');
	const modalWindowPreviewFile = document.querySelector('.item__preview-file');


	modalWindowPreviewFile.addEventListener('change', () => {
		let files = modalWindowPreviewFile.files;
		let file = files[0];
		if (files.length > 0 && file.size <= 1e6) {
			const src = URL.createObjectURL(file);
			console.log(file);
			modalWindowImagePreview.innerHTML = `
			<img class="preview" src="${src}" width="200px">
			`;
		} else if (file.size >= 1e6) {
			modalWindowImagePreview.innerHTML = ``;
			console.info('Изображение не должно превышать размер 1 Мб');
			const imageErr = document.createElement('p');
			imageErr.innerText = `Изображение не должно превышать размер 1 Мб`;
			imageErr.className = 'preview-err';
			imageErr.style.cssText = `
			font-weight: 700;
			font-size: 14px;
			line-height: 17px;
			text-align: center;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: #D80101;`;
			modalWindowImagePreview.append(imageErr);
		};
	});


	// 7. Итоговая стоимость в модальном окне
	// должна правильно высчитываться при смене фокуса
	const renderFormPrice = async () => {
		const totalPrice = await
			fetchGoods(TheURL, {
				method: 'get',
				callback: getTotalPrice,
			});
		modalWindowTotalPrice.children[0].innerText = `$ ${totalPrice}`;
	};

	renderFormPrice();

	const dynamicFormPrice = async () => {
		let summary = await
			fetchGoods(TheURL, {
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
	const inputNaming = document.querySelector(
		'.crm-modal-window__item--naming input');
	const inputCategory = document.querySelector(
		'.crm-modal-window__item--category input');
	const inputDescription = document.querySelector(
		'.crm-modal-window--textarea-big');
	const inputCounter = document.querySelector(
		'.crm-modal-window__item--counter select');
	const inputQuantity = document.querySelector(
		'.crm-modal-window__item--quantity input');
	const inputPrice = document.querySelector(
		'.crm-modal-window__item--price input');
	const inputDiscount = document.querySelector(
		'.crm-modal-window__input-discount');
	const descriptionLegend = document.querySelector(
		'.crm-modal-window__legend-description');

	// modal close
	const closeModal = () => {
		modalWindowOverlay.remove();
	};

	const removeSubmitBtn = () => {
		const submitBtn = modalWindowOverlay.querySelector('.crm-modal-window__send-btn');
		submitBtn.remove();
	}

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
		return newProduct;
	};

	const sendAndRenderProd = (formData, id) => {
		let method = 'POST';
		let body = createNewProduct(formData);
		let url = TheURL;
		let replace = false;

		if (id) {
			method = 'PATCH';
			url = `${TheURL}/${id}`;
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

						closeErrBtn.addEventListener('click', () => {
							const modalError = document.querySelector('.crm-modal-window__error');
							modalWindowForm.removeChild(modalError);
						});
						console.warn(err, data);
					}
					modalWindowForm.textContent = `Товар успешно заведен в систему, id товара ${data.id}`;
					console.info('Товар сохранен на сервере:', data.id);
					removeSubmitBtn();
					setTimeout(closeModal, 4000);
					setTimeout(modalWindowForm.reset(), 3900);
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
	});

	modalWindowForm.addEventListener('input', ({ target }) => {
		switch (target) {
			case inputQuantity:
			case inputPrice:
			case inputDiscount:
				target.value = target.value.replace(reg3, '');
				break;
			case inputCounter:
				target.value = target.value.replace(reg2, '');
				break;
			case inputNaming:
			case inputCategory:
				target.value = target.value.replace(reg1, '');
				break;
			case inputDescription:
				target.value = target.value.replace(reg1, '');
				const minLength = 80;
				const value = target.value;
				if (value.length <= minLength) {
					descriptionLegend.textContent = `Описание ${value.length}/${minLength}`;
					target.setCustomValidity("Минимальное количество символов: " + minLength);
				} else {
					descriptionLegend.textContent = `Описание ✔`;
					target.setCustomValidity("");
				};
				break;
		};  
	});

};
