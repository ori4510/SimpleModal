
# SimpleModal

SimpleModal - is a simple and lightweight JS plugin for creating and working with modal windows.
<br>
<br>

[Документація українською](README_UA.md)

## Demo

[See demo](https://ori4510.github.io/SimpleModal/)
<br>
<br>

## Features

* Easy setup
* 2 usage paths: (dynamic creation and using an HTML template embedded in the page's code)
* 3 types of modals
* Callback function on modal open
* Callback function on modal close
* Callback function on confirmation in a 'confirm' type modal
* Callback function on cancellation in a 'confirm' type modal
* 2 modal widths: standard and wide
<br>

## Installation

Connect the CSS file to your HTML page:.

```html
<link rel="stylesheet" href="src/simple-modal.min.css">
```

Connect the plugin before the closing &lt;/body&gt; tag in your page.

```html
<script src="src/simple-modal.min.js"></script>
```
<br>

## Documentation

SimpleModal has 3 types:

### Simple modal

A basic, simple modal window, the content can be anything: text, form, table, image, etc.

```javascript
const myModal = Modal({
	modalId: 'myModalId',
	title: 'My title',
	content: 'My content',
}).createModal();
```
<br>

### Confirm modal

Has 2 buttons: 'Ok' and 'Cancel'. Can be used when a confirmation is needed, for example, to delete something. You can also add a title and/or content. 

Confirmation triggers on pressing the Enter key or clicking the 'Ok' button, after which the onConfirm callback will execute if a function is provided. 

Cancellation triggers on pressing the Escape key, or by clicking the mask, close button, or the 'Cancel' button, after which the onCancel callback will execute if a function is provided.

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

A modal window with an 'Ok' button that simply closes this modal. You can attach your own event to it.

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

If you don't need or want to create a modal window dynamically using JS, you can place an HTML template of the modal window with your data on the page. You can get it as a modal for further work using the getModal() method.

Step 1: Insert the template into your page. Don't forget to change the **id**.

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

Step 2: Get the modal window and place the instance into a variable.

**modalId** - the id of the modal window from the HTML code in step 1.

```javascript
const modalFromHtml = Modal({
	modalId: 'my_modal_id',
}).getModal();
```
<br>


## Parameters

For more details, [see the demo](https://ori4510.github.io/SimpleModal/)
<br>
<br>

### Modal window ID

modalId - If you are using createModal(), you need to create a unique modalId. Duplicate ids will cause an error. However, if you are using getModal(), the modalId must match the id in the HTML template.

This is the only mandatory parameter.

> **Type**: string

```javascript
modalId: 'myModalId'
```
<br>

### Title

title - title for the modal window. Supports HTML tags.

> **Type**: string | false

> **Default**: false

```javascript
title: 'My_title'
```
<br>

### Content

content - The content can be anything: text, form, table, image, etc. Supports HTML tags.

> **Type**: string | false

> **Default**: false

```javascript
content: 'My content'
```
<br>

### Type of the modal window

type - type of the modal window. 

> **Type**: string

> **Default**: 'simple'

**Possible values**: simple | confirm | info

```javascript
type: 'confirm'
```
<br>

### Open the modal window with a button

openWithBtn - Allow opening the modal window from buttons embedded in the page’s code.

Separated into a distinct option to avoid adding unnecessary EventListeners if opening from a button on the page isn’t needed.

For more details, [see the demo](https://ori4510.github.io/SimpleModal/#open_with_btn)

> **Type**: boolean

> **Default**: false

**Possible values**: true | false

```javascript
openWithBtn: true
```

Button template:

```html
<button data-dom-modal="myModalId">Open_modal_window</button>
```
<br>

### Wider modal window size

wideModal - adds the class `'dom-modal-wide'`, which increases the maximum width of the modal window to 1200px.

The standard window size is 615px.

> **Type**: boolean

> **Default**: false

**Possible values**: true | false

```javascript
wideModal: true
```
<br>

### Button text for 'info' modal

modalInfoBtnText - button text.

> **Type**: string

> **Default**: 'Ok'

```javascript
modalInfoBtnText: 'Button_name'
```
<br>

### Button text for 'confirm' modal

modalConfirmBtnText - text for the confirmation button.

> **Type**: string

> **Default**: 'Ok'

```javascript
modalConfirmBtnText: 'Button_name'
```
<br>

### Button text for the 'confirm' modal cancel button

modalCancelBtnText - text for the cancel button.

> **Type**: string

> **Default**: 'Cancel'

```javascript
modalCancelBtnText: 'Button_name'
```
<br>

### Method onOpen

onOpen - triggers when the modal opens, if you pass a function to it.

> **Type**: function

> **Default**: null

```javascript
onOpen: () => {
	// some code
}
```
<br>

### Method onClose

onClose - triggers when the modal closes, if you pass a function to it.

> **Type**: function

> **Default**: null

```javascript
onClose: () => {
	// some code
}
```
<br>

### Method onConfirm

onConfirm - triggers on confirmation in the modal window, if you pass a function to it. Works only for type: 'confirm'.

Confirmation triggers on pressing the Enter key, as well as clicking the 'Ok' button.

> **Type**: function

> **Default**: null

```javascript
onConfirm: () => {
	// some code
}
```
<br>

### Method onCancel

onCancel - triggers on cancellation in the modal window, as well as when closing the modal window, if you pass a function to it. Works only for type: 'confirm'.

Cancellation triggers on pressing the Escape key, as well as clicking the 'Cancel' button, the mask, or the close button.

> **Type**: function

> **Default**: null

```javascript
onCancel: () => {
	// some code
}
```
<br>

### Destruction

destroyModal - destruction of a class instance. The DOM element will also be destroyed.

```javascript
instanceModal.destroyModal();
```

<br>

### Font

The font for the modal window is not specified and will inherit from the parent tag.
If you want to specify a different font for the title and/or content, you can do so in the CSS.

<br>

## License

MIT license