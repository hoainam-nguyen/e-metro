let id = sessionStorage.getItem("id_user");
let objectUser = null;

var getUserApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=";

function start() {
    getUser(id, renderUser);
}

start();

function getUser(id, callback) {
    fetch(getUserApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}

function renderUser(user) {
    var data = user.data[0];

    objectUser = data;

    sessionStorage.setItem("objectUser", objectUser);

    let name1 = $(".user-acc__name");
    let name2 = $(".user-info-name");

    name1.innerText = data.fullname;

    const arr = data.fullname.split(' ');
    name2.innerText = arr[arr.length - 1];

    if (data.image_url != null) {
        let avt = $(".user-acc__avt");
        let avt2 = $(".user-info-avt");
    
        
        avt.style.backgroundImage = `url('${data.image_url}')`;
        avt2.style.backgroundImage = `url('${data.image_url}')`;
    }
}

// LOG OUT
var btnLogOut = $(".logout");

btnLogOut.onclick = function() {    
    if (confirm("Bạn có chắc chắn muốn đăng xuất?") == true) {
        window.location.href = 'loginpage.html';
        // preventBack();
    }
}

// function preventBack() { window.history.forward(); }
// setTimeout("preventBack()", 0);
// window.onunload = function () { null };


// CHANGE PASSWORD
// API
var updateUserApi = "https://aiclub.uit.edu.vn/namnh/emetro/users/update"; 

async function updateUser(newUser) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newUser)
    };

    return fetch(updateUserApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(user) {
            getUser(user.data.id, renderUser);
        })
        .catch(function(err) {
            console.log(err);
        });
}



var modal = $(".modal");
var changePassForm = $(".change-password-form");
var btnChangePassword = $(".changepass");

var listPassInput = $$(".pass_input");
var listWarningPass = $$(".warning-pass");

btnChangePassword.onclick = function() {
    modal.style.display = "block";
    changePassForm.style.display = "block";
}

var btnPassOk = $("#pass_ok");

btnPassOk.onclick = function() {
    if (checkPassForm()) {
        if (listPassInput[0].value == objectUser.user_password && listPassInput[1].value == listPassInput[2].value) {

            let newUser = {
                id: objectUser.id,
                data: {
                    type: objectUser.type,
                    user_email: objectUser.user_email,
                    user_password: listPassInput[2].value,
                    image_url: objectUser.image_url,
                    company_id: objectUser.company_id,
                    fullname: objectUser.fullname,
                    phone: objectUser.phone,
                    birth_of_date: objectUser.birth_of_date,
                    address: objectUser.address
                }
            }

            updateUser(newUser);

            modal.style.display = "none";
            changePassForm.style.display = "none";
            clearChangePassForm();
        } else {
            if (listPassInput[0].value != objectUser.user_password) {
                alert("Mật khẩu hiện tại không đúng!");
            } else {
                alert("Mật khẩu được xác nhận chưa chính xác!");
            }
        }
    }
}

var focus = function(i) {
    return function(e) {
        e.target.style.borderColor = "var(--purple)";
        listWarningPass[i].style.display = "none";
    };
}

function checkPassForm() {
    let isValid = true;

    for(let i=0; i<listPassInput.length; i++) {
        if (listPassInput[i].value == "") {
            listPassInput[i].addEventListener('focus', focus(i));

            listPassInput[i].style.borderColor = "red"
            listWarningPass[i].style.display = "inline-block"

            isValid = false;
        }
    }

    return isValid;
} 


var btnPassCancel = $("#pass_cancel");

btnPassCancel.onclick = function() {
    modal.style.display = "none";
    changePassForm.style.display = "none";
    clearChangePassForm();
}

function clearChangePassForm() {
    for(let i=0; i<listPassInput.length; i++) {
        listPassInput[i].value = "";
    }
}