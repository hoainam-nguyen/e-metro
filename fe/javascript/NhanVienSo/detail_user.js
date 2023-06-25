var modal = $(".modal");
var fileUpdate = null;

function start() {
    let id = sessionStorage.getItem("id_user_detail");
    getUser(id, renderUser);
}

start();

// GET USER
function getUser(id, callback) {
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

// SET DATA USER
function renderUser(user) {
    let data = user.data[0];

    var listInputUpdate = $$(".update-user-form__input");

    listInputUpdate[0].value = data.id;
    listInputUpdate[1].value = data.fullname;
    listInputUpdate[2].value = data.user_email;
    listInputUpdate[3].value = data.user_password;
    listInputUpdate[4].value = data.phone;
    listInputUpdate[5].value = data.birth_of_date;
    listInputUpdate[6].value = data.address;

    let avt = $(".detail-img");

    if (data.image_url != "") {
        avt.style.backgroundImage = `url('${data.image_url}')`;
    }

    let type = "Sở Giao Thông TP";
    if (data.type == 2) {
        type = "Công Ty";

        let group = $(".select-company__group");
        group.style.display = "block";

        getCompany(data.company_id)
        .then(function(name) {
            listInputUpdate[7].value = data.company_id + " - " + name;
        });
    } else {
        if (data.type == 3) {
            type = "Bán Vé";
        }
    }

    sBtn_text.innerText = type; 
}

// API GET COMPANY

async function getCompany(id) {
    return fetch("https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(company) {
           return company.data[0].name;
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



// BUTTON OPEN SELECT COMPANY
var btnOpenSelectCompanyForm = $(".select-company__input");
var selectCompanyForm = $(".select-company-form");

btnOpenSelectCompanyForm.onclick = function() {
    modal.style.display = "block"
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
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
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
            modal.style.display = "none";
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


// GET ALL USER
async function getAllUsers() {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/getall")
        .then(function (response) {
            return response.json();
        })
        .then(function(users) {
            // console.log(users);
            renderAllUsers(users);
        })
        .catch(function (err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

getAllUsers();

function renderAllUsers(users) {
    var data = users.data;

    let tableCompanies = $(".search-company-list");

    let htmls = data.map(function (user) {

        if (user.type != 0) {
            return `<li class="search-company-item">
                        <a>
                            <div class="item__info">
                                <span class="item__code">${user.id}</span>
                                <span class="item__name">${user.fullname}</span>
                            </div>
                        </a>
                    </li>`;
        } else {
            return "";
        }

    });

    tableCompanies.innerHTML = htmls.join('');
    setOnClickAllItem();
}


function setOnClickAllItem() {
    let all_tr = $$(".search-company-item");

    for (let i = 0; i < all_tr.length; i++) {
        let all_columns = all_tr[i].getElementsByTagName("span");
        let id_user_detail = all_columns[0];
        setOnClickItem(id_user_detail.innerText, all_tr[i]);
    }
}

function setOnClickItem(id_user_detail, item) {

    var onClickItem = function () {
        return function () {
            sessionStorage.setItem("id_user_detail", id_user_detail);
            window.location.href = 'detail_user.html';
        }
    }
    item.addEventListener('click', onClickItem());
}



// SELECT MENU TYPE
const optionMenu = document.querySelector(".select-menu-update"),
       selectBtn = optionMenu.querySelector(".select-btn-update"),
       options = optionMenu.querySelectorAll(".option-update"),
       sBtn_text = optionMenu.querySelector(".sBtn-text-update");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-update").innerText;
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
        image_base64: await toBase64(fileUpdate)
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
            prepareUser();
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

// API UPDATE USER
function updateUser(newUser) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newUser)
    };

    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/update", options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(res) {
            toast({
                title: "Cập nhật thành công!",
                message: "Bạn đã cập nhật thông tin nhân viên thành công!",
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


// PREPARE USER
function prepareUser() {

    let listInputUpdate = $$(".update-user-form__input");

    let type = 1;
    let company_id = -1;
    if (sBtn_text.innerText == "Công Ty") {
        type = 2;

        let arr = listInputUpdate[7].value.split(" - ");

        company_id = Number(arr[0]);
    } else {
        if (sBtn_text.innerText == "Bán Vé") {
            type = 3;
        }
    }

    let newUser = {
        id: Number(listInputUpdate[0].value),
        data: {
            type: type,
            user_email: listInputUpdate[2].value,
            user_password: listInputUpdate[3].value,
            company_id: company_id,
            fullname: listInputUpdate[1].value,
            phone: listInputUpdate[4].value,
            birth_of_date: listInputUpdate[5].value,
            address: listInputUpdate[6].value
        }
    }

    // console.log(newUser);
    updateUser(newUser);
}




// BUTTON UPDATE 
var btnUpdate = $(".update-container");

btnUpdate.onclick = function() {
    if (checkUpdateForm()) {
        if (fileUpdate != null) {
            prepareImage(sessionStorage.getItem("id_user_detail"));
        } else {
            prepareUser();
        }
    }
}

// CHECK UPDATE FORM
var listInputUpdate = $$(".update-user-form__input");
var listWarningUpdate = $$(".warning-update");


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

    for (let i=1; i<7; i++) {
        if (listInputUpdate[i].value == "") {
            listInputUpdate[i].addEventListener('focus',focusInputUpdateForm(i));
            listInputUpdate[i].addEventListener('blur',blurInputUpdateForm(i));
            
            listInputUpdate[i].style.borderColor = "red"
            listWarningUpdate[i].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

    if (sBtn_text.innerText == "Công Ty") {
        if (listInputUpdate[7].value == "") {
            listInputUpdate[7].addEventListener('focus',focusInputUpdateForm(7));
            listInputUpdate[7].addEventListener('blur',blurInputUpdateForm(7));
            
            listInputUpdate[7].style.borderColor = "red"
            listWarningUpdate[7].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

    return isValid;
}

// CHANGE IMAGE
var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 

        fileUpdate = input_img_file_update.files[0];

        let avt = $(".detail-img");

        avt.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}


// SEARCHH
var searchBar3 = $(".select-company__search");

searchBar3.addEventListener('keyup', function() {
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