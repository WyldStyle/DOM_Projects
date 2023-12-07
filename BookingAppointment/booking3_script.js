const baseUrl = " https://crudcrud.com/api/650c8130d4394b08bc41d931b3705839/bookingAptmnt"
let formState = {
  'username': '',
  'mobNo': '',
  'profession': '',
  'purpose': '',
  'slot': '',
  'date': ''
}

let bookings;

let editMode = false;
let updateIdx = null;
let updateId = null;
document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('#form1');

  // bookings = JSON.parse(localStorage.getItem('bookings'));
  await getDataFromApi_and_RenderTable();

  if (bookings && bookings.length) {
    // do nothing
  } else {
    bookings = []
  }
  for (const key of Object.keys(formState)) {
    setInputFieldValue(key);
  }
  renderTableData(bookings);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!editMode) {
      const response = await postData(formState);
      if (response.data) {
        bookings.push(response.data);
      }
    renderTableData(bookings);
    } else {
      await updateTable(updateId,updateIdx)
      form.querySelector('button').textContent = 'Book Appointment'
      editMode = false;
      updateIdx = null;
      updateId = null
    renderTableData(bookings);
    setTimeout(() => {
    window.alert('appointment updated successfully')
    }, 10);
    }
    formState = {
      'username': '',
      'mobNo': '',
      'profession': '',
      'purpose': '',
      'slot': '',
      'date': ''
    }
    syncFormUIWithState();
  })

})


async function getDataFromApi_and_RenderTable() {
  bookings = await getDataFromApi()
  renderTableData(bookings);
}

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

function bookAppointment(bookings) {
  bookings.push(formState);
}

function renderTableData(bookings) {
  let table_body = document.querySelector('#table_appointments tbody');
  table_body.innerHTML = '';
  for (let i = 0; i < bookings.length; i++) {
    table_body.appendChild(objectToTableRow(i, bookings[i], bookings));
  }
  localStorage.setItem('bookings', JSON.stringify(bookings))
}

function objectToTableRow(sNo, single_user_data, bookings) {
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
  new_row.appendChild(editButton)
  const delButton = document.createElement('button')
  delButton.textContent = "Delete";
  new_row.appendChild(delButton);
  console.log(single_user_data);
  editButton.addEventListener('click', () => editRow(single_user_data._id, sNo));
  delButton.addEventListener('click', () => delRow(single_user_data._id, sNo));
  console.log('the new row',new_row);
  return new_row;
}

function editRow(id, idx) {
  editMode = true;
  updateId = id;
  updateIdx = idx;
  console.log(editMode, updateId, updateIdx);
  document.querySelector('#form1 button').textContent = 'Update';
  formState = {
    ...bookings[idx]
  }
  syncFormUIWithState();
}
async function updateTable(id, updateIdx) {
  // bookings[updateIdx] = formState;
  console.log('here', updateIdx, bookings);
  const updateStatus = await editRecordOnServer(id, formState)
  if(updateStatus){
    bookings[updateIdx] = {
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
    if(response.status === 200){
      return true
    }
    else return false;
  } catch(error) {
    console.log(error.message);
  }
  // const res = await response.json()
  // console.log(res);
}

async function delRow(id, idx) {
  const res = await deleteData(id);
  if (res.data) {
    bookings.splice(idx, 1);
    renderTableData(bookings);
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