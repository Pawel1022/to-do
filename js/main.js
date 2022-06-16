let todoInput;
let todoAddBtn;
let todoErrorInfo;
let toDoUlList;

let popup;
let popupInput;
let popupInfo;
let popupConfirmBtn;
let popupCancelBtn;

let todoToEdit;
const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo__input');
	todoAddBtn = document.querySelector('.todo__add-btn');
	todoErrorInfo = document.querySelector('.todo__error-info');
	toDoUlList = document.querySelector('.todo__list');

	popup = document.querySelector('.popup');
	popupInput = document.querySelector('.popup__input');
	popupInfo = document.querySelector('.popup__info');
	popupConfirmBtn = document.querySelector('.popup__btn--accept');
	popupCancelBtn = document.querySelector('.popup__btn--cancel');
};

const prepareDOMEvents = () => {
	todoAddBtn.addEventListener('click', addNewTask);

	popupCancelBtn.addEventListener('click', closePopup);
	popupConfirmBtn.addEventListener('click', addEditedTodo);

	todoInput.addEventListener('keyup', keyCheck);
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const addNewTask = () => {
	if (todoInput.value !== '') {
		const newLi = document.createElement('li');
		newLi.classList.add('todo__list-item');
		newLi.textContent = todoInput.value;
		const underline = document.createElement('div');
		underline.classList.add('todo__underline');
		newLi.append(underline);
		createToolsBar(newLi);
		toDoUlList.append(newLi);
		todoErrorInfo.textContent = '';
		todoInput.value = '';
	} else {
		todoErrorInfo.textContent = `You have to type something !`;
	}
};

const createToolsBar = (newLi) => {
	const toolBox = document.createElement('div');
	toolBox.classList.add('todo__list-tools');

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('todo__btn');
	completeBtn.classList.add('todo__btn--complete');
	completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
	completeBtn.addEventListener('click', (e) => {
		e.target.closest('li').classList.toggle('is--completed');
		e.target.classList.toggle('deactivate');
	});

	const editBtn = document.createElement('button');
	editBtn.classList.add('todo__btn');
	editBtn.classList.add('todo__btn--edit');
	editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
	editBtn.addEventListener('click', editTodo);

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('todo__btn');
	removeBtn.classList.add('todo__btn--remove');
	removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	removeBtn.addEventListener('click', removeTask);

	toolBox.append(completeBtn, editBtn, removeBtn);
	newLi.append(toolBox);
};

const editTodo = (e) => {
	popup.classList.add('is--active');
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
};
const addEditedTodo = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.classList.remove('is--active');
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'You have to type something !';
	}
};

const closePopup = () => {
	popup.classList.remove('is--active');
};

const removeTask = (e) => {
	e.target.closest('li').remove();
};

const keyCheck = (e) => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

document.addEventListener('DOMContentLoaded', main, keyCheck);
