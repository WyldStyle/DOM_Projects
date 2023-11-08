let form_data = { 'username': '', 'mobNo': '', 'profession': '', 'purpose': '' };
document.addEventListener('DOMContentLoaded', () => {
  console.log(form_data);
  for(const key in form_data){
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
  console.log('here setting--------');
  console.log(form_data);
}
function form_submit_handler(event) {
  event.preventDefault();
  localStorage.setItem(form_data.username, JSON.stringify(form_data))
}

function setInputFieldValue(key) {
  document.querySelector(`input[name=${key}]`).value = form_data[key];
}
