var file = null;

function getUser(id) {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            let data = user.data[0];

            if (data.company_id == -1) {

                let tructhuoc = $(".tructhuoc");
                tructhuoc.style.display = "none";

                console.log("KHÔNG PHẢI");

            } else {
                console.log("PHẢI");
            }

            renderUser(data);
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

getUser(sessionStorage.getItem("id_user"));

function renderUser(user) {
    var listInput = $$(".in4-input");

    let position = "";

    switch (user.type) {
        case 0:
            position = "Quản trị viên";
            break;
        case 1:
            position = "Nhân viên Sở Giao thông Thành Phố";
            break;
        case 2: {
            position = "Nhân viên Công ty";
            getNameCompany(user.company_id);
            break;
        }
        case 3:
            position = "Nhân viên bán vé";
            break;
    }

    listInput[0].value = position;
    listInput[2].value = user.id;
    listInput[3].value = user.fullname;
    listInput[4].value = user.birth_of_date;
    listInput[5].value = user.phone;
    listInput[6].value = user.user_email;
    listInput[7].value = user.address;

    let img = $(".user-avt");

    if (user.image_url != null) {
        img.style.backgroundImage = `url(${user.image_url})`;
    }

    let name = $(".text-desc__title");

    name.innerText = user.fullname;
}

// GET NAME COMPANY
function getNameCompany(id) {

    fetch("https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(company) {
            let data = company.data[0];

            var listInput = $$(".in4-input");

            listInput[1].value = data.name;
        })
        .catch(function(err) {
            console.log(err);
        });
}


// API IMAGE

const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});

async function prepareImage() {

    var newImage = {
        type: "users",
        id: sessionStorage.getItem("id_user"),
        image_base64: await toBase64(file)
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
                message: "Bạn đã cập nhật tài khoản thành công!",
                type: "success",
                duration: 3000
              });

            // 
            getUser(sessionStorage.getItem("id_user"));
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

    let listInput = $$(".in4-input");

    let newUser = {
        id: sessionStorage.getItem("id_user"),
        data: {
            fullname: listInput[3].value,
            phone: listInput[5].value,
            birth_of_date: listInput[4].value,
            address: listInput[7].value
        }
    }

    updateUser(newUser);
}


var btnUpdate = $(".update-user");

btnUpdate.onclick = function() {
    if (checkForm()) {
        if (file != null) {
            prepareImage();
        } else {
            prepareUser();
        }
    }
}

var focus = function() {
    return function(e) {
        e.target.style.borderColor = "var(--purple)";
    };
}

function checkForm() {
    isValid = true;

    var listInput = $$(".in4-input");

    if (listInput[3].value == "") {
        listInput[3].addEventListener('focus', focus());
        listInput[3].style.borderColor = "red";

        isValid = false;
    }

    if (listInput[5].value == "") {
        listInput[5].addEventListener('focus', focus());
        listInput[5].style.borderColor = "red";

        isValid = false;
    }

    if (listInput[7].value == "") {
        listInput[7].addEventListener('focus', focus());
        listInput[7].style.borderColor = "red";

        isValid = false;
    }

    return isValid;
}


// IMG 
var img = $("#img");

img.onchange = function() {
    let imgURL = URL.createObjectURL(img.files[0]); 
    file = img.files[0];

    let avt = $(".user-avt");
    avt.style.backgroundImage = `url(${imgURL})`;

    img.value = '';
};


// KEY PRESS PHONE
var phone = $(".phone");

phone.onkeypress = function (e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <= 57) {
        return true;  
    } else {
        return false;
    }
}

