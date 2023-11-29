let form_data = { 'username': '', 'mobNo': '', 'profession': '', 'purpose': '', 'slot': "", 'date': '' };
let userList = localStorage.getItem('userList') ?? [];
if (userList.length) {
  userList = JSON.parse(userList);
}
document.addEventListener('DOMContentLoaded', () => {
  console.log(form_data);
  for (const key in form_data) {
    setInputFieldValue(key);
  }
})

function handleInputChange(event) {
}

function onInputFieldChange(event) {
  // console.log(event.target.name);
  form_data = {
    ...form_data,
    [event.target.name]: event.target.value
  }
  // console.log(event.target.value);
  setInputFieldValue(event.target.name);
  console.log(form_data);
}
function form_submit_handler(event) {
  event.preventDefault();
  const formValues = Object.values(form_data);
  for (let value of formValues) {
    if (!value) {
      window.alert("Please fill all the fields")
      return;
    }
  }
  userList.push(form_data)
  localStorage.setItem(`userList`, JSON.stringify(userList))
  form_data = { 'username': '', 'mobNo': '', 'profession': '', 'purpose': '', 'slot': "", 'date': '' };
  for (const key in form_data) {
    setInputFieldValue(key);
  }
}

function setInputFieldValue(key) {
  console.log(key);
  document.querySelector(`input[name=${key}]`).value = form_data[key];
}

function displayAppointments() {
    for (const user of userList) {
      const div4 = document.querySelector('#div4');
      const p = document.createElement('p');
      p.textContent = JSON.stringify(user);
      div4.appendChild(p);
      const button = document.createElement('button')
      button.textContent = 'Delete';
      div4.appendChild(button);
    }
}
