
const baseUrl = " https://crudcrud.com/api/06207f184944467ca4aa0f96688bc719/items_in_shop"
let formState = {
  'category': '',
  'name': '',
  'price': '',
  'quantity': ''
}

let items;

let editMode = false;
let updateIdx = null;
let updateId = null;
document.addEventListener('DOMContentLoaded', async () => {
  const button_addItem = document.querySelector('#btn_addItem')

  // items = JSON.parse(localStorage.getItem('items'));
  await getDataFromApi_and_RenderTable();

  if (items && items.length) {
    // do nothing
  } else {
    items = []
  }
  for (const key of Object.keys(formState)) {
    setInputFieldValue(key);
  }
  renderTableData(items);

  button_addItem.addEventListener('click', async (e) => {
    console.log('button adding');
    e.preventDefault();
    if (!editMode) {
      const response = await postData(formState);
      if (response.data) {
        items.push(response.data);
        window.alert('Item added successfully. Click inventory to view items list')
      }
      renderTableData(items);
    } else {
      await updateTable(updateId, updateIdx)
      document.querySelector('#btn_addItem').textContent = 'Add Item'
      editMode = false;
      updateIdx = null;
      updateId = null
      renderTableData(items);
      setTimeout(() => {
        window.alert('item updated successfully')
      }, 10);
    }
    formState = {
      'category': '',
      'name': '',
      'price': '',
      'quantity': ''
    }
    syncFormUIWithState();
  })

})


async function getDataFromApi_and_RenderTable() {
  items = await getDataFromApi()
  renderTableData(items);
}

async function getDataFromApi() {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const res = await response.json();
  console.log('here1',res);
  return res;
}
async function postData() {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    const res = await response.json();
    return {
      data: res,
      message: "Successfully uploaded the data"
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Not uploaded",
      data: null
    }
  }
}

function onInputFieldChange(e) {
  formState = {
    ...formState,
    [e.target.id]: e.target.value
  }
  setInputFieldValue(e.target.id);
}

function setInputFieldValue(key) {
  console.log(key);
  document.querySelector(`#${key}`).value = formState[key];
}

function syncFormUIWithState() {
  for (const key of Object.keys(formState)) {
    if (key === "_id") {
      continue;
    }
    setInputFieldValue(key);
  }
}

function bookAppointment(items) {
  items.push(formState);
}

function renderTableData(items) {
  let table_electronics = document.querySelector('#table_electronics tbody');
  let table_clothing = document.querySelector('#table_clothing tbody');
  let table_food = document.querySelector('#table_food tbody');
  table_clothing.innerHTML = '';
  table_electronics.innerHTML = '';
  table_food.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    // table_body.appendChild(objectToTableRow(i, items[i]));
    let new_row = objectToTableRow(i, items[i]);
    console.log('items',items,formState);
    if (items[i].category === 'Electronics') table_electronics.appendChild(new_row);
    else if (items[i].category === 'Clothing') table_clothing.appendChild(new_row);
    else if (items[i].category === 'Food') table_food.appendChild(new_row);
  }
  localStorage.setItem('items', JSON.stringify(items))
}

function objectToTableRow(sNo, single_user_data, items) {
  const new_row = document.createElement('tr');

  const sNoCell = document.createElement('td');
  sNoCell.textContent = sNo + 1;
  new_row.appendChild(sNoCell)

  for (const key of Object.keys(single_user_data)) {
    if (key === "_id") continue;
    let new_cell = document.createElement('td');
    new_cell.textContent = single_user_data[key];
    new_row.appendChild(new_cell);
  }
  const editButton = document.createElement('button')
  editButton.textContent = "Edit";
  editButton.setAttribute('class','btn btn-success')
  new_row.appendChild(editButton)
  const delButton = document.createElement('button')
  delButton.textContent = "Delete";
  delButton.setAttribute('class','btn btn-success')
  new_row.appendChild(delButton);

  console.log(single_user_data);

  editButton.addEventListener('click', () => editRow(single_user_data._id, sNo));
  delButton.addEventListener('click', () => delRow(single_user_data._id, sNo));

  console.log('the new row', new_row);
  return new_row;
}

function editRow(id, idx) {
  editMode = true;
  updateId = id;
  updateIdx = idx;
  console.log(editMode, updateId, updateIdx);
  document.querySelector('#btn_addItem').textContent = 'Update';
  formState = {
    ...items[idx]
  }
  syncFormUIWithState();
}
async function updateTable(id, updateIdx) {
  // items[updateIdx] = formState;
  console.log('here', updateIdx, items);
  const updateStatus = await editRecordOnServer(id, formState)
  if (updateStatus) {
    items[updateIdx] = {
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
    items.splice(idx, 1);
    renderTableData(items);
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