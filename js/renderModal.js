import { launchModalEvents, formPriceControl } from './controlModal.js';
import { getEditProd } from './getGoods.js';
const styles = new Map();
const loadStyles = (url) => {
	if (styles.has(url)) {
		return styles.get(url);
	};

	const stylePromise = new Promise((resolve) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;
		link.addEventListener('load', () => {
			resolve();
		})
		document.head.append(link);
	});

	styles.set(url, stylePromise);
	return stylePromise;
};

export const createModalErr = (errMsg = 'Что-то пошло не так') => {
	const modalError = document.createElement('div');
	modalError.className = 'crm-modal-window__error';
	modalError.style.cssText = `
position: absolute;
padding: 20px 30px;
display:flex;
flex-flow: column nowrap;
align-items: center;
width: 350px;
height: 350px;
left: 115px;
top: 28px;
background: #F2F0F9;
box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
`;
	modalError.insertAdjacentHTML('afterbegin', `
<button class="window__error--close" style=" background-image: url(../img/cross.svg); width: 20px;
  height: 20px; backround-repaeat: no-repeat; background-position: center; margin-bottom:60px; align-self: flex-end;" type="button"></button>
<svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:30px;">
<path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
<path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
</svg>
<p class="window__error--msg" style=" font-weight: 700; font-size: 18px; line-height: 22px; letter-spacing: 0.1em; text-transform: uppercase; color: #6E6893;">${errMsg}</p>
`);
	return modalError;
};

// Если мы редактируем товар, то необходимо выполнить запрос на сервер
// GET / api / goods / { id } - получить товар по его ID
// На основе поленных данных в модальном окне должны заполнятся поля
export const renderModal = async (editProdId) => {
	await loadStyles('../css/crm__modal.css');
	const modal = document.createElement('div');
	if (editProdId) {
		const editProd = await getEditProd(editProdId);
		modal.insertAdjacentHTML('afterbegin', `
			<div class="crm-modal-window crm-modal-window--overlay">

			<div class="crm-modal-window__block">
				<button class="crm-modal-window--close" title="close pop-up window"></button>
				<div class="crm-modal-window__title-block">
					<h3 class="crm-modal-window__title">Добавить ТОВАР</h3>
					<span class="crm-modal-window__vendor-code__id">${editProd.id}</span>
				</div>
				<div class="crm-modal-window__line"></div>
				<form class="crm-modal-window__form" id="crm-modal-window__form"
					action="https://jsonplaceholder.typicode.com/posts" method="POST"
					enctype="application/x-www-form-urlencoded">
					<fieldset class="crm-modal-window__list">

						<label class="crm-modal-window__item crm-modal-window__item--naming">
							<span class="crm-modal-window__legend-naming">Наименование</span>

							<input name="product-name" type="text" required="required" value="${editProd.title}">
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--category">
							<span class="crm-modal-window__legend-category">Категория</span>
							<input name="category" type="text" required="required" value="${editProd.category}">
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--counter">
							<span class="crm-modal-window__legend-counter">Единицы измерения</span>

							<select name="units" type="text" required>
								<option value="${editProd.units}" selected>${editProd.units}</option>
								<option value="кг.">Килограммы (кг.)</option>
								<option value="г.">Граммы (г.)</option>
								<option value="шт.">Штуки (шт.)</option>
								<option value="уп.">Упаковки (уп.)</option>
								<option value="л.">Литры (л.)</option>
							</select>
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--discount">
							<span class="crm-modal-window__legend-discount">Дисконт</span>

							<input class="crm-modal-window--checkbox-style" name="discountCheck" type="checkbox" value="No">
							<input class="crm-modal-window__input--fit-size crm-modal-window__input--checked" name="discountText"
								type="text" disabled required>
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--description">
							<span class="crm-modal-window__legend-description">Описание</span>

							<textarea class="crm-modal-window--textarea-big" name="description" form="crm-modal-window__form"
								required>${editProd.description}</textarea>
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--quantity">
							<span class="crm-modal-window__legend-quantity">Количество</span>

							<input name="count" type="number" inputmode="numeric" required min="1"
								oninput="validity.valid||(value='');" value="${editProd.count}">
								
						</label>

						<label class="crm-modal-window__item crm-modal-window__item--price">
							<span class="crm-modal-window__legend-price">Цена</span>

							<input name="price" type="number" inputmode="numeric" required="required" min="1"
								oninput="validity.valid||(value='');" value="${editProd.price}">
								 
						</label>

						<label
							class="crm-modal-window__item crm-modal-window__item--image crm-modal-window__legend-image">Добавить
							изображение
							<input name="image" type="file" accept="image/png, image/jpeg" value="${editProd.image}">
						</label>
						
					</fieldset>

					<div class="crm-modal-window__image-preview"></div>

				</form>
				<div class="crm-modal-window__footer">
					<p class="crm-modal-window__totalPrice">Итоговая стоимость: <span>$ 0.00</span></p>
					<button class="crm-modal-window__send-btn" type="submit" form="crm-modal-window__form">Отредактировать
					</button>
				</div>
			</div>
		</div>
		`);
	} else {
		modal.insertAdjacentHTML('afterbegin', `
		<div class="crm-modal-window crm-modal-window--overlay">

		<div class="crm-modal-window__block">
			<button class="crm-modal-window--close" title="close pop-up window"></button>
			<div class="crm-modal-window__title-block">
				<h3 class="crm-modal-window__title">Добавить ТОВАР</h3>
				<span class="crm-modal-window__vendor-code__id"></span>
			</div>
			<div class="crm-modal-window__line"></div>
			<form class="crm-modal-window__form" id="crm-modal-window__form"
				action="https://jsonplaceholder.typicode.com/posts" method="POST"
				enctype="application/x-www-form-urlencoded">
				<fieldset class="crm-modal-window__list">

					<label class="crm-modal-window__item crm-modal-window__item--naming">
						<span class="crm-modal-window__legend-naming">Наименование</span>

						<input name="product-name" type="text" required="required">
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--category">
						<span class="crm-modal-window__legend-category">Категория</span>

						<input name="category" type="text" required="required">
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--counter">
						<span class="crm-modal-window__legend-counter">Единицы измерения</span>

						<select name="units" type="text" required>
							<option value="">Выбрать...</option>
							<option value="кг.">Килограммы (кг.)</option>
							<option value="г.">Граммы (г.)</option>
							<option value="шт.">Штуки (шт.)</option>
							<option value="уп.">Упаковки (уп.)</option>
							<option value="л.">Литры (л.)</option>
						</select>
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--discount">
						<span class="crm-modal-window__legend-discount">Дисконт</span>

						<input class="crm-modal-window--checkbox-style" name="discountCheck" type="checkbox" value="No">
						<input class="crm-modal-window__input--fit-size crm-modal-window__input--checked" name="discountText"
							type="text" disabled required>
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--description">
						<span class="crm-modal-window__legend-description">Описание</span>

						<textarea class="crm-modal-window--textarea-big" name="description" form="crm-modal-window__form"
							required></textarea>
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--quantity">
						<span class="crm-modal-window__legend-quantity">Количество</span>

						<input name="count" type="number" inputmode="numeric" required min="1"
							oninput="validity.valid||(value='');">
					</label>

					<label class="crm-modal-window__item crm-modal-window__item--price">
						<span class="crm-modal-window__legend-price">Цена</span>

						<input name="price" type="number" inputmode="numeric" required="required" min="1"
							oninput="validity.valid||(value='');">
					</label>

					<label
						class="crm-modal-window__item crm-modal-window__item--image crm-modal-window__legend-image">Добавить
						изображение
						<input class="item__preview-file" name="image" type="file" value="" accept="image/png, image/jpeg">
					</label>
					
				</fieldset>
				<div class="crm-modal-window__image-preview"></div>

			</form>
			<div class="crm-modal-window__footer">
				<p class="crm-modal-window__totalPrice">Итоговая стоимость: <span>$ 0.00</span></p>
				<button class="crm-modal-window__send-btn" type="submit" form="crm-modal-window__form">Добавить товар
				</button>
			</div>
		</div>
	</div>
	`);
	};
	// crm - modal - window--visible
	document.body.prepend(modal);
	formPriceControl();

	editProdId ? launchModalEvents(editProdId) : launchModalEvents();
};
