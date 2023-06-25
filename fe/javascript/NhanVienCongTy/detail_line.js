
// console.log(id);

var modal = $(".modal");
var listRouteBanDau = null;

// API 

var getCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=";
var getAllLineApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/getall";

function start() {
    let id = sessionStorage.getItem("id_line");
    getLine(id, setDataLine);

}

start();

function getLine(id, callback) {

    fetch('https://aiclub.uit.edu.vn/namnh/emetro/lines/search/?id=' + id)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (err) {
            console.log(err);
        });
}



function setDataLine(line) {
    let data = line.data[0];

    getCompany(data.company_id)
        .then(function (company_name) {

            let status = "Còn hoạt động";
            if (data.status == 0) {
                status = "Không hoạt động";
            }

            let type = "Tốc hành";
            if (data.type == 0) {
                type = "Thường";
            }

            let listInputUpdate = $$(".update-line__input");


            listInputUpdate[0].value = data.id;
            listInputUpdate[1].value = data.name;
            listInputUpdate[2].value = data.ticket_price;
            listInputUpdate[3].value = data.start_time;
            listInputUpdate[4].value = data.end_time;
            listInputUpdate[5].value = data.company_id + " - " + company_name;
            listInputUpdate[6].value = "Đi qua " + data.route.length + " nhà ga";

            sBtn_text_update.innerText = type;

            sBtn_text_update2.innerText = status;

            let listMinSecOption = $$(".min-sec-option");

            let arr = data.wait_time.split(":");

            listMinSecOption[0].value = arr[0];
            listMinSecOption[1].value = arr[1];

            listRouteBanDau = data.route;

            getAllStations(renderStations);

            setDataSelectRoute(data.route);
        });
}

async function getCompany(id) {
    return fetch(getCompanyApi + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (company) {
            return company.data[0].name;
        })
        .catch(function (err) {
            console.log(err);
        });
}

// KEY PRESS
var min = $(".min");

min.onkeypress = function (e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <= 57) {
        let number = Number(min.value + String.fromCharCode(x));

        if (number >= 0 && number <= 10) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

var sec = $(".sec");

sec.onkeypress = function (e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <= 57) {
        let number = Number(sec.value + String.fromCharCode(x));

        if (number >= 0 && number <= 59) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

var ticket_price = $(".ticket_price");

ticket_price.onkeypress = function (e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <= 57) {
        return true;
    } else {
        return false;
    }
}

// SET LINE DATA
async function getAllLine(company_id) {
    fetch(getAllLineApi)
        .then(function (response) {
            return response.json();
        })
        .then(function(lines) {
            renderAllLine(lines, company_id);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function renderAllLine(lines, company_id) {
    var data = lines.data;

    let tableCompanies = $(".search-company-list");

    let htmls = data.map(function (line) {

        if (line.company_id == company_id) {
            return `<li class="search-company-item">
                        <a>
                            <div class="item__info">
                                <span class="item__code">${line.id}</span>
                                <span class="item__name">${line.name}</span>
                            </div>
                        </a>
                    </li>`;
        } else {
            return "";
        }

    });

    tableCompanies.innerHTML = htmls.join('');
    setOnClickAllItem();
}

function getUser(id) {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            let data = user.data[0];

            getAllLine(data.company_id);
        })
        .catch(function(err) {
            console.log(err);
        });
}

getUser(sessionStorage.getItem("id_user"));








function setOnClickAllItem() {
    let all_tr = $$(".search-company-item");

    for (let i = 0; i < all_tr.length; i++) {
        let all_columns = all_tr[i].getElementsByTagName("span");
        let id_line = all_columns[0];
        setOnClickItem(id_line.innerText, all_tr[i]);
    }
}

function setOnClickItem(id_line, item) {

    var onClickItem = function () {
        return function () {
            sessionStorage.setItem("id_line", id_line);
            window.location.href = 'detail_line.html';
        }
    }
    item.addEventListener('click', onClickItem());
}


// SELECT COMPANY
// var btnSelectCompany = $(".select-company__input");
// var selectCompanyForm = $(".select-company-form");

// btnSelectCompany.onclick = function () {
//     var selectCompanyForm = $(".select-company-form");

//     modal.style.display = "block"
//     selectCompanyForm.style.display = "block";
// }



// var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";

// async function getCompanies(callback) {
//     fetch(getAllCompaniesApi)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(callback)
//         .catch(function (err) {
//             console.log(err);
//         });
// }

// getCompanies(renderCompanies);

// async function renderCompanies(companies) {
//     var data = companies.data;
//     let tableCompanies = $(".list-company");

//     let htmls = data.map(function (company) {

//         return `<li class="item-company">
//                     <span class="name-company">${company.id} - ${company.name}</span>
//                 </li>`;
//     });

//     tableCompanies.innerHTML = htmls.join('');
//     setOnClickListCompany();
// }

// function setOnClickListCompany() {
//     let listRowsCompany = $$(".item-company");

//     for (let i = 0; i < listRowsCompany.length; i++) {
//         setOnClickItemCompany(listRowsCompany[i]);
//     }
// }

// function setOnClickItemCompany(item) {
//     var onClickRow = function (row) {
//         return function () {
//             var rowSpan = row.getElementsByTagName("span");

//             const arr = rowSpan[0].innerText.split(" - ");

//             companySelected = {
//                 id: Number(arr[0]),
//                 name: arr[1]
//             }

//             selectCompanyForm.style.display = "none";
//             modal.style.display = "none";
//             btnSelectCompany.value = rowSpan[0].innerText;

//         };
//     };
//     item.addEventListener('click', onClickRow(item));
// }


// function resetSelectCompanyForm() {
//     searchBar.value = "";
//     let all_tr = $$(".item-company");

//     for (var i = 0; i < all_tr.length; i++) {
//         all_tr[i].style.display = ""; // show
//     }
// }

// var searchBar = $(".select-company__search");

// searchBar.addEventListener('keyup', function () {
//     var keyword = this.value;
//     keyword = keyword.toUpperCase();

//     let all_tr = $$(".item-company");

//     for (var i = 0; i < all_tr.length; i++) {
//         var all_columns = all_tr[i].getElementsByTagName("span");

//         var column_value = all_columns[0].textContent || all_columns[0].innerText;
//         column_value = column_value.toUpperCase();
//         if (column_value.indexOf(keyword) > -1) {
//             all_tr[i].style.display = ""; // show
//         } else {
//             all_tr[i].style.display = "none"; // hide
//         }
//     }
// });


// SELECT ROUTE

// SET DATA SELECT ROUTE

var getOneStation = "https://aiclub.uit.edu.vn/namnh/emetro/stations/search/?id=";

function getStation(id) {
    return fetch(getOneStation + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (station) {
            return station.data[0];
        })
        .catch(function (err) {
            console.log(err);
        });
}


async function setDataSelectRoute(arrRoute) {
    for (let i = 0; i < arrRoute.length; i++) {
        await getStation(arrRoute[i])
            .then(function (station) {
                let htmls = `<li class="item item-added">
                            <span class="name name-added">[${i + 1}] ${station.id} - ${station.name}</span>
                        </li>`;

                let table = $(".list-added");

                table.innerHTML += htmls;

                setOnClickListStationAdded();
            });
    }
}





var selectRouteForm = $(".select-route-form");

var btnSelectRoute = $(".select-route__input");

btnSelectRoute.onclick = function () {
    var selectRouteForm = $(".select-route-form");

    // let listStation = $(".list-station");

    // if (listStation.innerHTML == "") {
    //     getAllStations(renderStations);
    // }

    modal.style.display = "block";
    selectRouteForm.style.display = "block";
}

var getAllStationsApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/getall";

async function getAllStations(callback) {
    fetch(getAllStationsApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (err) {
            console.log(err);
        });
}


async function renderStations(stations) {
    var data = stations.data;
    let tableStations = $(".list-station");



    let htmls = data.map(function (station) {

        let check = true;

        for (let i = 0; i < listRouteBanDau.length; i++) {
            if (listRouteBanDau[i] == station.id) {
                check = false;
                break;
            }
        }

        if (check == true) {
            return `<li class="item item-station">
                        <span class="name name-station">${station.id} - ${station.name}</span>
                    </li>`;
        } else {
            return "";
        }
    });

    tableStations.innerHTML = htmls.join('');
    setOnClickListStation();
}

function setOnClickListStation() {
    let listRowsStation = $$(".item-station");

    for (let i = 0; i < listRowsStation.length; i++) {
        setOnClickItemStation(listRowsStation[i]);
    }
}

function setOnClickItemStation(item) {
    var onClickRow = function (row) {
        return function () {

            if (row.classList.contains('item-station-selected')) {
                row.classList.remove('item-station-selected');
            } else {
                row.classList.add('item-station-selected');
            }

        };
    };
    item.addEventListener('click', onClickRow(item));
}

var searchStation = $(".select-route__search");

searchStation.addEventListener('keyup', function () {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".item-station");

    for (var i = 0; i < all_tr.length; i++) {
        var all_columns = all_tr[i].getElementsByTagName("span");

        var column_value = all_columns[0].textContent || all_columns[0].innerText;
        column_value = column_value.toUpperCase();
        if (column_value.indexOf(keyword) > -1) {
            all_tr[i].style.display = ""; // show
        } else {
            all_tr[i].style.display = "none"; // hide
        }
    }
});


var btnAddStation = $("#select-route_btn_add");

btnAddStation.onclick = function () {
    let selectedStation = $$(".item-station.item-station-selected");

    if (selectedStation.length > 0) {
        for (let i = 0; i < selectedStation.length; i++) {

            let rowSpan = selectedStation[i].getElementsByTagName("span");

            const arr = rowSpan[0].innerText.split(" - ");

            let stationSelected = {
                id: arr[0],
                name: arr[1]
            }

            let itemAdded = $$(".item-added");

            let htmls = `<li class="item item-added">
                            <span class="name name-added">[${itemAdded.length + 1}] ${stationSelected.id} - ${stationSelected.name}</span>
                         </li>`;

            let table = $(".list-added");

            table.innerHTML += htmls;

            selectedStation[i].remove();
        }

        setOnClickListStationAdded();
    }

}


function setOnClickListStationAdded() {
    let listRowsStation = $$(".item-added");

    for (let i = 0; i < listRowsStation.length; i++) {
        setOnClickItemStation(listRowsStation[i]);
    }
}

// DELETE STATION

var btnDeleteStation = $("#select-route_btn_delete");

btnDeleteStation.onclick = function () {
    let selectedStation = $$(".item-added.item-station-selected");

    if (selectedStation.length > 0) {
        for (let i = 0; i < selectedStation.length; i++) {

            let rowSpan = selectedStation[i].getElementsByTagName("span");

            const arr1 = rowSpan[0].innerText.split("] ");
            const arr2 = arr1[1].split(" - ");

            let stationSelected = {
                id: arr2[0],
                name: arr2[1]
            }

            let htmls = `<li class="item item-station">
                            <span class="name name-station">${stationSelected.id} - ${stationSelected.name}</span>
                         </li>`;

            let table = $(".list-station");

            table.innerHTML += htmls;

            selectedStation[i].remove();
        }

        setSTT();
        setOnClickListStation();
    }
}

function setSTT() {
    let listAdded = $$(".item-added");

    for (let i = 0; i < listAdded.length; i++) {
        let rowSpan = listAdded[i].getElementsByTagName("span");

        let arr1 = rowSpan[0].innerText.split("] ");
        let arr2 = arr1[1].split(" - ");

        let itemAdded = {
            id: arr2[0],
            name: arr2[1]
        }

        let stt = i + 1;

        rowSpan[0].innerText = "[" + String(stt) + "] " + String(itemAdded.id) + " - " + String(itemAdded.name);
    }
}

// XONG
var btnOkStation = $("#select-route_form_btn_yes");

btnOkStation.onclick = function() {
    let selectRouteInput = $(".select-route__input");
    let listAdded = $$(".item-added");

    if (listAdded.length > 0) {
        selectRouteInput.value = "Đi qua " + listAdded.length + " nhà ga"; 
    } else {
        selectRouteInput.value = "";
    }

    selectRouteForm.style.display = "none";
    modal.style.display = "none";
}






// SELECT MENU
const optionMenu_update = document.querySelector(".select-menu-update"),
    selectBtn_update = optionMenu_update.querySelector(".select-btn-update"),
    options_update = optionMenu_update.querySelectorAll(".option-update"),
    sBtn_text_update = optionMenu_update.querySelector(".sBtn-text-update");
selectBtn_update.addEventListener("click", () => optionMenu_update.classList.toggle("active"));
options_update.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text-update").innerText;
        sBtn_text_update.innerText = selectedOption;
        optionMenu_update.classList.remove("active");
    });
});

// SELECT MENU
const optionMenu_update2 = document.querySelector(".select-menu-update2"),
    selectBtn_update2 = optionMenu_update2.querySelector(".select-btn-update2"),
    options_update2 = optionMenu_update2.querySelectorAll(".option-update2"),
    sBtn_text_update2 = optionMenu_update2.querySelector(".sBtn-text-update2");
selectBtn_update2.addEventListener("click", () => optionMenu_update2.classList.toggle("active"));
options_update2.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text-update2").innerText;
        sBtn_text_update2.innerText = selectedOption;
        optionMenu_update2.classList.remove("active");
    });
});


// UPDATE BUTTON

var btnUpdate = $(".update-container");

btnUpdate.onclick = function() {
    if (checkUpdateForm()) {
        let listInputUpdate = $$(".update-line__input");
        let listMinSecOption = $$(".min-sec-option");
        const arr = listInputUpdate[5].value.split(" - ");

        let type = (sBtn_text_update.innerText == "Tốc hành") ? 1 : 0; 
        let status = (sBtn_text_update2.innerText == "Còn hoạt động") ? 1 : 0; 

        let nameAdded = $$(".name-added");
        let arrCompanyId = [];

        for (let i=0; i<nameAdded.length; i++) {
            let arr1 = nameAdded[i].innerText.split("] ");
            let arr2 = arr1[1].split(" - ");
            
            arrCompanyId.push(Number(arr2[0]));
        }

        let id = sessionStorage.getItem("id_line");

        let newLine = {
            id: Number(id),
            data: {
                name: listInputUpdate[1].value,
                ticket_price: listInputUpdate[2].value,
                wait_time: listMinSecOption[0].value + ":" + listMinSecOption[1].value,
                start_time: listInputUpdate[3].value,
                end_time: listInputUpdate[4].value,
                company_id: Number(arr[0]),
                status: status,
                type: type,
                route: arrCompanyId
            }
        }

        updateLine(newLine)
        .then(function (result) {
            console.log(result);
        });
    }
}

var updateLineApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/update";

async function updateLine(newLine) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newLine)
    };

    return fetch(updateLineApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(result) {
            return result;
        })
        .catch(function(err) {
            console.log(err);
        });
}




var listWarningUpdate = $$(".warning-update");
var listMinSecOption = $$(".min-sec-option");

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

    let listInputUpdate = $$(".update-line__input");

    if (listInputUpdate[1].value == "") {
        listInputUpdate[1].addEventListener('focus',focusInputUpdateForm(0));
        listInputUpdate[1].addEventListener('blur',blurInputUpdateForm(1));
        
        listInputUpdate[1].style.borderColor = "red"
        listWarningUpdate[0].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (listInputUpdate[2].value == "") {
        listInputUpdate[2].addEventListener('focus',focusInputUpdateForm(1));
        listInputUpdate[2].addEventListener('blur',blurInputUpdateForm(2));
        
        listInputUpdate[2].style.borderColor = "red"
        listWarningUpdate[1].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (listInputUpdate[6].value == "") {
        listInputUpdate[6].addEventListener('focus',focusInputUpdateForm(6));
        listInputUpdate[6].addEventListener('blur',blurInputUpdateForm(6));
        
        listInputUpdate[6].style.borderColor = "red"
        listWarningUpdate[6].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (listMinSecOption[0].value == "" || listMinSecOption[1].value == "") {
        listMinSecOption[0].addEventListener('focus',focusInputUpdateForm(2));
        listMinSecOption[1].addEventListener('focus',focusInputUpdateForm(2));

        listMinSecOption[0].addEventListener('blur',blurInputUpdateForm(2));
        listMinSecOption[1].addEventListener('blur',blurInputUpdateForm(2));
    
        listWarningUpdate[2].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (listMinSecOption[0].value == "0" && listMinSecOption[1].value == "0") {
        listMinSecOption[0].addEventListener('focus',focusInputUpdateForm(2));
        listMinSecOption[1].addEventListener('focus',focusInputUpdateForm(2));

        listMinSecOption[0].addEventListener('blur',blurInputUpdateForm(2));
        listMinSecOption[1].addEventListener('blur',blurInputUpdateForm(2));
    
        listWarningUpdate[2].style.display = "inline-block"                     
        
        isValid = false;
    }

    return isValid;
}


// SEARCH

var searchBar3 = $(".search-detail");

searchBar3.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".search-company-item");

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

