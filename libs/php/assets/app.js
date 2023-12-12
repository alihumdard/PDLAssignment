$(document).ready(function () {

    $("#searchInp").on("keyup", function () {

        // your code

    });

    $("#refreshBtn").click(function () {
        if ($("#personnelBtn").hasClass("active")) {
            load_personalTable();
        } else {
            if ($("#departmentsBtn").hasClass("active")) {
                load_deparmentTable();
            } else {
                load_locationTable();
            }
        }
    });

    $("#filterBtn").click(function () {

        // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location

    });

    $("#addBtn").click(function () {

        // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display

    });

    $("#personnelBtn").click(function () {

        // Call function to refresh personnel table

    });

    $("#departmentsBtn").click(function () {

        // Call function to refresh department table

    });

    $("#locationsBtn").click(function () {

        // Call function to refresh location table

    });

    $("#editPersonnelModal").on("show.bs.modal", function (e) {
        $.ajax({
            url:
                "getPersonnelByID.php",
            type: "POST",
            dataType: "json",
            data: {
                id: $(e.relatedTarget).attr("data-id")
            },
            success: function (result) {
                var resultCode = result.status.code;

                if (resultCode == 200) {
                    // Update the hidden input with the employee id so that
                    // it can be referenced when the form is submitted
                    $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
                    $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
                    $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
                    $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
                    $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);
                    $("#editPersonnelDepartment").html("");

                    $.each(result.data.department, function () {
                        $("#editPersonnelDepartment").append(
                            $("<option>", {
                                value: this.id,
                                text: this.name
                            })
                        );
                    });

                    $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);

                } else {
                    $("#editPersonnelModal .modal-title").replaceWith(
                        "Error retrieving data"
                    );
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#editPersonnelModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        });
    });

    // Executes when the form button with type="submit" is clicked
    $("#editPersonnelForm").on("submit", function (e) {

        // Executes when the form button with type="submit" is clicked
        // stop the default browser behviour

        e.preventDefault();

        // AJAX call to save form data

    });

    function load_personalTable() {
        // Make AJAX request to getAll.php
        $.ajax({
            url: 'getAll.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                var htmlString = '';

                // Check if the response has data
                if (response && response.data) {
                    // Loop through the data and construct the HTML string
                    $.each(response.data, function (index, person) {
                        htmlString += '<tr>' +
                            '<td class="align-middle text-nowrap">' + person.lastName + ', ' + person.firstName + '</td>' +
                            '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.department + '</td>' +
                            '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.location + '</td>' +
                            '<td class="align-middle text-nowrap d-none d-md-table-cell">' + person.email + '</td>' +
                            '<td class="text-end text-nowrap">' +
                            '<button type="button" class="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="' + person.id + '">' +
                            '<i class="fa-solid fa-pencil fa-fw"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn m-2" data-id="' + person.id + '">' +
                            '<i class="fa-solid fa-trash fa-fw"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';
                    });

                    // Append the constructed HTML string to the tbody
                    $('#personal_data').html(htmlString);

                    // alert('Data personal appended successfully!');
                } else {
                    console.error('No data received or invalid response structure');
                    alert('No data received or invalid response structure');
                }
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function load_deparmentTable() {
        // Make AJAX request to getAllDepartments.php
        $.ajax({
            url: 'getAllDepartments.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                var htmlString = '';

                // Check if the response has data
                if (response && response.data) {
                    $.each(response.data, function (index, department) {
                        htmlString += '<tr>' +
                            '<td class="align-middle text-nowrap">'
                            + department.name +
                            '</td>' +
                            '<td class="align-middle text-nowrap d-none d-md-table-cell">'
                            + department.location +
                            '</td>' +
                            '<td class="text-end text-nowrap">' +
                            '<button type="button" class="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="' + department.id + '">' +
                            '<i class="fa-solid fa-pencil fa-fw"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn m-2" data-id="' + department.id + '">' +
                            '<i class="fa-solid fa-trash fa-fw"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';
                    });

                    // Append the constructed HTML string to the tbody
                    $('#deparments_data').html(htmlString);

                    // alert('Data deparments appended successfully!');
                } else {
                    console.error('No data received or invalid response structure');
                    alert('No data received or invalid response structure');
                }
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function load_locationTable() {
        // Make AJAX request to getAllLocations.php
        $.ajax({
            url: 'getAllLocations.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                var htmlString = '';

                // Check if the response has data
                if (response && response.data) {
                    $.each(response.data, function (index, location) {
                        htmlString += '<tr>' +
                            '<td class="align-middle text-nowrap">'
                            + location.name +
                            '</td>' +
                            '<td class="text-end text-nowrap">' +
                            '<button type="button" class="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="' + location.id + '">' +
                            '<i class="fa-solid fa-pencil fa-fw"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn m-2" data-id="' + location.id + '">' +
                            '<i class="fa-solid fa-trash fa-fw"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';
                    });

                    // Append the constructed HTML string to the tbody
                    $('#locations_data').html(htmlString);

                    // alert('Data location successfully!');
                } else {
                    console.error('No data received or invalid response structure');
                    alert('No data received or invalid response structure');
                }
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    load_personalTable();
    load_deparmentTable();
    load_locationTable();
});
