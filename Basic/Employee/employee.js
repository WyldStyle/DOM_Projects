document.addEventListener('DOMContentLoaded',init);
function init(){
  let selectedRow = null;
  let button = document.querySelector('button');
  button.addEventListener('click',(e)=>{
    employeeData(selectedRow);
  })
    
}

function employeeData(selectedRow){
  let form_data = readInputValue();
  if(selectedRow == null){
    create_Tr_Td(form_data);
    removeInputValue();
  }
}

class employee{
  constructor(name, post, mobileNo, salary) {
    this.name = name.toString();
    this.post = post.toString();
    this.mobileNo = mobileNo;
    this.salary = salary;
  }
}
function readInputValue(){
  let form_data = new employee(
    document.querySelector('#name').value,
    document.querySelector('#post').value,
    document.querySelector('#mobileNo').value,
    document.querySelector('#salary').value
  );
  return form_data;
}

function create_Tr_Td(form_data){
  console.log('here');
let empTable = document.querySelector('#employeeTable');
console.log(empTable);
let empTable_row = empTable.insertRow(empTable.length);
for(let i = 0; /*i < empTable_row.length*/ i < 10; i++){
  let column = empTable_row.insertCell(i);
  if(i==0){
    column.innerText = empTable.rows.length - 1;
  }
  else{
    column.innerText = form_data[i-1];
  }
}
let edit = empTable_row.insertCell(5),
del = empTable_row.insertCell(6);

edit.addEventListener('click',edit(e));
del.addEventListener('click',delEmp(e));
}

edit