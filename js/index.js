import { URL, fetchGoods } from './getGoods.js';
import { renderCrmPrice, renderGoods } from './renderCrm.js';
import './renderModal.js';
{
	const init = () => {
		fetchGoods(URL, {
			method: 'get',
			callback: renderGoods,
		});
		// renderGoods(goods);
		renderCrmPrice();
	};
	init();
}

// В проекте CRM

// Задание №1

// Ваша задача интегрировать стили(ассинхронно) перед открытием модального окна

// Вырезаем модальное окно из вёрстки, модальное окно создаем скриптами

// Модальное окно открывается при клике на кнопку "Добавить товар" или иконку редактировать около товара

// Если мы редактируем товар, то необходимо выполнить запрос на сервер

// GET / api / goods / { id } - получить товар по его ID

// На основе поленных данных в модальном окне должны заполнятся поля

