var modal = $(".modal");

var btn_add = $(".add-container");

btn_add.onclick = function() {
    modal.style.display = "block"
}

var btnCancelModal = $("#add_btn_cancel");

btnCancelModal.onclick = function() {
    modal.style.display = "none"
}