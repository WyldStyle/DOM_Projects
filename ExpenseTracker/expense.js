document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form-add-expense');
    const tableBody = document.querySelector('#table-history tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const category = document.querySelector('#category').value;
        const item = document.querySelector('#item').value;
        const amount = parseFloat(document.querySelector('#amount').value);

        // Add the new expense to the table
        addExpenseToTable(category, item, amount);

        // Clear the form
        form.reset();
    });

    function addExpenseToTable(category, item, amount) {
        // Create a new table row
        const newRow = document.createElement('tr');

        // Insert cells for the new row
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${category}</td>
            <td>${item}</td>
            <td>${amount}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Add event listeners for edit and delete buttons
        newRow.querySelector('.edit-btn').addEventListener('click', function () {
            // Call the editExpense function when the Edit button is clicked
            editExpense(newRow);
        });

        newRow.querySelector('.delete-btn').addEventListener('click', function () {
            // Implement delete functionality here
            // You can remove the row from the table
            newRow.remove();
            console.log('Delete button clicked');
        });

        // Append the new row to the table body
        tableBody.appendChild(newRow);
    }

    function editExpense(row) {
        const cells = row.cells;

        // Replace the text content of each cell with an input field
        for (let i = 1; i < cells.length - 1; i++) {
            const currentContent = cells[i].textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentContent;
            cells[i].textContent = '';
            cells[i].appendChild(input);
        }

        // Replace the "Edit" button with a "Save" button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'save-btn';
        
        // Replace the "Delete" button with a "Delete" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';

        cells[cells.length - 1].innerHTML = '';
        cells[cells.length - 1].appendChild(saveButton);
        cells[cells.length - 1].appendChild(deleteButton);

        // Add event listener for the save button
        saveButton.addEventListener('click', function () {
            // Save the changes and update the row
            saveChanges(row);
        });

        // Add event listener for the delete button
        deleteButton.addEventListener('click', function () {
            // Implement delete functionality here
            // You can remove the row from the table
            row.remove();
            console.log('Delete button clicked');
        });
    }

    function saveChanges(row) {
        const cells = row.cells;

        // Replace the input fields with the new values
        for (let i = 1; i < cells.length - 1; i++) {
            const input = cells[i].querySelector('input');
            const newValue = input.value;
            cells[i].textContent = newValue;
        }

        // Replace the "Save" button with the "Edit" button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        
        // Replace the "Delete" button with a "Delete" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';

        cells[cells.length - 1].innerHTML = '';
        cells[cells.length - 1].appendChild(editButton);
        cells[cells.length - 1].appendChild(deleteButton);

        // Add event listener for the edit button
        editButton.addEventListener('click', function () {
            // Call the editExpense function when the Edit button is clicked
            editExpense(row);
        });

        // Add event listener for the delete button
        deleteButton.addEventListener('click', function () {
            // Implement delete functionality here
            // You can remove the row from the table
            row.remove();
            console.log('Delete button clicked');
        });
    }
});
