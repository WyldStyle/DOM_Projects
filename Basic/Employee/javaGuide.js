// Sample data for initial rendering
let employees = [
  { id: 1, fullName: 'John Doe', email: 'john@example.com', salary: '50000', city: 'New York' },
  { id: 2, fullName: 'Jane Doe', email: 'jane@example.com', salary: '60000', city: 'San Francisco' }
];

// Function to render the employee table
function renderEmployeeTable() {
  const employeeTable = document.getElementById('employeeList').getElementsByTagName('tbody')[0];
  employeeTable.innerHTML = '';

  employees.forEach(employee => {
    const row = employeeTable.insertRow();
    row.innerHTML = `<td>${employee.fullName}</td>
                      <td>${employee.email}</td>
                      <td>${employee.salary}</td>
                      <td>${employee.city}</td>
                      <td>
                        <button onclick="editEmployee(${employee.id})">Edit</button>
                        <button onclick="deleteEmployee(${employee.id})">Delete</button>
                      </td>`;
  });
}

// Function to handle form submission
function onFormSubmit() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const salary = document.getElementById('salary').value;
  const city = document.getElementById('city').value;

  if (fullName.trim() === '') {
    document.getElementById('fullNameValidationError').classList.remove('hide');
    return;
  }

  // Check if updating or adding a new employee
  const employeeId = document.getElementById('formEmployee').getAttribute('data-id');
  if (employeeId) {
    // Updating existing employee
    const existingEmployee = employees.find(employee => employee.id === parseInt(employeeId));
    existingEmployee.fullName = fullName;
    existingEmployee.email = email;
    existingEmployee.salary = salary;
    existingEmployee.city = city;
  } else {
    // Adding a new employee
    const newEmployee = {
      id: Date.now(),
      fullName,
      email,
      salary,
      city
    };
    employees.push(newEmployee);
  }

  // Clear the form fields
  document.getElementById('formEmployee').reset();
  document.getElementById('formEmployee').removeAttribute('data-id');

  // Render the updated employee table
  renderEmployeeTable();
}

// Function to edit an existing employee
function editEmployee(id) {
  const employee = employees.find(employee => employee.id === id);
  if (employee) {
    // Populate the form with the selected employee's details
    document.getElementById('fullName').value = employee.fullName;
    document.getElementById('email').value = employee.email;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('city').value = employee.city;

    // Set the data-id attribute to identify that it's an update
    document.getElementById('formEmployee').setAttribute('data-id', employee.id);
  }
}

// Function to delete an employee
function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  renderEmployeeTable();
}

// Initial rendering of the employee table
renderEmployeeTable();

 document.getElementById('formEmployee').addEventListener('submit', function(event) {
    event.preventDefault();
    onFormSubmit();
  });