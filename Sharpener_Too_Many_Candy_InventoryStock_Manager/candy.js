const baseUrl = ' https://crudcrud.com/api/010d7424266b46c8bfdbd106f4f3eecf/candyShop'
let formState = {
  'name': '',
  'descrip': '',
  'price': '',
  'quantity': ''
}

let inventory;
let editMode = false;
let updateIdx = null;
let updateId = null;


document.addEventListener('DOMContentLoaded', async () => {
  const button_addItem = document.querySelector('#btn_addItem');

  //ooe 1
  await getDataFromApi_and_RenderTable();

  if (inventory && inventory.length) {
    //do nothing;
  }
  else {
    inventory = [];
  }

  sync_inputUIWithState();

  button_addItem.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!editMode) {
      const response = await postData(formState);
      if (response.data) {
        inventory.push(response.data);
      }
      renderTableData(inventory);
    } else {
      await updateTable(updateId, updateIdx);
      button_addItem.textContent = 'Update item'
      editMode = false;
      updateIdx = null;
      updateId = null;
      renderTableData(inventory);
      window.alert('inventory_item updated successfully');
    }
    formState = {
      'name': '',
      'descrip': '',
      'price': '',
      'quantity': ''
    }
    sync_inputUIWithState();

  })



})

//ooe1
async function getDataFromApi_and_RenderTable() {
  inventory = await getDataFromApi();
  renderTableData(inventory);
}

//ooe2
async function getDataFromApi() {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const res = await response.json();
  console.log(res);
  return res;
}

async function postData(formState) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify((formState))
    })
    const res = await response.json();
    return {
      data: res,
      message: 'Item added successfully'
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Not able to upload. Check Yr connection"
    }
  }
}

//oo3
function renderTableData(inventory) {
  let table_body = document.querySelector('#table_inventory tbody');
  table_body.innerHTML = '';
  for (let i = 0; i < inventory.length; i++) {
    table_body.appendChild(objectToTableRow(i, inventory[i]));
  }
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

//ooe4
function objectToTableRow(sNo, single_item) {
  const new_row = document.createElement('tr');
  const sNoCell = document.createElement('td');
  sNoCell.textContent = sNo + 1;
  new_row.appendChild(sNoCell);
  // console.log('here', typeof single_item, single_item);
  for (const key of Object.keys(single_item)) {
    if (key === '_id') continue;
    let new_cell = document.createElement('td');
    new_cell.textContent = single_item[key];
    new_row.appendChild(new_cell);
  }
  const quantityToBuy = document.createElement('input');
  new_row.appendChild(quantityToBuy);
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  new_row.appendChild(editButton);
  const del_button = document.createElement('button');
  del_button.textContent = 'Delete';
  new_row.appendChild(del_button);
  const buy_button = document.createElement('button');
  buy_button.textContent = 'Buy';
  new_row.appendChild(buy_button)


  editButton.addEventListener('click', () => editRow(single_item._id, sNo));
  del_button.addEventListener('click', () => delRow(single_item._id, sNo));
  buy_button.addEventListener('click', (e) => {bought(single_item._id, sNo, e) });

  return new_row;
}

//ooe5
function onInputFieldChange(e) {
  formState = {
    ...formState,
    [e.target.id]: [e.target.value]
  }
  setInputFieldValue([e.target.id]);
}

//ooe6
function setInputFieldValue(key) {
  // console.log('here key',key);
  if (key === '_id') return;
  document.querySelector(`#${key}`).value = formState[key];
}

// ooe7
function sync_inputUIWithState() {
  for (const key of Object.keys(formState)) {
    if (key === 'id') continue;
    setInputFieldValue(key);
  }
}

function bought(id, idx, e) {
  editMode = true;
  updateId = id;
  updateIdx = idx;
  // console.log(editMode, updateId, updateIdx);
  document.querySelector('#btn_addItem').textContent = 'Update';

  const originalQuantity = Number(inventory[idx].quantity)
  const quantity_sold = Number(e.target.parentNode.children[5].value);
  const new_quantity = originalQuantity - quantity_sold
  formState = {
    ...inventory[idx],
    ['quantity']: new_quantity
  }
  sync_inputUIWithState();
}

function editRow(id, idx) {
  editMode = true;
  updateId = id;
  updateIdx = idx;
  console.log(editMode, updateId, updateIdx);
  document.querySelector('#btn_addItem').textContent = 'Update';
  formState = {
    ...inventory[idx]
  }
  sync_inputUIWithState();
}
async function updateTable(id, updateIdx) {
  // inventory[updateIdx] = formState;
  console.log('here', updateIdx, inventory);
  const updateStatus = await editRecordOnServer(id, formState)
  if (updateStatus) {
    inventory[updateIdx] = {
      ...formState,
      _id: id
    }
  }
}
async function editRecordOnServer(id, updatedInfo) {
  const url = `${baseUrl}/${id}`;
  delete updatedInfo._id;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedInfo)
    })
    if (response.status === 200) {
      return true
    }
    else return false;
  } catch (error) {
    console.log(error.message);
  }
  // const res = await response.json()
  // console.log(res);
}

async function delRow(id, idx) {
  const res = await deleteData(id);
  if (res.data) {
    inventory.splice(idx, 1);
    renderTableData(inventory);
    window.alert('Record deleted successfully')
  }
}
async function deleteData(id) {
  const url = `${baseUrl}/${id}`
  console.log(url);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log(response);
  if (response.status === 200) return { message: 'deleted', data: true }
  else {
    return {
      message: 'not deleted',
      data: false
    }
  }
  const res = await response.json();
  console.log(res);
  return res;
}
