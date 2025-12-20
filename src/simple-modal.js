class SimpleModal {
	static idsList = [];
	static scrollbarWidth = SimpleModal.getScrollWidth();
	_boundCloseModalWithEsc = this._closeModalWithEsc.bind(this);
	_boundCloseModalClick = this._closeModalClick.bind(this);
	_boundCloseModalClickWithEnter = this._closeModalWithEnter.bind(this);
	_modalElem = null;

	/**
	 * @param {Object} options
	 * @param {string} [options.modalId] - Ідентифікатор модального вікна
	 * @param {string} [options.title] - Заголовок модального вікна
	 * @param {string} [options.content] - Контент модального вікна
	 * @param {'simple' | 'info' | 'confirm'} [options.type] - Тип модального вікна (simple, info, confirm)
	 * @param {boolean} [options.openWithBtn] - Дозволити відкривати модальне вікно з кнопки/кнопок вбудованих в HTML
	 * @param {string} [options.modalInfoBtnText] - Текст кнопки інформаційного модального вікна
	 * @param {string} [options.modalConfirmBtnText] - Текст кнопки підтвердження
	 * @param {string} [options.modalCancelBtnText] - Текст кнопки скасування
	 * @param {boolean} [options.wideModal] - Вказує, чи є модальне вікно широким
	 * @param {function} [options.onOpen] - Колбек-функція при відкритті модального вікна
	 * @param {function} [options.onClose] - Колбек-функція при закритті модального вікна
	 * @param {function} [options.onConfirm] - Колбек-функція при підтвердженні, лише для type:confirm
	 * @param {function} [options.onCancel] - Колбек-функція при відмові, лише для type:confirm
	 */
	constructor({
		modalId = null,
		title = false,
		content = false,
		type = 'simple',
		openWithBtn = false,
		modalInfoBtnText = 'Ok',
		modalConfirmBtnText = 'Ok',
		modalCancelBtnText = 'Cancel',
		wideModal = false,
		onOpen = null,
		onClose = null,
		onConfirm = null,
		onCancel = null,
	}) {
		this.modalId = modalId;
		this.title = title;
		this.content = content;
		this.type = type;
		this.openWithBtn = openWithBtn;
		this.modalInfoBtnText = modalInfoBtnText;
		this.modalConfirmBtnText = modalConfirmBtnText;
		this.modalCancelBtnText = modalCancelBtnText;
		this.wideModal = wideModal;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onConfirm = onConfirm;
		this.onCancel = onCancel;

		if (SimpleModal.idsList.includes(modalId)) {
			console.error('Duplicate id: ' + modalId);
			return;
		} else {
			SimpleModal.idsList.push(modalId);
		}

		return {
			createModal: () => this._renderModal(),
			getModal: () => this._getModal(),
		}
	}

	static getScrollWidth() {
		const elem = document.createElement('div');
		elem.style.overflowY = 'scroll';
		elem.style.width = '50px';
		elem.style.height = '50px';
		document.body.append(elem);
		const result = elem.offsetWidth - elem.clientWidth;
		elem.remove();
		return result;
	}

	_renderModal() {
		let modalHtml = this._createModal();

		if (this.type === 'info') {
			modalHtml = this._createInfoModal(modalHtml);
		}

		if (this.type === 'confirm') {
			modalHtml = this._createConfirmModal(modalHtml);
		}

		if (modalHtml) {
			document.body.append(modalHtml);
		}

		if (this.openWithBtn) {
			this._openWithBtn();
		}

		return this;
	}

	_getModal() {
		if (!this.modalId) {
			console.error('You must specify the \'modalId\' argument when calling Modal().');
		}

		if (this.openWithBtn) {
			this._openWithBtn();
		}

		return this;
	}

	_createModal() {
		if (!this.modalId) {
			console.error('You must specify the \'modalId\' argument when calling Modal().');
			return false;
		}

		const modalBox = document.createElement('div');
		modalBox.classList.add('dom-modal-mask');
		modalBox.id = this.modalId;

		const modalWindow = document.createElement('div');
		modalWindow.classList.add('dom-modal-window');

		if (this.wideModal === true) {
			modalWindow.classList.add('dom-modal-wide');
		}

		const modalExitBtn = document.createElement('span');
		modalExitBtn.classList.add('dom-modal-exit', 'dom-modal-close-with-click');
		modalExitBtn.innerHTML = '<svg width="22" height="22" stroke-width="2" stroke="currentColor" stroke-linecap="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 6 6 18M6 6l12 12"></path></svg>';

		const modalContainer = document.createElement('div');
		modalContainer.classList.add('dom-modal-container');

		if (this.title) {
			const modalTitle = document.createElement('h4');
			modalTitle.classList.add('dom-modal-title');
			modalTitle.innerHTML = this.title;
			modalContainer.append(modalTitle);
		}

		if (this.content) {
			const modalContent = document.createElement('div');
			modalContent.classList.add('dom-modal-content');
			modalContent.innerHTML = this.content;
			modalContainer.append(modalContent);
		}

		modalWindow.append(modalExitBtn, modalContainer);
		modalBox.append(modalWindow);

		return modalBox;
	}

	_createInfoModal(modal) {
		const container = modal.querySelector('.dom-modal-container');
		const btnWrap = document.createElement('div');
		btnWrap.classList.add('dom-modal-btn-wrap');

		const btnOk = document.createElement('button');
		btnOk.setAttribute('type', 'button');
		btnOk.classList.add('btn', 'dom-modal-close-with-click', 'dom-modal-btn-info');
		btnOk.textContent = this.modalInfoBtnText;

		btnWrap.append(btnOk);

		if (container) {
			container.append(btnWrap);
		}

		return modal;
	}

	_createConfirmModal(modal) {
		const container = modal.querySelector('.dom-modal-container');

		const btnWrap = document.createElement('div');
		btnWrap.classList.add('dom-modal-btn-wrap');

		const btnConfirm = document.createElement('button');
		btnConfirm.setAttribute('type', 'button');
		btnConfirm.classList.add('btn', 'dom-modal-close-with-click', 'dom-modal-btn-confirm');
		btnConfirm.textContent = this.modalConfirmBtnText;

		const btnCancel = document.createElement('button');
		btnCancel.setAttribute('type', 'button');
		btnCancel.classList.add('btn', 'dom-modal-close-with-click', 'dom-modal-btn-cancel');
		btnCancel.textContent = this.modalCancelBtnText;

		btnWrap.append(btnConfirm);
		btnWrap.append(btnCancel);

		if (container) {
			container.append(btnWrap);
		}

		return modal;
	}

	_closeModalClick(e) {
		if (e.target === this._modalElem || e.target.classList.contains('dom-modal-close-with-click')) {
			if (this.type === 'confirm') {
				if (e.target.classList.contains('dom-modal-btn-confirm')) {
					this._modalConfirmTrue();
				} else if (e.target.classList.contains('dom-modal-btn-cancel')) {
					this._modalConfirmFalse();
				}
			}

			this.closeModal();
		}
	}

	_closeModalWithEsc(e) {
		if (e.key === 'Escape') {
			e.preventDefault();

			// if (this.type === 'confirm') {
			// 	this._modalConfirmFalse();
			// }

			this.closeModal();
		}
	}

	_closeModalWithEnter(e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (this.type === 'confirm') {
				this._modalConfirmTrue();
			}

			this.closeModal();
		}
	}

	_modalConfirmTrue() {
		if (typeof this.onConfirm === 'function') {
			this.onConfirm();
		}
	}

	_modalConfirmFalse() {
		if (typeof this.onCancel === 'function') {
			this.onCancel();
		}
	}

	_onModalOpen() {
		if (typeof this.onOpen === 'function') {
			this.onOpen();
		}
	}

	_onModalClose() {
		if (typeof this.onClose === 'function') {
			this.onClose();
		}
	}

	_openWithBtn(e) {
		this._openBtns = document.querySelectorAll(`[data-dom-modal=${this.modalId}]`);
		this._openBtns.forEach((btn) => {
			btn.addEventListener('click', this._boundOpenWithBtn);
		});
	}

	_boundOpenWithBtn = (e) => {
		e.preventDefault();
		this.openModal();
	}


	_addNoTremorContent() {
		document.body.classList.add('dom-modal-open');

		if (document.body.scrollHeight > window.innerHeight) {
			document.body.style.paddingRight = SimpleModal.scrollbarWidth + 'px';
		}
	}

	_removeNoTremorContent() {
		document.body.classList.remove('dom-modal-open');
		document.body.style.paddingRight = '';
	}

	openModal() {
		this._modalElem = document.getElementById(this.modalId);

		if (!this._modalElem) {
			console.error('No modal with this id was found. You must specify the \'modalId\' argument when calling Modal().');
			return;
		}

		if (this.type === 'info') {
			document.addEventListener('keydown', this._boundCloseModalClickWithEnter);
			this._modalElem.querySelector('.dom-modal-btn-info').addEventListener('click', this._boundCloseModalClick);
		}

		if (this.type === 'confirm') {
			document.addEventListener('keydown', this._boundCloseModalClickWithEnter);
		}

		this._addNoTremorContent();
		this._modalElem.classList.add('dom-modal-show');
		document.addEventListener('keydown', this._boundCloseModalWithEsc);
		this._modalElem.addEventListener('click', this._boundCloseModalClick);
		this._modalElem.querySelector('.dom-modal-exit').addEventListener('click', this._boundCloseModalClick);
		this._onModalOpen();
		return this;
	}

	closeModal() {
		this._removeNoTremorContent();
		this._modalElem.classList.remove('dom-modal-show');
		document.removeEventListener('keydown', this._boundCloseModalWithEsc);
		document.removeEventListener('keydown', this._boundCloseModalClickWithEnter);
		this._modalElem.removeEventListener('click', this._boundCloseModalClick);
		
		const arr = this._modalElem.querySelectorAll('.dom-modal-close-with-click');
		arr.forEach((item) => {
			item.removeEventListener('click', this._boundCloseModalClick);
		});
		this._onModalClose();

		return this;
	}

	destroyModal() {
		// Якщо модалка відкрита — закриваємо
		if (this._modalElem?.classList.contains('dom-modal-show')) {
			this.closeModal();
		}

		// Знімаємо openWithBtn listeners
		if (this._openBtns) {
			this._openBtns.forEach(btn => {
				btn.removeEventListener("click", this._boundOpenWithBtn);
			});
		}

		// Видаляємо DOM
		if (this._modalElem) {
			this._modalElem.remove();
		}

		// Прибираємо ID з глобального списку
		SimpleModal.idsList = SimpleModal.idsList.filter(
			id => id !== this.modalId
		);

		// Очищаємо посилання
		this._modalElem = null;
		this._openBtns = null;

		return null;
	}
}

function Modal(options = {}) {
	return new SimpleModal(options);
}