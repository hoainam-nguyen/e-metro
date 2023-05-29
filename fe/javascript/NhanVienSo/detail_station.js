var add_img = $(".add-station-form__img");

var stationObject = JSON.parse(sessionStorage.getItem("stationObject"));

function start() {
    renderData();
}

start();

function renderData() {
    let listInput = $$(".detail-station__input");
    let textarea = $(".detail-station__textarea");
    let menuTitle = $(".sBtn-text-update");

    listInput[0].value = stationObject.id;
    listInput[1].value = stationObject.name;

    textarea.value = stationObject.desc;

    menuTitle.innerText = stationObject.status;
}


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

const optionMenu_add = document.querySelector(".select-menu-add"),
       selectBtn_add = optionMenu_add.querySelector(".select-btn-add"),
       options_add = optionMenu_add.querySelectorAll(".option-add"),
       sBtn_text_add = optionMenu_add.querySelector(".sBtn-text-add");
selectBtn_add.addEventListener("click", () => optionMenu_add.classList.toggle("active"));       
options_add.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-add").innerText;
        sBtn_text_add.innerText = selectedOption;
        optionMenu_add.classList.remove("active");
    });
});

var modal = $(".modal");

function openAddModal() {
    modal.style.display = "block"
}


var add_btn = $(".add-container");

add_btn.onclick = function() {
    openAddModal();
}

var btnCancelModal = $("#add_btn_cancel");

btnCancelModal.onclick = function() {
    clearAddForm();
}

function clearAddForm() {
    let input = $('.add-station-form__input');
    input.value = '';

    let textarea = $(".add-station-form__textarea"); 
    textarea.value = '';
    
    let sBtn_text_add = $(".sBtn-text-add");
    sBtn_text_add.innerText = "Tình trạng hoạt động";

    add_img.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";


    modal.style.display = "none";
}






var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
      
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        add_img.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}

var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let detail_img = $(".detail-img");
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        detail_img.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}