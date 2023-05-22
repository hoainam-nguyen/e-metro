
var modal = $(".modal");
var dataTable = $("#dataTable");
var add_form = $(".add-station-form");
var update_form = $(".update-station-form");

var select_menu_add = $(".select-menu-add");
var select_menu_update = $(".select-menu-update");

var station_img_add = $(".add-station-form__img");
var station_img_update = $(".update-station-form__img");

var row_selected = null;

// CLEAR ADD FORM
function clearAddForm() {
    let input = $('.add-station-form__input');
    input.value = '';

    let textarea = $(".add-station-form__textarea"); 
    textarea.value = '';

    sBtn_text.innerText = "Tình trạng hoạt động";

    station_img_add.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";

    select_menu_add.style.display = "none";
    add_form.style.display = "none";    
    modal.style.display = "none"
}

// Click button thêm mới nhà ga
var btn_add_station = $(".add");

btn_add_station.onclick =  function() {
    modal.style.display = "block";
    add_form.style.display = "block";
    select_menu_add.style.display = "block";
}

// select menu add
const optionMenu = document.querySelector(".select-menu-add"),
       selectBtn = optionMenu.querySelector(".select-btn-add"),
       options = optionMenu.querySelectorAll(".option-add"),
       sBtn_text = optionMenu.querySelector(".sBtn-text-add");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-add").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});

// Click HỦY on add form
var btnCancel = $("#add_btn_cancel");
btnCancel.onclick = clearAddForm;

// click THÊM on add form 
var btnOk = $("#add_btn_yes");


btnOk.onclick = function() {
    let input = $('.add-station-form__input');
    let textarea = $(".add-station-form__textarea"); 
    let newRow = dataTable.insertRow(-1);
    const innerRow = 
            `
                <td>${"MT05"}</td>
                <td>${input.value}</td>
                <td>${textarea.value}</td>
                <td>${sBtn_text.innerText}</td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
            `;
    newRow.innerHTML = innerRow;

    newRow.onclick = onClickTable(newRow);

    clearAddForm();
}



// Click change img on add form
var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        station_img_add.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}


// CLICK TABLE
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
        var id_station = cell.innerHTML;
        alert("row " + id_station);
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 

    // Click on edit button
    var array_td = currentRow.getElementsByTagName("td");
    var cell = array_td[array_td.length-1];

    var btn_edit = cell.getElementsByTagName("i")[0];
  

    var onClickEditButton = function(array_td, currentRow) {
        return function(e) {
            e.preventDefault();
            e.stopPropagation(); 

            row_selected = currentRow;

            var station = {};
            station.id = array_td[0].innerText;
            station.name = array_td[1].innerText;
            station.desc = array_td[2].innerText;
            station.status = array_td[3].innerText;



            displayUpdateForm();
            setDataUpdateForm(station);
        }
    }
    btn_edit.addEventListener('click', onClickEditButton(array_td, currentRow));
}

function setDataUpdateForm(station) {
    let listInputUpdate = $$('.update-station-form__input');
    let textareaUpdate = $(".update-station-form__textarea");
    
    listInputUpdate[0].value = station.id;
    listInputUpdate[1].value = station.name;

    textareaUpdate.value = station.desc;


    sBtn_text_add.innerText = station.status;

    station_img_update.style.backgroundImage = `url('https://avatars.githubusercontent.com/u/103875393?s=400&u=45b000740a9cfdc553f7fb1ea8208f117f84a58e&v=4')`;
}

function displayUpdateForm() {
    modal.style.display = "block";
    update_form.style.display = "block";
    select_menu_update.style.display = "block";
}

// select menu update
const optionMenu_add = document.querySelector(".select-menu-update"),
       selectBtn_add = optionMenu_add.querySelector(".select-btn-update"),
       options_add = optionMenu_add.querySelectorAll(".option-update"),
       sBtn_text_add = optionMenu_add.querySelector(".sBtn-text-update");
selectBtn_add.addEventListener("click", () => optionMenu_add.classList.toggle("active"));       
options_add.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-update").innerText;
        sBtn_text_add.innerText = selectedOption;
        optionMenu_add.classList.remove("active");
    });
});


// click button change image on update form
var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        station_img_update.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}

// click button HỦY on update form
var btnCancel_update = $("#update_btn_cancel");

function closeUpdateForm() { 
    station_img_update.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";
    select_menu_update.style.display = "none";
    update_form.style.display = "none";
    modal.style.display = "none";
}

btnCancel_update.onclick = closeUpdateForm;

// click button CẬP NHẬT on update form
var btnOk_update = $("#update_btn_yes");

btnOk_update.onclick = function() {
    if (row_selected != null) {       
        let listInputUpdate = $$('.update-station-form__input');
        let textareaUpdate = $(".update-station-form__textarea");
    

        var array_td = row_selected.getElementsByTagName("td");
        array_td[1].innerText = listInputUpdate[1].value;
        array_td[2].innerText = textareaUpdate.value;
        array_td[3].innerText = sBtn_text_add.innerText;

        row_selected = null;

        closeUpdateForm();
    }
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

// FILTER

var RowWithFilter = function(checkbox) {
    return function() { 
        let string = null;

        if (checkbox.checked) {
            checkbox.removeAttribute("checked"); 
            string = "";
        } else {
            checkbox.setAttribute("checked", "checked");
            string = "none";
        }

        let all_tr = dataTable.getElementsByTagName("tr");
        for (let i = 1; i < all_tr.length; i++){
            let all_columns = all_tr[i].getElementsByTagName("td");
            let column_value = all_columns[3].textContent || all_columns[3].innerText;
            if (column_value == checkbox.value) {
                all_tr[i].style.display = string;
            }        
        }
    }
}



var checkbox = $$(".checkbox");
var checkmark = $$(".checkmark");


checkbox.forEach(function(checkbox, i) {
    checkbox.addEventListener('click', RowWithFilter(checkbox));
});