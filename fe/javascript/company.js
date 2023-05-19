var modal = $(".modal");


// Click button add company
var btn_add_company = $(".add");
var add_company_form = $(".add-company-form");

btn_add_company.onclick = function() {
    modal.style.display = "block";  
    add_company_form.style.display = "block";                                               
}  

// Click button HỦY on add company form
var add_btn_cancel = $("#add_btn_cancel");

add_btn_cancel.onclick = function() {
    // set input value = null
    var listInput = $$(".add-company-form__input");
    listInput.forEach(function (input) {
        input.value = '';
    });
    // set display modal
    modal.style.display = "none";
}

