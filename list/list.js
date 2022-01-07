import { checkAuth, logout, getItems, createItem, buyItem, deleteAllItems } from '../fetch-utils.js';

checkAuth();

const itemForm = document.getElementById('item-form');
const deleteButton = document.getElementById('delete-button');
const logoutButton = document.getElementById('logout');
const listEl = document.getElementById('list-div');


logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async() => {
    await displayShoppingListItems();

});

itemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(itemForm);
    const quantity = data.get('quantity-input');

    const item = data.get('item-input');
    
    await createItem(quantity, item);

    itemForm.reset();

    await displayShoppingListItems();
});

deleteButton.addEventListener('click', async() => {
    await deleteAllItems;
    await displayShoppingListItems();

});

async function renderItem(item) {
    const itemEl = document.createElement('p');
    
    itemEl.classList.add('item');

    itemEl.textContent = `${item.quantity} ${item.item}`;

    if (item.bought) {
        itemEl.classList.add('bought');
    } else {
        itemEl.classList.add('unbought');
    }

    return itemEl;

}

async function displayShoppingListItems() {
    const items = await getItems();

    listEl.textContent = '';

    for (let item of items) {
        const newItem = await renderItem(item);

        newItem.addEventListener('click', async() => {
            await buyItem(item.id);
            
            await displayShoppingListItems();
        });

        listEl.append(newItem);
    }
}