import './renderData.js';
import './modal.js';

const promise = new Promise(
	(resolve) => {
		setTimeout(resolve, 2000, 'Вернется вместо вызова промиса11');
	});

const promise2 = new Promise(
	(resolve) => {
		setTimeout(resolve, 3000, 'Вернется вместо вызова промиса22');
	});

(
	async () => {
		console.log(await promise);
		console.log(await promise2);

		console.log(await promise);
		console.log(await promise2);
	}
)();
