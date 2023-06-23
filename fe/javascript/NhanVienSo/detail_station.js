var fileAdd = null;
var fileUpdate = null;

var add_img = $(".add-station-form__img");

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
var addStationForm = $(".add-station-form");

function openAddModal() {
    modal.style.display = "block"
    addStationForm.style.display = "block"
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
    addStationForm.style.display = "none";
}


var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
      
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        fileAdd = input_img_file.files[0];
        add_img.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}

var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let detail_img = $(".detail-img");
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        fileUpdate = input_img_file_update.files[0];
        detail_img.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}

// API

const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});



var getAllStationsApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/getall";
var getStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/search/?id=";
var createStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/insert";
var uploadImageApi = "https://aiclub.uit.edu.vn/namnh/emetro/upload-image";
var updateStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/update";


async function start() {
    getStation(renderStation);
    await getStations(renderStations)
        .then(function(result){
            if (result){
                setOnClickAllItem();
            }
        });
}

start();

function getStation(callback) {

    let id = sessionStorage.getItem("id_station");

    // console.log(id);

    fetch(getStationApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderStation(station) {
    let data = station.data[0];

    var listInputUpdate = $$(".detail-station__input");    

    listInputUpdate[0].value = data.id;
    listInputUpdate[1].value = data.name;
  
    var textareaUpdate = $(".detail-station__textarea");

    textareaUpdate.value = data.description;

    if (data.status == 0) {
        sBtn_text_update.innerText = "Đã ngừng hoạt động";
    } else {
        if (data.status == 1) {
            sBtn_text_update.innerText = "Đang sửa chữa";
        } else {
            sBtn_text_update.innerText = "Bình thường";
        }
    }

    var img_update  = $(".detail-img");

    if (data.image_url != null) {
        img_update.style.backgroundImage = `url(${data.image_url})`;
    } else {
        img_update.style.backgroundImage = `url('/fe/assets/img/blank_img.png')`;
    }
}


// GET ALL STATION
async function getStations(callback) {
    return fetch(getAllStationsApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

async function renderStations(station) {
    var data = station.data;
    let tableStation = $(".search-station-list"); 

    let htmls = data.map(function(station) {

        let url = "/fe/assets/img/blank_img.png";

        if (station.image_url != null) {
            url = station.image_url;
        }
        

        return `<li class="search-station-item">
                    <a>
                        <div class="item__img" style="background-image: url('${url}');">
                        </div>
                        <div class="item__info">
                            <span class="item__code">${station.id}</span>
                            <span class="item__name">${station.name}</span>
                        </div>
                    </a>
                </li>`;
    });

    tableStation.innerHTML = htmls.join('');
    // console.log(data);
    return true;
}

function setOnClickAllItem() {
    let all_tr = $$(".search-station-item");

    for (let i =0 ; i< all_tr.length; i++) {
        let all_columns = all_tr[i].getElementsByTagName("span");
        let id_station = all_columns[0];
        setOnClickItem(id_station.innerText, all_tr[i]);
    }
}

function setOnClickItem(id_station, item) {

    var onClickItem = function() {
        return function() {
            sessionStorage.setItem("id_station", id_station);
            window.location.href = 'detail_station.html';
        }
    }
    item.addEventListener('click', onClickItem());
}

// UPDATE IMAGE
async function updateImage(id) {
    if (fileUpdate != null) {

        var imageBox = {
            type: "stations",
            id: id,
            image_base64: await toBase64(fileUpdate)
        }

        return await uploadImage(imageBox);

    } else {
        return id;
    }
}

async function uploadImage(newImage) {
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
            console.log(err);
        }); 
}

// UPDATE STATION 
async function updateStation(newStation) {
    // console.log(newStation);
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newStation)
    };

    fetch(updateStationApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function() {
            return true;
        })
        .catch(function(err) {
            console.log(err);
        });
}


// INSERT STATION
async function createStation(newStation, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newStation)
    };

    return fetch(createStationApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        }); 
}

async function callBackForUploadImage(raw) {
    let data = raw.data;

    if (fileAdd != null) {

        var imageBox = {
            type: "stations",
            id: data.id,
            image_base64: await toBase64(fileAdd)
        }

        
        // console.log("CO ANH MA");
        return await uploadImage(imageBox);
    } else {
        return data.id;
    }
}




// SEARCH

var searchBar = $(".search-detail");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".search-station-item");

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


// UPDATE BUTTON

var listInputUpdate = $$(".detail-station__input");
var listWarningUpdate = $$(".warning-update");
var textareaUpdate = $(".detail-station__textarea");

var btnUpdate = $(".update-container");

btnUpdate.onclick = async function() {

    if (checkUpdateForm()) {

        if (sBtn_text_update.innerText == "Bình thường") {
            var status = 2;
        } else {
            if (sBtn_text_update.innerText == "Đang sửa chữa") {
                var status = 1;
            } else {
                var status = 0;
            }
        }

        let newStation =  {
            id: Number(listInputUpdate[0].value),
            data: {
                name: listInputUpdate[1].value,
                description: textareaUpdate.value,
                status: status
            }
        }
       
        await updateImage(Number(listInputUpdate[0].value))
            .then(function(result) {
                updateStation(newStation)
                    .then(function(result) {
                        if (result == true) {
                            sessionStorage.setItem("id_station", listInputUpdate[0].value);
                            getStation(renderStation);
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
   
    if (listInputUpdate[1].value == "") {
        listInputUpdate[1].addEventListener('focus',focusInputUpdateForm(0));
        listInputUpdate[1].addEventListener('blur',blurInputUpdateForm(1));
        
        listInputUpdate[1].style.borderColor = "red"
        listWarningUpdate[0].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (textareaUpdate.value == "") {
        textareaUpdate.addEventListener('focus',focusInputUpdateForm(1));
        textareaUpdate.addEventListener('blur',blurInputUpdateForm(2));
        
        textareaUpdate.style.borderColor = "red"
        listWarningUpdate[1].style.display = "inline-block"                     
        
        isValid = false;
    }

    return isValid;
}


// ADD BUTTON
var listInputAdd = $$(".add-station-form__input");
var listWarningAdd = $$(".warning-add");
var textareaAdd = $(".add-station-form__textarea");

var btnAdd = $("#add_btn_yes");

btnAdd.onclick = async function() {
    if (checkAddForm()) {

        if (sBtn_text_add.innerText == "Đã ngừng hoạt động") {
            var status = 0;
        } else {
            if (sBtn_text_add.innerText == "Đang sửa chữa") {
                var status = 1;
            } else {
                var status = 2;
            }
        }   

        let newStation = {
            data: {
                name: listInputAdd[0].value,
                description: textareaAdd.value,
                status: status
            }
        }
       
        await createStation(newStation, callBackForUploadImage)
            .then(async function (id) {
                sessionStorage.setItem("id_station", id);
                getStation(renderStation);

                await getStations(renderStations)
                    .then(function(result){
                        if (result) {
                            setOnClickAllItem();
                        }
                    });

                clearAddForm();                
            });
    }
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
    
    if (listInputAdd[0].value == "") {
        listInputAdd[0].addEventListener('focus',focusInputAddForm(0));
        listInputAdd[0].addEventListener('blur',blurInputAddForm(0));
        
        listInputAdd[0].style.borderColor = "red"
        listWarningAdd[0].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (textareaAdd.value == "") {
        textareaAdd.addEventListener('focus',focusInputAddForm(1));
        textareaAdd.addEventListener('blur',blurInputAddForm(1));
        
        textareaAdd.style.borderColor = "red"
        listWarningAdd[1].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (sBtn_text_add.innerText == "Tình trạng hoạt động") {
        listWarningAdd[2].style.display = "inline-block";
        selectBtn_add.addEventListener("click", () => listWarningAdd[2].style.display = "none" );
        isValid = false;
    }

    return isValid;
}