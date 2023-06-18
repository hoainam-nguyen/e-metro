var modal = $(".modal");
var dataTable = $("#dataTable");

var add_company_form = $(".add-company-form");
var listInputAdd = $$(".add-company-form__input");

var update_company_form = $(".update-company-form");
var listInputUpdate = $$(".update-company-form__input");

var company_avt_add = $(".add-company-form__img");
var company_avt_update = $(".update-company-form__img");

var listWarningAdd = $$(".warning-add");
var listWarningUpdate = $$(".warning-update");

var fileAdd = null;
var fileUpdate = null;
var currentRowEdit = null;
var idCompanyAdd = null;

const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});

var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";
var getCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=";
var createCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/insert";
var uploadImageApi = "https://aiclub.uit.edu.vn/namnh/emetro/upload-image";
var updateCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/update";


// MAIN PAGE
function start() {
    getCompanies(renderCompanies);
}

start();

// GET ALL COMPANY
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

async function renderCompanies(companies) {
    var data = companies.data;
    let tableCompanies = $("table tbody"); 

    let htmls = data.map(function(company) {

        let status = "Còn khai thác";
        if (company.status == 0) {
            status = "Dừng khai thác";
        }

        return `<tr>
                <td>${company.id}</td>
                <td>${company.name}</td>
                <td>${company.website}</td>
                <td>${company.address}</td>
                <td>${company.phone}</td>
                <td>${status}</td>
                <td style="display: none;">${company.image_url}</td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
                </tr>`;
    });

    tableCompanies.innerHTML = htmls.join('');
    setOnClickTable();
}

// INSERT COMPANY
async function createCompany(newCompany, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newCompany)
    };

    fetch(createCompanyApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        }); 
}

async function callBackForUploadImage(raw) {
    let data = raw.data;

    if (fileAdd != null) {

        var imageBox = {
            type: "companies",
            id: data.id,
            image_base64: await toBase64(fileAdd)
        }

        await uploadImage(imageBox, true);
    } else {
        await getIdToRender(data.id);
    }
}

async function updateImage(id) {
    if (fileUpdate != null) {

        var imageBox = {
            type: "companies",
            id: id,
            image_base64: await toBase64(fileUpdate)
        }

        return await uploadImage(imageBox, false);
        
    } else {
        return "done";
    }
}



// UPLOAD IMAGE COMPANY
async function uploadImage(newImage, isRender) {
    // console.log(newImage);
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newImage)
    };

    return fetch(uploadImageApi, options) 
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            let data = res.data;
            if (isRender == true) {
                getIdToRender(data.id); 
            }
            return "done";
        })
        .catch(function(err) {
            console.log(err);
        }); 
}

async function getIdToRender(id) {
    getCompany(id, renderCompanyEndList);
}

// UPDATE COMPANY 
async function updateCompany(newCompany) {
    // console.log(newCompany);
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newCompany)
    };

    return fetch(updateCompanyApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(res) {
            return res;
        })
        .catch(function(err) {
            console.log(err);
        });
}

// GET 1 COMPANY
async function getCompany(id, callback) {

    fetch(getCompanyApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}

async function renderCompany(company) {
    let data = company.data[0];

    let listCells = currentRowEdit.getElementsByTagName("td");

    listCells[1].innerText = data.name;
    listCells[2].innerText = data.website;
    listCells[3].innerText = data.address;
    listCells[4].innerText = data.phone;
    if (data.status == 1) {
        listCells[5].innerText = "Còn khai thác";
    } else {
        listCells[5].innerText = "Dừng khai thác";
    }
    listCells[6].innerText = data.image_url;
}

async function renderCompanyEndList(company) {
    let data = company.data[0];

    let tableCompanies = $("table tbody"); 

    let status = "Còn khai thác";
    if (data.status == 0) {
        status = "Dừng khai thác";
    }

    let htmls = `<tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.website}</td>
                <td>${data.address}</td>
                <td>${data.phone}</td>
                <td>${status}</td>
                <td style="display: none;">${data.image_url}</td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
                </tr>`;

    tableCompanies.innerHTML += htmls;
    setOnClickTable();
}







// SELECT MENU ADD FORM
// const optionMenu = document.querySelector(".select-menu-add"),
//        selectBtn = optionMenu.querySelector(".select-btn-add"),
//        options = optionMenu.querySelectorAll(".option-add"),
//        sBtn_text = optionMenu.querySelector(".sBtn-text-add");
// selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       
// options.forEach(option =>{
//     option.addEventListener("click", ()=>{
//         let selectedOption = option.querySelector(".option-text-add").innerText;
//         sBtn_text.innerText = selectedOption;
//         optionMenu.classList.remove("active");
//     });
// });

// SELECT MENU UPDATE FORM
const optionMenu_update = document.querySelector(".select-menu-update"),
       selectBtn_update = optionMenu_update.querySelector(".select-btn-update"),
       options_update = optionMenu_update.querySelectorAll(".option-update"),
       sBtn_text_update = optionMenu_update.querySelector(".sBtn-text-update");
selectBtn_update.addEventListener("click", () => optionMenu_update.classList.toggle("active"));       
options_update.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-update").innerText;
        sBtn_text_update.innerText = selectedOption;
        optionMenu_update.classList.remove("active");
    });
});



// click button add company
var btn_add_company = $(".add");


btn_add_company.onclick = function() {
    modal.style.display = "block";  
    add_company_form.style.display = "block";                                              
}  

// ADD FORM


function clearAddForm() {
    listWarningAdd.forEach(function (warning) {
        warning.style.display = "none";
    });


    listInputAdd.forEach(function (input) {
        input.value = '';
        input.style.borderColor = "rgba(0, 0, 0, 0.5)";
    });

    company_avt_add.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";

    add_company_form.style.display = "none";
    modal.style.display = "none"

    // sBtn_text.innerHTML = "Tình trạng khai thác";
}




// Click button HỦY on add company form
var btnCancel = $("#add_btn_cancel");

btnCancel.onclick = clearAddForm;

// Click change avatar img on add company form
var input_img_file = $("#input-img-file");


if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        fileAdd = input_img_file.files[0];
        company_avt_add.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}


// Click THÊM button on add company form
var btnOk = $("#add_btn_yes");


btnOk.onclick = async function() {

    if (checkAddForm()) {

        var name = listInputAdd[0].value;
        var website = listInputAdd[1].value;
        var address = listInputAdd[2].value;
        var phone = listInputAdd[3].value;
        
        let newCompany = {
            data: {
                name: name,
                address: address,
                address_head: "nothing",
                website: website,
                phone: phone,
                status: 1
            }
        }
        
       
        await createCompany(newCompany, callBackForUploadImage);

        clearAddForm();
    }
}



var focusInputAddForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "var(--purple)";
        // listWarningAdd[i].style.display = "none"         
    };
}

var blurInputAddForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    };
}

function checkAddForm() {
    let isValid = true;
    
    for (let i=0; i<listInputAdd.length; i++) {
        if (listInputAdd[i].value == "") {
            listInputAdd[i].addEventListener('focus',focusInputAddForm(i));
            listInputAdd[i].addEventListener('blur',blurInputAddForm(i));
            
            listInputAdd[i].style.borderColor = "red"
            listWarningAdd[i].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

   
    return isValid;
}



// UPDATE FORM

async function clearUpdateForm() {
    listWarningUpdate.forEach(function (warning) {
        warning.style.display = "none";
    });

    listInputUpdate.forEach(function(input) {
        input.style.borderColor = "rgba(0, 0, 0, 0.5)"
    })

    company_avt_update.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";
    update_company_form.style.display = "none";
    modal.style.display = "none";

    fileUpdate = null;
}

const cancelUpdateForm = $("#update_btn_cancel");

cancelUpdateForm.onclick = function() {
    clearUpdateForm();
}

var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        fileUpdate = input_img_file_update.files[0];
        company_avt_update.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}

const OkUpdateForm = $("#update_btn_yes");

OkUpdateForm.onclick = async function() {
    if (checkUpdateForm()) {
        var id = listInputUpdate[0].value;
        var name = listInputUpdate[1].value;
        var website = listInputUpdate[2].value;
        var address = listInputUpdate[3].value;
        var phone = listInputUpdate[4].value;

        if (sBtn_text_update.innerText == "Còn khai thác") {
            var status = 1;
        } else {
            var status = 0;
        }

        console.log(currentRowEdit);
        
        let newCompany = await {
            id: Number(id),
            data: {
                name: name,
                address: address,
                address_head: "nothing",
                website: website,
                phone: phone,
                status: status
            }
        }

        await updateImage(Number(id))
            .then(function(result) {
                updateCompany(newCompany)
                    .then(function(res) {
                        console.log(res);
                    });
                getCompany(Number(id), renderCompany);
                clearUpdateForm();
            });
    }
}




var focusInputUpdateForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "var(--purple)";
        listWarningUpdate[i].style.display = "none"         
    };
}

var blurInputUpdateForm = function(i) {
    return function(e) {
        e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    };
}

function checkUpdateForm() {
    let isValid = true;
    for (let i=1; i<listInputUpdate.length; i++) {
        if (listInputUpdate[i].value == "") {
            listInputUpdate[i].addEventListener('focus',focusInputUpdateForm(i-1));
            listInputUpdate[i].addEventListener('blur',blurInputUpdateForm(i));
            
            listInputUpdate[i].style.borderColor = "red"
            listWarningUpdate[i-1].style.display = "inline-block"                     
            
            isValid = false;
        }
    }
    return isValid;
}


// CLICK ON TABLE

function setOnClickTable() {
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
            var id_company = cell.innerHTML;
            sessionStorage.setItem("id_company", id_company);
            window.location.href = 'detail_company.html';
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 

    // Click on edit button
    var array_td = currentRow.getElementsByTagName("td");
    var cell = array_td[array_td.length-1];

    var btn_edit = cell.getElementsByTagName("i")[0];

    var onClickEditButton = function() {
        return function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var company = {};
            company.id = currentRow.getElementsByTagName("td")[0].innerText;
            company.name = currentRow.getElementsByTagName("td")[1].innerText;
            company.website = currentRow.getElementsByTagName("td")[2].innerText;
            company.address = currentRow.getElementsByTagName("td")[3].innerText;
            company.phone = currentRow.getElementsByTagName("td")[4].innerText;
            company.status = currentRow.getElementsByTagName("td")[5].innerText;
            company.image_url = currentRow.getElementsByTagName("td")[6].innerText;


            currentRowEdit = currentRow;
    

            displayUpdateForm();
            setDataUpdateForm(company);
        }
    }
    btn_edit.addEventListener('click', onClickEditButton());
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

    sBtn_text_update.innerText = company.status;

    if (company.image_url != "null" && company.image_url != null) {
        let url = company.image_url;
        company_avt_update.style.backgroundImage = `url('${url}')`;
    }

    // console.log(company.image_url);
}


// SEARCH 

var searchBar = $(".search");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();
    var all_tr = dataTable.getElementsByTagName("tr");
    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("td");
        for(j=0; j < all_columns.length - 2; j++){
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

// TOTAL

function loadTotal() {
    const table_rows = $$('tbody tr');
    const total = $(".result");
    
    total.innerText = "Total: " + table_rows.length;
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
            let column_value = all_columns[5].textContent || all_columns[5].innerText;
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



