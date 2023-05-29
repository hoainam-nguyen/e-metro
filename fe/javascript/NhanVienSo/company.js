var modal = $(".modal");
var dataTable = $("#dataTable");

var add_company_form = $(".add-company-form");
var listInput = $$(".add-company-form__input");

var update_company_form = $(".update-company-form");
var listInputUpdate = $$(".update-company-form__input");

var company_avt_add = $(".add-company-form__img");
var company_avt_update = $(".update-company-form__img");

// MAIN PAGE
function start() {
    loadTotal();
}

start();



// click button add company
var btn_add_company = $(".add");


btn_add_company.onclick = function() {
    modal.style.display = "block";  
    add_company_form.style.display = "block";                                              
}  

// ADD FORM


function clearAddForm() {
    listInput.forEach(function (input) {
        input.value = '';
    });

    company_avt_add.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";

    add_company_form.style.display = "none";
    modal.style.display = "none"
}



// Click button HỦY on add company form
var btnCancel = $("#add_btn_cancel");

btnCancel.onclick = clearAddForm;

// Click change avatar img on add company form
var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        console.log(imgURL);
        company_avt_add.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}


// Click THÊM button on add company form
var btnOk = $("#add_btn_yes");


btnOk.onclick = function() {
    let newRow = dataTable.insertRow(-1);
    const innerRow = 
            `
                <td>${"CT05"}</td>
                <td>${listInput[0].value}</td>
                <td>${listInput[1].value}</td>
                <td>${listInput[2].value}</td>
                <td>${listInput[3].value}</td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
            `;
    newRow.innerHTML = innerRow;

    newRow.onclick = onClickTable(newRow);

    clearAddForm();
    loadTotal();
}


// UPDATE FORM


var btnCancel = $("#update_btn_cancel");

btnCancel.onclick = function() {
    company_avt_update.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";
    update_company_form.style.display = "none";
    modal.style.display = "none";
}


var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        company_avt_update.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}

// CLICK ON TABLE

var rows = dataTable.getElementsByTagName("tr");
for (i = 1; i < rows.length; i++) {
  var currentRow = dataTable.rows[i];
  onClickTable(currentRow);
}


function onClickTable(currentRow)
{
    var onClickRow = function(row) {
        return function() {
        var cell = row.getElementsByTagName("td")[0];
        var id_company = cell.innerHTML;
        window.location.href = 'detail_company.html';
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 

    // Click on edit button
    var array_td = currentRow.getElementsByTagName("td");
    var cell = array_td[array_td.length-1];

    var company = {};
    company.id = currentRow.getElementsByTagName("td")[0].innerText;
    company.name = currentRow.getElementsByTagName("td")[1].innerText;
    company.website = currentRow.getElementsByTagName("td")[2].innerText;
    company.address = currentRow.getElementsByTagName("td")[3].innerText;
    company.phone = currentRow.getElementsByTagName("td")[4].innerText;


    var btn_edit = cell.getElementsByTagName("i")[0];

    var onClickEditButton = function(company) {
        return function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            displayUpdateForm();
            setDataUpdateForm(company);
        }
    }
    btn_edit.addEventListener('click', onClickEditButton(company));
}

function displayUpdateForm() {
    modal.style.display = "block";  
    update_company_form.style.display = "block";
}

function setDataUpdateForm(company) {
    listInputUpdate[0].value = company.id;
    listInputUpdate[1].value = company.name;
    listInputUpdate[2].value = company.website;
    listInputUpdate[3].value = company.address;
    listInputUpdate[4].value = company.phone;

    company_avt_update.style.backgroundImage = `url('https://avatars.githubusercontent.com/u/103875393?s=400&u=45b000740a9cfdc553f7fb1ea8208f117f84a58e&v=4')`;
}


// SEARCH 

var searchBar = $(".search");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();
    var all_tr = dataTable.getElementsByTagName("tr");
    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("td");
        for(j=0; j < all_columns.length - 1; j++){
            if(all_columns[j]) {
                var column_value = all_columns[j].textContent || all_columns[j].innerText;
                column_value = column_value.toUpperCase();
                if (column_value.indexOf(keyword) > -1){
                    all_tr[i].style.display = ""; // show
                    break;
                } else { 
                    all_tr[i].style.display = "none"; // hide
                }
            }
        }
    }
    loadTotal();
});

// SORT

const table_headings = $$(".table_heading");


table_headings.forEach(function(head,i) {
    head.onclick = () => {
        if (head.classList.contains('table_heading_active_asc')) {
            head.classList.remove('table_heading_active_asc');
            head.classList.add('table_heading_active_desc');
            sortTable(i, true);
        } else 
        if (head.classList.contains('table_heading_active_desc')) {
            head.classList.remove('table_heading_active_desc');
            head.classList.add('table_heading_active_asc');
            sortTable(i, false);
        }
        else {
            table_headings.forEach(head => head.classList.contains('table_heading_active_asc') 
            ? head.classList.remove('table_heading_active_asc') 
            : head.classList.remove('table_heading_active_desc'));

            head.classList.add('table_heading_active_asc');

            sortTable(i, false);
        }
    }
});

function sortTable(column, isDesc) {
    const table_rows = $$('tbody tr');
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].innerText.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].innerText.toLowerCase();

        return isDesc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// TOTAL

function loadTotal() {
    const table_rows = $$('tbody tr');
    const total = $(".result");
    
    total.innerText = "Total: " + table_rows.length;
}





