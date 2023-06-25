var modal = $(".modal");
var fileAdd = null;

function start() {
    getAllUsers(renderAllUsers);
}

start();

// GET ALL USER
function getAllUsers(callback) {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/getall")
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

// RENDER ALL USER
function renderAllUsers(users) {
    var data = users.data;
    let tableUsers = $("table tbody"); 

    let htmls = data.map(function(user) {

        if (user.type != 0) {
            let type = "Sở Giao Thông TP";
            if (user.type == 2) {
                type = "Công Ty";
            } else {
                if (user.type == 3) {
                    type = "Bán Vé";
                }
            }
    
            return `<tr>
                        <td>${user.id}</td>
                        <td>${user.fullname}</td>
                        <td>${user.user_email}</td>
                        <td>${type}</td>
                        <td><i class="fa-solid fa-trash edit"></i></td>
                    </tr>`;
        } else {
            return "";
        }
    });

    tableUsers.innerHTML = htmls.join('');
    setOnClickTable();
    updateTotal();
}

// SET ON CLICK TABLE
function setOnClickTable() {
    var dataTable = $("table");
    var rows = dataTable.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = dataTable.rows[i];
        onClickTable(currentRow);
    }
}

function onClickTable(currentRow)
{
    var onClickRow = function(row) {
        return function() {
            var cell = row.getElementsByTagName("td")[0];
            var id_user_detail = cell.innerHTML;
            console.log(id_user_detail);
            sessionStorage.setItem("id_user_detail", id_user_detail);
            window.location.href = 'detail_user.html';
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 

    // Click on delete button

    var cells = currentRow.getElementsByTagName("td")[4];

    var btn_delete = cells.getElementsByTagName("i");

    var onClickDeleteButton = function(row) {
        return function(e) {
            e.preventDefault();
            e.stopPropagation(); 

            let id = row.getElementsByTagName("td")[0].innerText;
            let name = row.getElementsByTagName("td")[1].innerText;

            if (confirm(`Bạn có chắc chắn xoá nhân viên ${id} - ${name}`) == true) {

                deleteUser(id)
                .then(function() {
                    let dataTable = $(".table");
                    dataTable.deleteRow(currentRow.rowIndex);
                    updateTotal();
                });
            }
        };
    };

    btn_delete[0].addEventListener('click', onClickDeleteButton(currentRow));
}

// API DELETE USER

async function deleteUser(id) {
    return fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/delete/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            toast({
                title: "Xoá nhân viên thành công!",
                message: "Bạn đã xóa nhân viên thành công!",
                type: "success",
                duration: 3000
              });
        })
        .catch(function(err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}







// TRIGGER ADD FORM
var btnOpenAddForm = $(".add");
var addForm = $(".add-user-form");

btnOpenAddForm.onclick = function() {
    modal.style.display = "block";
    addForm.style.display = "block";
}


// RENDER USER ENDLIST
async function getUser(id, callback) {

    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

function renderUserEndList(user) {
    let data = user.data[0];

    let tableUsers = $("table tbody"); 

    let type = "Sở Giao Thông TP";
    if (data.type == 2) {
        type = "Công Ty";
    } else {
        if (data.type == 3) {
            type = "Bán Vé";
        }
    }

    let htmls = `<tr>
                    <td>${data.id}</td>
                    <td>${data.fullname}</td>
                    <td>${data.user_email}</td>
                    <td>${type}</td>
                    <td><i class="fa-solid fa-trash edit"></i></td>
                </tr>`;

    tableUsers.innerHTML += htmls;
    setOnClickTable();  
    updateTotal();
}


// API IMAGE
const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});

async function prepareImage(id) {

    var newImage = {
        type: "users",
        id: id,
        image_base64: await toBase64(fileAdd)
    }

    uploadImage(newImage);
}

function uploadImage(newImage) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newImage)
    };

    fetch("https://aiclub.uit.edu.vn/namnh/emetro/upload-image", options) 
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            toast({
                title: "Thêm mới thành công!",
                message: "Bạn đã thêm mới nhân viên thành công!",
                type: "success",
                duration: 3000
              });

            getUser(res.data.id, renderUserEndList);
        })
        .catch(function(err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        }); 
}


// API CREATE USER

function createUser(newUser) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newUser)
    };

    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/insert", options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(user) {
            if (fileAdd == null) {
                toast({
                    title: "Thêm mới thành công!",
                    message: "Bạn đã thêm mới nhân viên thành công!",
                    type: "success",
                    duration: 3000
                  });
                
                getUser(user.data.id, renderUserEndList);
            } else {
                prepareImage(user.data.id);
            }
        })
        .catch(function(err) {
            console.log(err);
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

// PREPARE USER
function prepareUser() {

    let listInputAdd = $$(".add-user-form__input");

    let type = 1;
    let company_id = -1;
    if (sBtn_text.innerText == "Công Ty") {
        type = 2;

        let arr = listInputAdd[6].value.split(" - ");

        company_id = Number(arr[0]);
    } else {
        if (sBtn_text.innerText == "Bán Vé") {
            type = 3;
        }
    }

    let newUser = {
        data: {
            type: type,
            user_email: listInputAdd[1].value,
            user_password: listInputAdd[2].value,
            company_id: company_id,
            fullname: listInputAdd[0].value,
            phone: listInputAdd[3].value,
            birth_of_date: listInputAdd[4].value,
            address: listInputAdd[5].value
        }
    }

    createUser(newUser);
}


// BUTTON ADD USER
var btnAddUser = $("#add_form_ok");

btnAddUser.onclick = function() {
   if (checkAddForm()) {
        prepareUser();
        clearAddForm();
   }
}

// CHECK ADD FORM
var listInputAdd = $$(".add-user-form__input");
var listWarningAdd = $$(".warning-add");


var focusInputAddForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "var(--purple)";
        listWarningAdd[i].style.display = "none"         
    };
}

var blurInputAddForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    };
}

function checkAddForm() {
    let isValid = true;

    for (let i=0; i<6; i++) {
        if (listInputAdd[i].value == "") {
            listInputAdd[i].addEventListener('focus',focusInputAddForm(i));
            listInputAdd[i].addEventListener('blur',blurInputAddForm(i));
            
            listInputAdd[i].style.borderColor = "red"
            listWarningAdd[i].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

    if (sBtn_text.innerText == "Loại nhân viên") {
        listWarningAdd[6].style.display = "inline-block";
        selectBtn.addEventListener("click", () => listWarningAdd[6].style.display = "none" );
        isValid = false;
    } 

    if (sBtn_text.innerText == "Công Ty") {
        if (listInputAdd[6].value == "") {
            listInputAdd[6].addEventListener('focus',focusInputAddForm(7));
            listInputAdd[6].addEventListener('blur',blurInputAddForm(7));
            
            listInputAdd[6].style.borderColor = "red"
            listWarningAdd[7].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

    return isValid;
}




// BUTTON OPEN SELECT COMPANY
var btnOpenSelectCompanyForm = $(".select-company__input");
var selectCompanyForm = $(".select-company-form");

btnOpenSelectCompanyForm.onclick = function() {
    addForm.style.display = "none";
    selectCompanyForm.style.display = "block";
}

var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";

async function getCompanies(callback) {
    fetch(getAllCompaniesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}

getCompanies(renderCompanies);

async function renderCompanies(companies) {
    var data = companies.data;
    let tableCompanies = $(".list-company"); 

    let htmls = data.map(function(company) {

        return `<li class="item-company">
                    <span class="name-company">${company.id} - ${company.name}</span>
                </li>`;
    });

    tableCompanies.innerHTML = htmls.join('');
    setOnClickListCompany();
}

function setOnClickListCompany() {
    let listRowsCompany = $$(".item-company");

    for (let i=0; i<listRowsCompany.length; i++) {
        setOnClickItemCompany(listRowsCompany[i]);
    }
}

function setOnClickItemCompany(item) {
    var onClickRow = function(row) {
        return function() {
            var rowSpan = row.getElementsByTagName("span");
            
            const arr = rowSpan[0].innerText.split(" - ");
            
            companySelected = {
                id: Number(arr[0]),
                name: arr[1]
            }

            selectCompanyForm.style.display = "none";
            btnOpenSelectCompanyForm.value = rowSpan[0].innerText;
            addForm.style.display = "block";
        };
    }; 
    item.addEventListener('click', onClickRow(item)); 
}


function resetSelectCompanyForm() {
    searchBar2.value = "";
    let all_tr = $$(".item-company");

    for (var i=0; i<all_tr.length; i++){
        all_tr[i].style.display = ""; // show
    }
}


var searchBar2 = $(".select-company__search");

searchBar2.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".item-company");

    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("span");

        var column_value = all_columns[0].textContent || all_columns[0].innerText;
        column_value = column_value.toUpperCase();
        if (column_value.indexOf(keyword) > -1){
            all_tr[i].style.display = ""; // show
        } else { 
            all_tr[i].style.display = "none"; // hide
        }
    }
});


// BUTTON CLOSE ADD FORM
var btnCloseAddForm = $("#add_form_cancel");

btnCloseAddForm.onclick = function() {
    clearAddForm();
}


// CLEAR ADD FORM
function clearAddForm() {
    var addForm = $(".add-user-form");

    addForm.style.display = "none";
    modal.style.display = "none";

    var listInputAdd = $$(".add-user-form__input");

    for(let i=0; i<listInputAdd.length; i++) {
        listInputAdd[i].value = "";
    }

    sBtn_text.innerText = "Loại nhân viên";

    let group = $(".select-company__group");
    group.style.display = "none";

    let avt = $(".add-user-form__img");
    avt.style.backgroundImage = `url('/fe/assets/img/blank_img.png')`;

    fileAdd = null;
}


// CHANGE IMAGE
var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        fileAdd = input_img_file.files[0];

        let avt = $(".add-user-form__img");
        avt.style.backgroundImage = `url(${imgURL})`;

        input_img_file.value = '';
    };
}


// SELECT MENU TYPE
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

        let group = $(".select-company__group");

        if (selectedOption == "Công Ty") {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
});


// PHONE KEYPRESS
var phone = $(".phone");

phone.onkeypress = function(e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <=57) {
        return true;
    } else {
        return false;
    }   
}



// SEARCH
var searchBar = $(".search");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    var dataTable = $("table");
    var all_tr = dataTable.getElementsByTagName("tr");
   
    for (var i=1; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("td");

        for(let j=0; j < all_columns.length; j++){

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

            if (column == 0) {
                first_row = Number(first_row);
                second_row = Number(second_row);
            } 

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
checkbox.forEach(function(checkbox) {
    checkbox.addEventListener('click', RowWithFilter(checkbox));
});


// UPDATE TOTAL
function updateTotal() {
    let total = $(".result");
    let all_rows = $$("table tbody tr");

    total.innerText = "Total: " + all_rows.length;
}