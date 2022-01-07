import { checkAuth, logout, getItems, createItem } from '../fetch-utils.js';

checkAuth();

const itemForm = document.getElementById('item-form');
const deleteButton = document.getElementById('delete-button');
const logoutButton = document.getElementById('logout');
const listEl = document.getElementById('list-div');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async () => {
    await displayShoppingListItems();

});

itemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(itemForm);
    const quantity = data.get('quantity-input');
    const item = data.get('item-input');

    await createItem(quantity.value, item.value);

    itemForm.reset();
    
    await displayShoppingListItems();

});

async function displayShoppingListItems() {
    await getItems();
}