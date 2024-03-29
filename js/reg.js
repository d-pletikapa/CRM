// ### Задание №1
// > В форме модального окна
// > reg1 поле наименование, категория и описание разрешите 
// > ввод только кириллицу и пробел

// > reg2 поле единицы измерения только кириллицу

// > reg3 поле количество, дисконт и цена разрешите ввод 
// > только цифр
// ### Задание №2
// > Описание минимум 80 символов
// > Отправку формы разрешите только 
// > если все поля заполнены (кроме дисконт)
export const reg1 = /[^а-яА-Я\s]+/g;
export const reg2 = /[^а-яА-Я\.]*/g;
export const reg3 = /[^\d]+/g;