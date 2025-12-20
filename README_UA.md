
# SimpleModal

SimpleModal - це простий та легкий JS-плагін для створення і для роботи з модальними вікнами.
<br>
<br>

## Demo

[Дивитись demo](https://ori4510.github.io/SimpleModal/docs/index_ua.html)
<br>
<br>

## Особливості

* Просте налаштування
* 2 шляхи використання (динамічне створення і використовуючи html-шаблон розміщений в коді сторінки)
* 3 типи модальних вікон
* Колбек-функція при відкритті модального вікна
* Колбек-функція при закритті модального вікна
* Колбек-функція при підтвердженні у модальному вікні типу confirm
* Колбек-функція при відміні у модальному вікні типу confirm
* 2 розміри ширини модального вікна. Стандартне і широке.
<br>

## Установка

Підключіть CSS-файл до HTML-сторінки.

```html
<link rel="stylesheet" href="src/simple-modal.min.css">
```

Підключіть плагін перед закриваючим тегом &lt;/body&gt; на сторінці.

```html
<script src="src/simple-modal.min.js"></script>
```
<br>

## Документація

SimpleModal має 3 типи:

### Simple modal

Звичайне просте модальне вікно, контентом може бути що завгодно: текст, форма, таблиця, зображення і т.д.

```javascript
const myModal = Modal({
	modalId: 'myModalId',
	title: 'My title',
	content: 'My content',
}).createModal();
```
<br>

### Confirm modal

Має 2 кнопки 'Ok' та 'Cancel'. Можна використовувати якщо потрібна якась дія з підтвердженням, щось видалити, наприклад. Також можна додати title і/або content.

Підтвердження спрацює при натисканні клавіши Enter, а також клікнувши по кнопці 'Ok'. Після чого запуститься callback onConfirm, якщо передати в нього функцію.

Відміна спрацює при натисканні клавіші Escape, а також клікнувши по масці, close-button, або по кнопці 'Cancel'. Після чого запуститься callback onCancel, якщо передати в нього функцію.

```javascript
const myConfirmModal = Modal({
	modalId: 'myConfirmModalId',
	title: 'Confirm Modal',
	content: 'Content',
	type: 'confirm',
	modalConfirmBtnText: 'Yes',
	modalCancelBtnText: 'No',
	onConfirm: () => {
		alert('Confirmed');
	},
	onCancel: () => {
		alert('Canceled');
	},
}).createModal();
```
<br>

### Info modal

Модальне вікно з кнопкою 'Ok', яка просто закриває це вікно. Можна на нього повісити якусь свою подію.

```javascript
const myInfoModal = Modal({
	modalId: 'myInfoModalId',
	title: 'Info Modal',
	content: 'Content',
	type: 'info',
	modalInfoBtnText: 'Yes',
}).createModal();
```
<br>

### Get HTML modal

Якщо вам не потрібно або ви не хочете створювати модальне вікно динамічно за допомогою JS, ви можете розмістити на сторінці html-шаблон модального вікна з вашими даними. Отримати його, як модальне вікно, для подальшої роботи можна за допомогою методу getModal().

Крок 1. Вставте шаблон на свою сторінку. Не забудьте змінити **id**

```html
<div class="dom-modal-mask" id="my_modal_id">
	<div class="dom-modal-window">
		<span class="dom-modal-exit dom-modal-close-with-click"><svg width="22" height="22" stroke-width="2" stroke="currentColor" stroke-linecap="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 6 6 18M6 6l12 12"></path></svg></span>
		<div class="dom-modal-container">
			<h4 class="dom-modal-title">My_Modal_Title</h4>
			<div class="dom-modal-content">
				<!-- // your_content -->
			</div>

			<!-- leave if you use type: confirm -->
			<div class="dom-modal-btn-wrap">
				<button type="button" class="btn dom-modal-close-with-click dom-modal-btn-confirm">Ok</button>
				<button type="button" class="btn dom-modal-close-with-click dom-modal-btn-cancel">Cancel</button>
			</div>
			<!-- /leave if you use type: confirm -->

			<!-- leave if you use type: info -->
			<div class="dom-modal-btn-wrap">
				<button type="button" class="btn dom-modal-close-with-click dom-modal-btn-info">Ok</button>
			</div>
			<!-- /leave if you use type: info -->

		</div>
	</div>
</div>
```
<br>

Крок 2. Отримуємо модальне вікно і поміщаємо екземпляр у змінну

**modalId** - id модального вікна з html-коду, того, що в кроці 1.

```javascript
const modalFromHtml = Modal({
	modalId: 'my_modal_id',
}).getModal();
```
<br>


## Параметри

Детальніше [дивіться в demo](https://ori4510.github.io/SimpleModal/docs/index_ua.html)
<br>
<br>

### Ідентифікатор модального вікна

modalId - якщо використовуєте createModal() тоді modalId потрібно придумати. Дублі id призведуть до помилки. А якщо використовуєте getModal() тоді modalId повинен відповідати id який в html-шаблоні.

Це єдиний обов'язковий параметр.

> **Тип**: string

```javascript
modalId: 'myModalId'
```
<br>

### Заголовок

title - заголовок для модального вікна. Є підтримка HTML-тегів.

> **Тип**: string | false

> **Default**: false

```javascript
title: 'My_title'
```
<br>

### Контент

content - контентом може бути що завгодно: текст, форма, таблиця, зображення і т.д. Є підтримка HTML-тегів.

> **Тип**: string | false

> **Default**: false

```javascript
content: 'My content'
```
<br>

### Тип модального вікна

type - тип модального вікна. 

> **Тип**: string

> **Default**: 'simple'

**Можливі значення**: simple | confirm | info

```javascript
type: 'confirm'
```
<br>

### Відкривати модальне вікно з кнопки

openWithBtn - дозволити відкривати модальне вікно з кнопки/кнопок вставлених в html-код на сторінці.

Винесено в окрему опцію, щоб не вішати зайвий EventListener, якщо запуск з кнопки на сторінці не потрібний.

Детальніше [дивіться в demo](https://ori4510.github.io/SimpleModal/docs/index_ua.html#open_with_btn)

> **Тип**: boolean

> **Default**: false

**Можливі значення**: true | false

```javascript
openWithBtn: true
```

Шаблон кнопки:

```html
<button data-dom-modal="myModalId">Open_modal_window</button>
```
<br>

### Ширший розмір модального вікна

wideModal - додає клас `'dom-modal-wide'`, який розширяє максимальну ширину модального вікна до 1200px. 

Стандарний розмір вікна - 615px.

> **Тип**: boolean

> **Default**: false

**Можливі значення**: true | false

```javascript
wideModal: true
```
<br>

### Назва кнопки для вікна типу 'info'

modalInfoBtnText - текст для кнопки.

> **Тип**: string

> **Default**: 'Ok'

```javascript
modalInfoBtnText: 'Button_name'
```
<br>

### Назва кнопки підтвердження для вікна типу 'confirm'

modalConfirmBtnText - текст для кнопки підтвердження.

> **Тип**: string

> **Default**: 'Ok'

```javascript
modalConfirmBtnText: 'Button_name'
```
<br>

### Назва кнопки відміни для вікна типу 'confirm'

modalCancelBtnText - текст для кнопки відміни.

> **Тип**: string

> **Default**: 'Cancel'

```javascript
modalCancelBtnText: 'Button_name'
```
<br>

### Метод onOpen

onOpen - запускається при відкритті модального вікна, якщо передати в нього функцію.

> **Тип**: function

> **Default**: null

```javascript
onOpen: () => {
	// some code
}
```
<br>

### Метод onClose

onClose - запускається при закритті модального вікна, якщо передати в нього функцію.

> **Тип**: function

> **Default**: null

```javascript
onClose: () => {
	// some code
}
```
<br>

### Метод onConfirm

onConfirm - запускається при підтвердженні в модальному вікні, якщо передати в нього функцію. Працює тільки для вікон type: 'confirm'.

Підтвердження спрацює при натисканні клавіши Enter, а також клікнувши по кнопці 'Ok'.

> **Тип**: function

> **Default**: null

```javascript
onConfirm: () => {
	// some code
}
```
<br>

### Метод onCancel

onCancel - запускається при відміні в модальному вікні, а також при закритті модального вікна, якщо передати в нього функцію. Працює тільки для вікон type: 'confirm'.

Відміна спрацює при натисканні клавіші Escape, а також клікнувши по кнопці 'Cancel', по масці або close-button.

> **Тип**: function

> **Default**: null

```javascript
onCancel: () => {
	// some code
}
```
<br>

### Знищення екземпляру

destroyModal - знищує екземпляр класу. Також буде знищено DOM-елемент.

```javascript
instanceModal.destroyModal();
```

<br>

### Шрифт

Шрифт для модального вікна не прописаний, і буде наслідуватись від батьківсього тега.
Якщо ви хочете вказати для заголовку і/або контенту інший шрифт, це можна зробити в CSS.

<br>

## License

MIT license