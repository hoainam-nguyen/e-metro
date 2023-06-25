var modal = $(".modal");
var dataTable = $("#dataTable");
var add_form = $(".add-station-form");
var update_form = $(".update-station-form");

var select_menu_add = $(".select-menu-add");
var select_menu_update = $(".select-menu-update");

var station_img_add = $(".add-station-form__img");
var station_img_update = $(".update-station-form__img");

var row_selected = null;



// API
var fileAdd = null;
var fileUpdate = null;
var currentRowEdit = null;

var getAllStationsApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/getall";
var getStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/search/?id=";
var createStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/insert";
var uploadImageApi = "https://aiclub.uit.edu.vn/namnh/emetro/upload-image";
var updateStationApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/update";

const toBase64 = async file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
});

function start() {
    getAllStations(renderStations);
}

start();

// GET ALL STATION
async function getAllStations(callback) {
    fetch(getAllStationsApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            toast({
                title: "Lỗi!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

async function renderStations(stations) {
    var data = stations.data;
    let tableStations = $("table tbody"); 

    let htmls = data.map(function(station) {

        let status = "Bình thường";
        if (station.status == 0) {
            status = "Đã ngừng hoạt động";
        } else {
            if (station.status == 1) {
                status = "Đang sửa chữa";
            }
        }

        return `<tr>
                <td>${station.id}</td>
                <td>${station.name}</td>
                <td>${station.description}</td>
                <td>${status}</td>
                <td style="display: none;">${station.image_url}</td>
                <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
                </tr>`;
    });

    tableStations.innerHTML = htmls.join('');
    setOnClickTable();
}

function setOnClickTable() {
    updateTotal();
    var rows = dataTable.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        onClickTable(rows[i]);
    }
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
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
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
        .then(function(res) {
            console.log(res);
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

// GET 1 STATION
function getStation(id, callback) {
    fetch(getStationApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
        });
}

function renderStation(station) {
    let data = station.data[0];

    let listCells = currentRowEdit.getElementsByTagName("td");

    listCells[1].innerText = data.name;
    listCells[2].innerText = data.description;

    if (data.status == 0) {
        listCells[3].innerText = "Đã ngừng hoạt động";
    } else {
        if (data.status == 1) {
            listCells[3].innerText = "Đang sữa chửa";
        } else {
            listCells[3].innerText = "Bình thường";
        }
    }

    listCells[4].innerText = data.image_url;
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
            toast({
                title: "Thất bại!",
                message: "Có lỗi xảy ra!",
                type: "error",
                duration: 3000
              });
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

// 
async function renderStationEndList(station) {
    let data = station.data[0];

    let tableCompanies = $("table tbody"); 

    let status = "Bình thường";
    if (data.status == 0) {
        status = "Đã ngừng hoạt động";
    } else {
        if (data.status == 1) {
            status = "Đang sửa chữa";
        }
    }

    let htmls =    `<tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.description}</td>
                    <td>${status}</td>
                    <td style="display: none;">${data.image_url}</td>
                    <td><i class="fa-sharp fa-solid fa-pen-to-square edit"></i></td>
                    </tr>`;

    tableCompanies.innerHTML += htmls;
    setOnClickTable();
}

// CLEAR ADD FORM
function clearAddForm() {
    let input = $('.add-station-form__input');
    input.value = '';

    let textarea = $(".add-station-form__textarea"); 
    textarea.value = '';

    sBtn_text_add.innerText = "Tình trạng hoạt động";

    station_img_add.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";

    select_menu_add.style.display = "none";
    add_form.style.display = "none";    
    modal.style.display = "none"
}

// Click button thêm mới nhà ga
var btn_add_station = $(".add");

btn_add_station.onclick =  function() {
    modal.style.display = "block";
    add_form.style.display = "block";
    select_menu_add.style.display = "block";
}

// select menu add
const optionMenu = document.querySelector(".select-menu-update"),
       selectBtn = optionMenu.querySelector(".select-btn-update"),
       options = optionMenu.querySelectorAll(".option-update"),
       sBtn_text = optionMenu.querySelector(".sBtn-text-update");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text-update").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});

// Click HỦY on add form
var btnCancel = $("#add_btn_cancel");
btnCancel.onclick = clearAddForm;

// click THÊM on add form 
var listInputAdd = $$(".add-station-form__input");
var textareaAdd = $(".add-station-form__textarea");
var listWarningAdd = $$(".warning-add");

var btnOk = $("#add_btn_yes");

btnOk.onclick = async function() {
    if (checkAddForm() == true) {
        
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
            .then(function(id) {
                getStation(id, renderStationEndList);
                toast({
                    title: "Thêm mới thành công!",
                    message: "Bạn đã thêm mới nhà ga thành công!",
                    type: "success",
                    duration: 3000
                  });
            });

        clearAddForm();
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



// Click change img on add form
var input_img_file = $("#input-img-file");

if (input_img_file != null) {
    input_img_file.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file.files[0]); 
        fileAdd = input_img_file.files[0];
        station_img_add.style.backgroundImage = `url(${imgURL})`;
        input_img_file.value = '';
    };
}


// CLICK TABLE
   


function onClickTable(currentRow)
{
    var onClickRow = function(row) {
        return function() {
            var cell = row.getElementsByTagName("td");

            sessionStorage.setItem("id_station", cell[0].innerText);
            window.location.href = 'detail_station.html';      
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 

    // Click on edit button
    var cells = currentRow.getElementsByTagName("td");

    var btn_edit = cells[5].getElementsByTagName("i");

    var onClickEditButton = function(array_td) {
        return function(e) {
            e.preventDefault();
            e.stopPropagation(); 

            var station = {
                id: array_td[0].innerText,
                name: array_td[1].innerText,
                description: array_td[2].innerText,
                status: array_td[3].innerText,
                image_url: array_td[4].innerText
            };

            currentRowEdit = currentRow;

            displayUpdateForm();
            setDataUpdateForm(station);
        };
    };

    btn_edit[0].addEventListener('click', onClickEditButton(cells));
}



function setDataUpdateForm(station) {
    let listInputUpdate = $$('.update-station-form__input');
    let textareaUpdate = $(".update-station-form__textarea");

    listInputUpdate[0].value = station.id;
    listInputUpdate[1].value = station.name;

    textareaUpdate.value = station.description;


    sBtn_text.innerText = station.status;

    if (station.image_url != "null") {
        station_img_update.style.backgroundImage = `url('${station.image_url}')`;
    }
}

function displayUpdateForm() {
    modal.style.display = "block";
    update_form.style.display = "block";
}

// select menu update
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


// click button change image on update form
var input_img_file_update = $("#input-img-file-update");

if (input_img_file_update != null) {
    input_img_file_update.onchange = function() {
        let imgURL = URL.createObjectURL(input_img_file_update.files[0]); 
        fileUpdate = input_img_file_update.files[0];
        station_img_update.style.backgroundImage = `url(${imgURL})`;
        input_img_file_update.value = '';
    };
}

// click button HỦY on update form
var btnCancel_update = $("#update_btn_cancel");

function closeUpdateForm() { 
    station_img_update.style.backgroundImage = "url('/fe/assets/img/blank_img.png')";
    update_form.style.display = "none";
    modal.style.display = "none";
}

btnCancel_update.onclick = closeUpdateForm;

// click button CẬP NHẬT on update form
var btnOk_update = $("#update_btn_yes");

btnOk_update.onclick = async function() {
    if (checkUpdateForm()) {    

        if (sBtn_text.innerText == "Bình thường") {
            var status = 2;
        } else {
            if (sBtn_text.innerText == "Đang sửa chữa") {
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
                updateStation(newStation);
                getStation(Number(listInputUpdate[0].value), renderStation);
                // console.log(result);
                toast({
                    title: "Cập nhật thành công!",
                    message: "Bạn đã cập nhật nhà ga thành công!",
                    type: "success",
                    duration: 3000
                  });
                closeUpdateForm();
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

var listInputUpdate = $$('.update-station-form__input');
var textareaUpdate = $(".update-station-form__textarea");
var listWarningUpdate = $$(".warning-update");

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

// SEARCH
var searchBar = $(".search");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();
    var all_tr = dataTable.getElementsByTagName("tr");
    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("td");
        for(j=0; j < all_columns.length - 2; j++){
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


// SORT

const table_headings = $$(".table_heading");

table_headings.forEach(function(head,i) {
    head.onclick = () => {
        if (head.classList.contains('table_heading_active_asc')) {
            head.classList.remove('table_heading_active_asc');
            head.classList.add('table_heading_active_desc');
            sortTable(i, true);
        } else 
        if (head.classList.contains('table_heading_active_desc')) {
            head.classList.remove('table_heading_active_desc');
            head.classList.add('table_heading_active_asc');
            sortTable(i, false);
        }
        else {
            table_headings.forEach(head => head.classList.contains('table_heading_active_asc') 
            ? head.classList.remove('table_heading_active_asc') 
            : head.classList.remove('table_heading_active_desc'));

            head.classList.add('table_heading_active_asc');

            sortTable(i, false);
        }
    }
});

function sortTable(column, isDesc) {
    const table_rows = $$('tbody tr');
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].innerText.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].innerText.toLowerCase();

            if (column == 0) {
                first_row = Number(first_row);
                second_row = Number(second_row);
            } 

        return isDesc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// FILTER


var RowWithFilter = function(checkbox) {
    return function() { 
        let string = null;

        if (checkbox.checked) {
            checkbox.removeAttribute("checked"); 
            string = "";
        } else {
            checkbox.setAttribute("checked", "checked");
            string = "none";
        }

        let all_tr = dataTable.getElementsByTagName("tr");
        for (let i = 1; i < all_tr.length; i++){
            let all_columns = all_tr[i].getElementsByTagName("td");
            let column_value = all_columns[3].textContent || all_columns[3].innerText;
            if (column_value == checkbox.value) {
                all_tr[i].style.display = string;
            }        
        }
    }
}


var checkbox = $$(".checkbox");
checkbox.forEach(function(checkbox) {
    checkbox.addEventListener('click', RowWithFilter(checkbox));
});


// UPDATE TOTAL
function updateTotal() {
    let total = $(".result");
    let all_rows = $$("table tbody tr");

    total.innerText = "Total: " + all_rows.length;
}


