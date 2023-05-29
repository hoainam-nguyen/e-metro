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

const optionMenu_update = document.querySelector(".select-menu-add"),
       selectBtn_update = optionMenu_update.querySelector(".select-btn-add"),
       options_update = optionMenu_update.querySelectorAll(".option-add"),
       sBtn_text_update = optionMenu_update.querySelector(".sBtn-text-add");
selectBtn_update.addEventListener("click", () => optionMenu_update.classList.toggle("active"));       
options_update.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-add").innerText;
        sBtn_text_update.innerText = selectedOption;
        optionMenu_update.classList.remove("active");
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
    modal.style.display = "none";
}