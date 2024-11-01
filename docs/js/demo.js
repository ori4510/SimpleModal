'use strict';

const myModal = Modal({
	modalId: 'myModalId',
	title: 'Simple Modal',
	content: 'Content',
}).createModal();

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

const myInfoModal = Modal({
	modalId: 'myInfoModalId',
	title: 'Info Modal',
	content: 'Content',
	type: 'info',
}).createModal();

const modal_example = Modal({
	modalId: 'modal_example',
	onOpen: () => {
		document.querySelector('#modal_example form input:not([type="hidden"])').focus();
	},
	onClose: () => {
		document.querySelector('#modal_example form').reset();
	},
}).getModal();

document.querySelector('#b-1').addEventListener('click', () => {
	myModal.openModal();
});

document.querySelector('#b-2').onclick = () => {
	myConfirmModal.openModal();
}

document.querySelector('#b-3').onclick = () => {
	myInfoModal.openModal();
}

document.querySelector('#b-4').onclick = () => {
	modal_example.openModal();
}

(() => {
	const form = document.querySelector('#modal_example form');
	form.onsubmit = (e) => {
		e.preventDefault();
		alert(form.inp1.value);
		modal_example.closeModal();
	}
})();

// copy
window.addEventListener('click', function(event) {
	if (event.target.closest('.dom-copy-btn')) {
		navigator.clipboard
			.writeText(event.target.nextElementSibling.textContent)
			.then( ()=> {
				let info = document.createElement('div');
				info.classList.add('dom-copy-alert');
				info.textContent = '✔';
				event.target.appendChild(info);
				setTimeout(function() {
					event.target.removeChild(info);
				}, 1500);
			});
	}
});

// scroll to top
scrollToTop();
function scrollToTop() {
	const btnScrollToTop = document.createElement('span');
	btnScrollToTop.classList.add('scrollToTop');
	document.body.append(btnScrollToTop);

	checkScrollOffset();

	window.addEventListener('scroll', checkScrollOffset);

	function checkScrollOffset() {
		if (window.pageYOffset > 150) {
			btnScrollToTop.classList.add('scrollToTopVisible');
		} else {
			btnScrollToTop.classList.remove('scrollToTopVisible');
		}
	}

	btnScrollToTop.onclick = () => {
		history.pushState('', document.title, window.location.pathname + window.location.search);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
};