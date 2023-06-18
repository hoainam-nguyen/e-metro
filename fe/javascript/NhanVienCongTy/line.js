var modal = $(".modal");
var dataTable = $("#dataTable");
var add_form = $(".add-line-form");


var btn_add = $(".add");


btn_add.onclick = function() {
    modal.style.display = "block";
    add_form.style.display = "block";
}


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