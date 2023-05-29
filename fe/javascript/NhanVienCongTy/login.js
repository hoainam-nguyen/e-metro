

const forgotpass = document.querySelector('.reset');
const close = document.querySelector('.btn-close-change');
const modal = document.querySelector('.modal');

function OpenForgot(){
    modal.classList.add('open');
}

forgotpass.onclick = function(){
    modal.style.display = "block"
}

close.onclick = function(){
    modal.style.display = "none"
}
