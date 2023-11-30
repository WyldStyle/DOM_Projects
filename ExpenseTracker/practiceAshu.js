// document.addEventListener('DOMContentLoaded', () => {

//   let form = document.querySelector('#form-add-expense');
//   let table_body = document.querySelector('#table-history tbody')
//   let arrExpense = [{ 'category': 'Food', 'item': 'Biscuits', 'amount': 50 },
//   { 'category': 'Food', 'item': 'Namkeen', 'amount': 50 }];


// })

//   function objectToTableRow(expense_data) {
//     const table_row = document.createElement('tr');
//     const table_cell_category = document.createElement('td');
//     table_cell_category.textContent = expense_data.category;
//     const table_cell_item = document.createElement('td');
//     table_cell_item.textContent = expense_data.item;
//     const table_cell_amount = document.createElement('td')
//     table_cell_amount.textContent = expense_data.amount;

//     table_row.appendChild(table_cell_amount);
//     table_row.appendChild(table_cell_category);
//     table_row.appendChild(table_cell_item);

//     return table_row;
//   }

//   function refreshTableBody(table_body, arrExpense){
//     // find solution of doing it without 
//     table_body.innerHTML = ''
//     for(let i = 0; i < arrExpense.length; i++){
//      table_body.appendChild(objectToTableRow(arrExpense[i]));
//      debugger
//     }
//   }

//   function addExpense(){

//   }

// document.addEventListener('DOMContentLoaded', () => {
//   let form = document.querySelector('#form-add-expense');
//   let table_body = document.querySelector('#table-history tbody')

//   // let arrExpense = [{ 'category': 'Food', 'item': 'Biscuits', 'amount': 50 },
//   // { 'category': 'Food', 'item': 'Namkeen', 'amount': 50 }];


//   // let add_button = document.querySelector('#add');
//   // add_button.addEventListener('click', addExpense(arrExpense, table_body, form));
//   /* 

//     The submit event is fired when a form is submitted.

//     Note that submit is fired only on the form element, not the button or submit input. (Forms are submitted, not buttons.)

//     so no point in getting an event from submit buttom
//  */
//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     addExpense(arrExpense, table_body, form);
//   })

//   let arrExpense = localStorage.getItem('arrExpense') ?? [];
//   if (arrExpense.length) {
//     arrExpense = JSON.parse('arrExpense');
//     refreshTableBody();
//   }
// })

// class ExpenseNode {
//   constructor(category, item, amount) {
//     this.category = category;
//     this.item = item;
//     this.amount = amount;
//   }
// }
// function addExpense(arrExpense, table_body, form) {
//   const newExpense = new ExpenseNode(form[0].value, form[1].value, form[2].value);
//   let newRow = objectToTableRow(newExpense, arrExpense, table_body, form);
//   arrExpense.push(newRow);
//   localStorage.setItem('arrExpense', JSON.stringify(arrExpense));
//   refreshTableBody(arrExpense, table_body);
// }

// function objectToTableRow(expense_data, arrExpense, table_body, form) {
//   const serial_No = document.createElement('td')
//   serial_No.setAttribute('id', arrExpense.length + 1);
//   serial_No.textContent = `${arrExpense.length + 1}`

//   const table_row = document.createElement('tr');

//   const table_cell_category = document.createElement('td');
//   table_cell_category.textContent = expense_data.category;
//   const table_cell_item = document.createElement('td');
//   table_cell_item.textContent = expense_data.item;
//   const table_cell_amount = document.createElement('td')
//   table_cell_amount.textContent = expense_data.amount;

//   let edit = document.createElement('button');
//   edit.setAttribute('class', 'edit');
//   edit.textContent = 'Edit';
//   let del = document.createElement('button');
//   del.setAttribute('class', 'del')
//   del.textContent = 'Delete'

//   table_row.appendChild(serial_No)
//   table_row.appendChild(table_cell_category);
//   table_row.appendChild(table_cell_item);
//   table_row.appendChild(table_cell_amount);
//   table_row.appendChild(edit)
//   table_row.appendChild(del);

//   // edit.addEventListener('click',editRow);

//   // table_row.querySelector('.del').addEventListener('click',()=>{
//   //   table_row.remove();
//   // });
//   del.addEventListener('click', () => {
//     // table_row.remove();
//     arrExpense.pop();
//     refreshTableBody(arrExpense, table_body)
//   })

//   edit.addEventListener('click', (event) => {
//     editRow(event, table_body)
//   });

//   return table_row;
// }

// function refreshTableBody(arrExpense, table_body) {
//   // find solution of doing it without 
//   table_body.innerHTML = ''
//   for (let i = 0; i < arrExpense.length; i++) {
//     // table_body.appendChild(objectToTableRow(arrExpense[i]));
//     table_body.appendChild(arrExpense[i])
//     // debugger
//   }
// }

// function editRow(event, arrExpense, table_body, form) {
//   // event.target.parentElement.textContent = ''
//   // since row has textContent only, doing so will erase the text
//   // console.log(event.target.parentElement);
//   // console.log(event.target.parentElement.children[0].textContent);
//   const idx = event.target.parentElement.children[0];
//   arrExpense[idx]
// }

let formState = {
  category: "",
  item: "",
  amount: ""
}

// let user = localStorage.getItem('user');
// if (user === null) {
//   user = {
//     'income': '',
//     'expenses': '',
//     'balance': '',
//     'expenseHistory': []
//   }
// }
// else user = JSON.parse(user);
  let user = {
    'income': '',
    'expenses': '',
    'balance': '',
    'expenseHistory': []
  }
  if(localStorage.getItem('user')) user = JSON.parse(localStorage.getItem('user'))

console.log(user);
// let arrExpense = [];
let arrExpense = user.expenseHistory;
console.log(arrExpense, 'hererere');
let editMode = false, updateIdx = null;

document.addEventListener('DOMContentLoaded', () => {
  setBalance()
  let form = document.querySelector('#form-add-expense');

  for (const key in formState) {
    setInputFieldValue(key);
  }

  let btn_add_income = document.querySelector('#btn-income');

  btn_add_income.addEventListener('click', (e) => {
    // e.target.preventDefault()
    setBalance();
  })

  // form.addEventListener('input',(e)=>{
  //   handleInputChange(e, form, formState);
  // })


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!editMode) addExpense(arrExpense);
    else {
      updateExpense(updateIdx);
      editMode = false;
      updateIdx = null;
      document.querySelector('#add').textContent = "Add+"
      setBalance()
    }
    renderTableData(arrExpense);
    formState = {
      category: "",
      item: "",
      amount: ""
    }
    syncFormUIWithState();
  });
  renderTableData(arrExpense);
})

class ExpenseNode {
  constructor(category, item, amount) {
    this.category = category;
    this.item = item;
    this.amount = amount;
  }
}

function renderTableData(arrExpense) {
  let table_body = document.querySelector('#table-history tbody')
  table_body.innerHTML = "";
  for (let i = 0; i < arrExpense.length; i++) {
    table_body.appendChild(objectToTableRow(i + 1, arrExpense[i]));
  }
}

function objectToTableRow(sNo, expense) {
  let new_row = document.createElement('tr');

  const sNoCell = document.createElement("td");
  sNoCell.textContent = sNo;
  new_row.appendChild(sNoCell);

  for (let key of Object.keys(expense)) {
    const newTD = document.createElement("td");
    newTD.textContent = expense[key];
    new_row.appendChild(newTD);
  }

  const editButton = document.createElement('button')
  editButton.textContent = 'Edit'
  new_row.appendChild(editButton)
  const delButton = document.createElement('button')
  delButton.textContent = 'Delete'
  new_row.appendChild(delButton);


  editButton.addEventListener('click', () => {
    editMode = true;
    document.querySelector('#add').textContent = 'Update'
    editRow(sNo - 1);
    syncFormUIWithState();

  });
  delButton.addEventListener('click', () => {
    delRow(sNo - 1);
    renderTableData(arrExpense);
    setBalance();
  })
  return new_row;
}

function addExpense(arrExpense) {
  arrExpense.push(formState);
  setBalance();
}

function handleInputChange(e, form) {
  formState = {
    ...formState,
    [e.target.id]: e.target.value
  }
  setInputFieldValue(e.target.id);
}

function setInputFieldValue(key) {
  document.querySelector(`#${key}`).value = formState[key];
}

function delRow(idx) {
  arrExpense.splice(idx, 1);
}
function editRow(idx) {
  updateIdx = idx;
  formState = { ...arrExpense[idx] };
}

function syncFormUIWithState() {
  for (let key of Object.keys(formState)) {
    setInputFieldValue(key);
  }
}

function updateExpense(idx) {
  arrExpense[idx] = formState;
}

function setBalance() {
  let balanceAmt = document.querySelector('#p_balance')
  let expenseAmt = document.querySelector('#p_expense');
  let incomeAmt = document.querySelector('#p_income')
  let new_income = document.querySelector('#income');

  incomeAmt.textContent = user.income;
  expenseAmt.textContent = user.expenses;
  balanceAmt.textContent = user.balance;
  expenseAmt.textContent = expenseCalc(arrExpense);
  new_income.placeholder = 'Enter new Income'
  if (incomeAmt.textContent === '') incomeAmt.textContent = new_income.value
  else incomeAmt.textContent = Number(incomeAmt.textContent) + Number(new_income.value);
  balanceAmt.textContent = Number(incomeAmt.textContent) - Number(expenseAmt.textContent)
  new_income.value = null;

  storageSet(incomeAmt,expenseAmt,balanceAmt);
}
function expenseCalc(arrExpense) {
  let total_expense = 0;
  for (let i = 0; i < arrExpense.length; i++) {
    total_expense += Number(arrExpense[i].amount);
  }
  return total_expense;
}

function storageSet(incomeAmt,expenseAmt,balanceAmt){
  user.income = incomeAmt.textContent;
  user.expenses = expenseAmt.textContent;
  user.balance = balanceAmt.textContent;
  user.expenseHistory = arrExpense;
  localStorage.setItem('user',JSON.stringify(user));
}
