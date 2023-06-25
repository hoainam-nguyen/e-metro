var modal = $(".modal");
var addCompanyForm = $(".add-company-form");

var btn_add = $(".add-container");

btn_add.onclick = function() {
    modal.style.display = "block"
    addCompanyForm.style.display = "block";
}

var btnCancelModal = $("#add_btn_cancel");

btnCancelModal.onclick = function() {
    modal.style.display = "none"
    addCompanyForm.style.display = "none";
}

var loaderAdd = $(".loader-add");

const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});

var fileAdd = null;
var fileUpdate = null;

var getCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=";
var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";
var createCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/insert";
var uploadImageApi = "https://aiclub.uit.edu.vn/namnh/emetro/upload-image";
var updateCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/update";


async function start() {
    getCompany(renderCompany);
    await getCompanies(renderCompanies)
        .then(function(result){
            if (result){
                setOnClickAllItem();
            }
        });
}

start();

function getCompany(callback) {

    let id = sessionStorage.getItem("id_company");

    fetch(getCompanyApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function() {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

function renderCompany(company) {
    let data = company.data[0];

    var listInput = $$(".detail-company__input");    

    listInput[0].value = data.id;
    listInput[1].value = data.name;
    listInput[2].value = data.website;
    listInput[3].value = data.address;
    listInput[4].value = data.phone;

    if (data.status == 1) {
        sBtn_text_update.innerText = "Còn khai thác";
    } else {
        sBtn_text_update.innerText = "Dừng khai thác";
    }

    var img_update  = $(".detail-img");

    if (data.image_url != null) {
        img_update.style.backgroundImage = `url(${data.image_url})`;
    }
}




// GET ALL COMPANY
async function getCompanies(callback) {
    return fetch(getAllCompaniesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function() {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

async function renderCompanies(companies) {
    var data = companies.data;
    let tableCompanies = $(".search-company-list"); 

    let htmls = data.map(function(company) {

        let url = "/fe/assets/img/blank_img.png";

        if (company.image_url != null) {
            url = company.image_url;
        }
        

        return `<li class="search-company-item">
                    <a>
                        <div class="item__img" style="background-image: url('${url}');">
                        </div>
                        <div class="item__info">
                            <span class="item__code">${company.id}</span>
                            <span class="item__name">${company.name}</span>
                        </div>
                    </a>
                </li>`;
    });

    tableCompanies.innerHTML = htmls.join('');
    return true;
}

function setOnClickAllItem() {
    let all_tr = $$(".search-company-item");

    for (let i =0 ; i< all_tr.length; i++) {
        let all_columns = all_tr[i].getElementsByTagName("span");
        let id_company = all_columns[0];
        setOnClickItem(id_company.innerText, all_tr[i]);
    }
}

function setOnClickItem(id_company, item) {

    var onClickItem = function() {
        return function() {
            sessionStorage.setItem("id_company", id_company);
            window.location.href = 'detail_company.html';
        }
    }
    item.addEventListener('click', onClickItem());
}


// UPDATE IMAGE
async function updateImage(id) {
    if (fileUpdate != null) {

        var imageBox = {
            type: "companies",
            id: id,
            image_base64: await toBase64(fileUpdate)
        }

        return await uploadImage(imageBox);
        
    } else {
        return "done";
    }
}

// UPLOAD IMAGE
async function uploadImage(newImage) {
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
            console.log(data);
            
            return data.id;
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
            console.log(res);
            return true;
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

// CREATE COMPANY
async function createCompany(newCompany, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newCompany)
    };

    return fetch(createCompanyApi, options) 
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

async function callBackForUploadImage(raw) {
    let data = raw.data;

    if (fileAdd != null) {

        var imageBox = {
            type: "companies",
            id: data.id,
            image_base64: await toBase64(fileAdd)
        }

        return await uploadImage(imageBox);
    } else {
        return data.id;
    }

}



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

// SEARCH

var searchBar = $(".search-detail");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".search-company-item");

    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("span");
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

// UPDATE
var input_img_file_update = $("#input-img-file-update");
var company_avt_update = $(".detail-img");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        fileUpdate = input_img_file_update.files[0];
        company_avt_update.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}



var listInputUpdate = $$(".detail-company__input");
var listWarningUpdate = $$(".warning-update");



// BTN UPDATE
var btnUpdate = $(".update-container");

btnUpdate.onclick = async function() {
    if (checkUpdateForm()) {

        let id = listInputUpdate[0].value;

        if (sBtn_text_update.innerText == "Còn khai thác") {
            var status = 1;
        } else {
            var status = 0;
        }

        let newCompany = {
            id: Number(id),
            data: {
                name: listInputUpdate[1].value,
                address: listInputUpdate[3].value,
                address_head: "nothing",
                website: listInputUpdate[2].value,
                phone: listInputUpdate[4].value,
                status: status
            }
        }

        await updateImage(Number(id))
            .then(function(result) {
                updateCompany(newCompany)
                    .then(function(result){
                        if (result == true) {
                            sessionStorage.setItem("id_company", id);
                            getCompany(renderCompany);

                            toast({
                                title: "Cập nhật thành công!",
                                message: "Bạn đã cập nhật công ty thành công!",
                                type: "success",
                                duration: 3000
                              });
                        }
                    });
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

    if (listInputUpdate[4].value.indexOf(".") > -1 || listInputUpdate[4].value.indexOf("+") > -1 || listInputUpdate[4].value.indexOf("-") > -1 ) {
        listInputUpdate[4].addEventListener('focus',focusInputUpdateForm(3));
        listInputUpdate[4].addEventListener('blur',blurInputUpdateForm(4));
        listInputUpdate[4].style.borderColor = "red"
        isValid = false;
    }

    return isValid;
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

    modal.style.display = "none"
    loaderAdd.style.display = "none";
    addCompanyForm.style.display = "none";
}




var listInputAdd = $$(".add-company-form__input");
var listWarningAdd =  $$(".warning-add");

// ADD

var btnAdd = $("#add_btn_yes");

btnAdd.onclick = async function() {
    if (checkAddForm()) {
        
        loaderAdd.style.display = "inline-block";

        let newCompany = {
            data: {
                name: listInputAdd[0].value,
                address: listInputAdd[2].value,
                address_head: "nothing",
                website: listInputAdd[1].value,
                phone: listInputAdd[3].value,
                status: 1
            }
        }
        
        // console.log(newCompany);
       
        await createCompany(newCompany, callBackForUploadImage)
            .then(async function (id) {
                sessionStorage.setItem("id_company", id);
                getCompany(renderCompany);
                await getCompanies(renderCompanies)
                    .then(function(result){
                        if (result){
                            setOnClickAllItem();
                        }
                    });

                clearAddForm();                
            });
    }
}

var input_img_file = $("#input-img-file");
var company_avt_add = $(".add-company-form__img");

if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        fileAdd = input_img_file.files[0];
        company_avt_add.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}



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
    
    for (let i=0; i<listInputAdd.length; i++) {
        if (listInputAdd[i].value == "") {
            listInputAdd[i].addEventListener('focus',focusInputAddForm(i));
            listInputAdd[i].addEventListener('blur',blurInputAddForm(i));
            
            listInputAdd[i].style.borderColor = "red"
            listWarningAdd[i].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

    if (listInputAdd[3].value.indexOf(".") > -1 || listInputAdd[3].value.indexOf("+") > -1 || listInputAdd[3].value.indexOf("-") > -1 ) {
        listInputAdd[3].addEventListener('focus',focusInputAddForm(3));
        listInputAdd[3].addEventListener('blur',blurInputAddForm(3));
        listInputAdd[3].style.borderColor = "red"
        isValid = false;
    }

    return isValid;
}