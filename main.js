const form = document.getElementById('form');
const text = document.getElementById('text');
const price = document.getElementById('price');
const list = document.getElementById('list');
const total = document.getElementById('total');

let localStorageItems = JSON.parse(localStorage.getItem('inventory'));
let itemList =
	localStorage.getItem('inventory') !== null ? localStorageItems : [];

const addItem = (e) => {
	e.preventDefault();
	let newItem = {
		id: idGen(),
		text: text.value,
		price: +price.value,
	};
	itemList.push(newItem);
	updateLocalStorage();
	init();

	text.value = '';
	price.value = '';
};

const idGen = () => {
	return Math.floor(Math.random() * 1000000);
};

const deleteItem = (id) => {
	itemList = itemList.filter((items) => items.id !== id);
	updateLocalStorage();
	init();
};

const addToDom = (items) => {
	let item = document.createElement('li');
	item.innerHTML = `<div><h3><button class="btn-delete" onclick="deleteItem(${items.id})">x</button> ${items.text}</h3></div> <h3>$${items.price}</h3>`;
	list.appendChild(item);
};

const init = () => {
	list.innerHTML = '';
	updateTotal();
	itemList.forEach(addToDom);
};

const updateLocalStorage = () => {
	localStorage.setItem('inventory', JSON.stringify(itemList));
};

const updateTotal = () => {
	let balance = itemList.map((items) => items.price);
	let totalAmount = balance.reduce((acc, item) => (acc += item), 0);
	total.innerText = '$' + totalAmount;
};

init();

form.addEventListener('submit', addItem);
