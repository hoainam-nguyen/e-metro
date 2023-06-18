

// const forgotpass = document.querySelector('.reset');
// const close = document.querySelector('.btn-close-change');
// const modal = document.querySelector('.modal');

// function OpenForgot(){
//     modal.classList.add('open');
// }

// forgotpass.onclick = function(){
//     modal.style.display = "block"
// }

// close.onclick = function(){
//     modal.style.display = "none"
// }

// var checkUserApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/verify?user_email=21522262@gm.uit.edu.vn&user_password=21522262";
var getUserApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=";
var resetPasswordApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/reset?user_email=";

function start() {
    
}

start();

// GET USER

async function getUser(id) {

    return fetch(getUserApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            return user.data[0].type;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
}

async function checkUser(email, password) {

    let checkUserApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/verify?user_email=" + email + "&user_password=" +password;
    

    // console.log(checkUserApi);
    return fetch(checkUserApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            let data = user.data;
            // console.log(user);
            return data.user_id;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
}

async function resetPassword(email) {

    return fetch(resetPasswordApi + email)
        .then(function(response) {
            return response.json();
        })
        .then(function(status) {
            return status.msg;
        })
        .catch(function(err) {
            console.log(err);
            return null;
        });
}





var btnLogin = $(".login-box");

btnLogin.onclick = function() {
    if (checkLoginForm()) {
        let username = $("#username");
        let password = $("#password");

        checkUser(username.value, password.value)
            .then(function (user_id) {
                if (user_id != null) {
                    getUser(user_id)
                    .then(function (type) {

                        switch (type) {
                            case 1:
                                window.location.href = 'home.html';
                                break;
                        }
                    });

                } else {
                    alert("Email hoặc mật khẩu chưa chính xác!");
                }
            });
    }
}


var blur = function() {
    return function(e) {
        e.target.style.borderColor = "rgba(0, 0, 0, 0.5)";
    };
}

function checkLoginForm() {
    let isValid = true;

    let username = $("#username");
    let password = $("#password");
 
    if (username.value == "" || password.value == "") {
        isValid = false;

        if (username.value == "") {
            username.style.borderColor = 'red';
            username.addEventListener('blur', blur());
        } 

        if (password.value == "") {
            password.style.borderColor = 'red';
            password.addEventListener('blur', blur());
        } 

        alert("Vui lòng nhập đầy đủ thông tin!");    
    }

    return isValid;
}


var forgotpass = $(".forgot-password");


forgotpass.onclick = function() {
    if (checkLoginForm_Forgot()) {
        if (confirm("Bạn có chắc chắn cấp lại mật khẩu?") == true) {
            let username = $("#username");
            resetPassword(username.value)
            .then(function (status) {
                if (status == "Finish") {
                    alert("Mật khẩu mới đã được cấp qua email!");
                } else {
                    alert("Email không chính xác");
                }
            });
        }
    }
    
}


function checkLoginForm_Forgot() {
    let isValid = true;

    let username = $("#username");
 
    if (username.value == "") {
        isValid = false;

        username.style.borderColor = 'red';
        username.addEventListener('blur', blur());
        
        alert("Vui lòng nhập email!");
    }

    return isValid;
}