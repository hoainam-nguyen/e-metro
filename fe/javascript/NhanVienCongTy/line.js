var modal = $(".modal");
var dataTable = $("#dataTable");
var add_form = $(".add-line-form");


// 
var companySelected = null;

// 


// 
// var listStationAdded = []; 
// var listStation = [];
// 

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

// KEY PRESS
var min = $(".min");

min.onkeypress = function(e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <=57) {
        let number = Number(min.value + String.fromCharCode(x));

        if (number >=0 && number <= 10) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }   
}

var sec = $(".sec");

sec.onkeypress = function(e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <=57) {
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

ticket_price.onkeypress = function(e) {
    let x = e.which || e.keycode;

    if (x >= 48 && x <=57) {
        return true;
    } else {
        return false;
    }   
}



// SELECT COMPANY

// var btnSelectCompany = $(".select-company__input");

// var selectCompanyForm = $(".select-company-form");

// btnSelectCompany.onclick = function() {
//     var selectCompanyForm = $(".select-company-form");

//     add_form.style.display = "none";
//     selectCompanyForm.style.display = "block";
// }


// var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";

// async function getCompanies(callback) {
//     fetch(getAllCompaniesApi)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(callback)
//         .catch(function(err) {
//             console.log(err);
//         });
// }

// getCompanies(renderCompanies);

// async function renderCompanies(companies) {
//     var data = companies.data;
//     let tableCompanies = $(".list-company"); 

//     let htmls = data.map(function(company) {

//         return `<li class="item-company">
//                     <span class="name-company">${company.id} - ${company.name}</span>
//                 </li>`;
//     });

//     tableCompanies.innerHTML = htmls.join('');
//     setOnClickListCompany();
// }

// function setOnClickListCompany() {
//     let listRowsCompany = $$(".item-company");

//     for (let i=0; i<listRowsCompany.length; i++) {
//         setOnClickItemCompany(listRowsCompany[i]);
//     }
// }

// function setOnClickItemCompany(item) {
//     var onClickRow = function(row) {
//         return function() {
//             var rowSpan = row.getElementsByTagName("span");
            
//             const arr = rowSpan[0].innerText.split(" - ");
            
//             companySelected = {
//                 id: Number(arr[0]),
//                 name: arr[1]
//             }

//             selectCompanyForm.style.display = "none";
//             btnSelectCompany.value = rowSpan[0].innerText;
//             add_form.style.display = "block";
//         };
//     }; 
//     item.addEventListener('click', onClickRow(item)); 
// }


// function resetSelectCompanyForm() {
//     searchBar.value = "";
//     let all_tr = $$(".item-company");

//     for (var i=0; i<all_tr.length; i++){
//         all_tr[i].style.display = ""; // show
//     }
// }


// var searchBar = $(".select-company__search");

// searchBar.addEventListener('keyup', function() {
//     var keyword = this.value;
//     keyword = keyword.toUpperCase();

//     let all_tr = $$(".item-company");

//     for (var i=0; i<all_tr.length; i++){
//         var all_columns = all_tr[i].getElementsByTagName("span");

//         var column_value = all_columns[0].textContent || all_columns[0].innerText;
//         column_value = column_value.toUpperCase();
//         if (column_value.indexOf(keyword) > -1){
//             all_tr[i].style.display = ""; // show
//         } else { 
//             all_tr[i].style.display = "none"; // hide
//         }
//     }
// });

function getCompanyFromId(id) {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(company) {
            let data = company.data[0];
            let input = $(".select-company__input");

            input.value = data.id + " - " + data.name;
            
            getAllLines(data.id);
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

function getUser(id) {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=" + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            let data = user.data[0];

            getCompanyFromId(data.company_id);
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





// SELECT ROUTE
var selectRouteForm = $(".select-route-form");

var btnSelectRoute = $(".select-route__input");

btnSelectRoute.onclick = function() {
    var selectRouteForm = $(".select-route-form");

    let listStation = $(".list-station");

    if (listStation.innerHTML == "") {
        getAllStations(renderStations);
    }

    add_form.style.display = "none";
    selectRouteForm.style.display = "block";
}


// API STATION
var getAllStationsApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/getall";
var createLineApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/insert";
var getAllLinesApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/getall";
var getCompanyApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/search/?id=";
var getLineApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/search/?id=";

async function getAllLines(company_id) {
    fetch(getAllLinesApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(lines) {
            renderLines(lines, company_id);
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

async function getCompany(id) {
    return fetch(getCompanyApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(company) {
            return company.data[0].name;
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



async function renderLines(lines, company_id) {
    var data = lines.data;
    let table = $("table tbody"); 

    let htmls = data.map(function(line) {

        // console.log(line.company_id);
        // console.log(objectUser.company_id);
        if (line.company_id == company_id) {     
            let status = "Còn hoạt động";
            if (line.status == 0) {
                status = "Không hoạt động";
            }
    
            let type = "Tốc hành";
            if (line.type == 0) {
                type = "Thường";
            }
    
            return `<tr>
                        <td>${line.id}</td>
                        <td>${line.name}</td>
                        <td>${type}</td>
                        <td>${status}</td>
                        <td>${line.ticket_price}</td>
                    </tr>`;
        } else {
            return "";
        }
    });

    table.innerHTML = htmls.join('');
    setOnClickTable();
    updateTotal();
}



async function createLine(newLine) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newLine)
    };

    return fetch(createLineApi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(line) {
            console.log(line);
            return line.data.id;
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



async function getAllStations(callback) {
    fetch(getAllStationsApi)
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

getAllStations(renderStations);

async function renderStations(stations) {
    var data = stations.data;
    let tableStations = $(".list-station"); 

    let htmls = data.map(function(station) {

        return `<li class="item item-station">
                    <span class="name name-station">${station.id} - ${station.name}</span>
                </li>`;
    });

    tableStations.innerHTML = htmls.join('');
    setOnClickListStation();
}

function setOnClickListStation() {
    let listRowsStation = $$(".item-station");

    for (let i=0; i<listRowsStation.length; i++) {
        setOnClickItemStation(listRowsStation[i]);
    }
}

function setOnClickItemStation(item) {
    var onClickRow = function(row) {
        return function() {

            if (row.classList.contains('item-station-selected')) {
                row.classList.remove('item-station-selected');
            } else {
                row.classList.add('item-station-selected');
            }
            
        };
    }; 
    item.addEventListener('click', onClickRow(item)); 
}

// SEARCH
var searchStation = $(".select-route__search");

searchStation.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".item-station");

    for (var i=0; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("span");

        var column_value = all_columns[0].textContent || all_columns[0].innerText;
        column_value = column_value.toUpperCase();
        if (column_value.indexOf(keyword) > -1){
            all_tr[i].style.display = ""; // show
        } else { 
            all_tr[i].style.display = "none"; // hide
        }
    }
});



// ADD STATION

var btnAddStation = $("#select-route_btn_add");

btnAddStation.onclick = function() {
    let selectedStation = $$(".item-station.item-station-selected");

    if (selectedStation.length > 0) {
        for (let i=0; i<selectedStation.length; i++) {

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

    for (let i=0; i<listRowsStation.length; i++) {
        setOnClickItemStation(listRowsStation[i]);
    }
}

// DELETE STATION

var btnDeleteStation = $("#select-route_btn_delete");

btnDeleteStation.onclick = function() {
    let selectedStation = $$(".item-added.item-station-selected");

    if (selectedStation.length > 0) {
        for (let i=0; i<selectedStation.length; i++) {

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

    for (let i=0; i<listAdded.length; i++) {
        let rowSpan = listAdded[i].getElementsByTagName("span");
        
        let arr1 = rowSpan[0].innerText.split("] ");
        let arr2 = arr1[1].split(" - ");
        
        let itemAdded = {
            id: arr2[0],
            name: arr2[1]
        }

        let stt = i + 1;

        rowSpan[0].innerText = "["+ String(stt) + "] " + String(itemAdded.id)  + " - " + String(itemAdded.name);
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

    add_form.style.display = "block";
    selectRouteForm.style.display = "none";
}


// CLEAR ADD FORM

function clearAddForm() {
    let listInputAdd = $$(".add-line-form__input");

    for (let i=0; i<listInputAdd.length; i++) {
        if (i != 4) {
            listInputAdd[i].value = "";
        }
    }

    let minSecOption = $$(".min-sec-option");

    minSecOption[0].value = "";
    minSecOption[1].value = "";

    sBtn_text.innerText = "Chọn loại tuyến";
}


function resetSelectRouteForm() {
    let listStation = $(".list-station");
    let listAdded = $(".list-added");

    listStation.innerHTML = "";
    listAdded.innerHTML = "";

    let search = $(".select-route__search");
    search.value = "";
}


// CANCEL ADD FORM
var btnCancel = $("#add_btn_cancel");

btnCancel.onclick = function() {
    add_form.style.display = "none";
    modal.style.display = "none";
    clearAddForm();
    resetSelectRouteForm();
    // resetSelectCompanyForm();
}

// OK ADD FORM

var btnOk = $("#add_btn_yes");

btnOk.onclick = function() {
    if (checkAddForm()) {
        let listInputAdd = $$(".add-line-form__input");
        let listMinSecOption = $$(".min-sec-option");
        const arr = listInputAdd[4].value.split(" - ");

        let type = (sBtn_text.innerText == "Tốc hành") ? 1 : 0; 

        let nameAdded = $$(".name-added");
        let arrCompanyId = [];

        for (let i=0; i<nameAdded.length; i++) {
            let arr1 = nameAdded[i].innerText.split("] ");
            let arr2 = arr1[1].split(" - ");
            
            arrCompanyId.push(Number(arr2[0]));
        }


        let newLine = {
            data: {
                name: listInputAdd[0].value,
                ticket_price: listInputAdd[1].value,
                wait_time: listMinSecOption[0].value + ":" + listMinSecOption[1].value,
                start_time: listInputAdd[2].value,
                end_time: listInputAdd[3].value,
                company_id: Number(arr[0]),
                status: 1,
                type: type,
                route: arrCompanyId
            }
        }

        createLine(newLine)
        .then(function(id) {
            getLine(id, renderLineEndList);

            add_form.style.display = "none";
            modal.style.display = "none";
            clearAddForm();
            resetSelectRouteForm();
            toast({
                title: "Thêm mới thành công!",
                message: "Bạn đã thêm mới tuyến tàu thành công!",
                type: "success",
                duration: 3000
              });
            // resetSelectCompanyForm();
        });
    }
}

async function getLine(id, callback) {

    fetch(getLineApi + id)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}

function renderLineEndList(line) {
    let data = line.data[0];

    let tableCompanies = $("table tbody"); 

    let status = "Còn hoạt động";
    if (data.status == 0) {
        status = "Không hoạt động";
    }

    let type = "Tốc hành";
    if (data.type == 0) {
        type = "Thường";
    }

    let htmls = `<tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${type}</td>
                    <td>${status}</td>
                    <td>${data.ticket_price}</td>
                </tr>`;

    tableCompanies.innerHTML += htmls;
    setOnClickTable();  
    updateTotal();
}

function setOnClickTable() {
    var dataTable = $("table");
    var rows = dataTable.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = dataTable.rows[i];
        onClickTable(currentRow);
    }
}

function onClickTable(currentRow)
{
    var onClickRow = function(row) {
        return function() {
            var cell = row.getElementsByTagName("td")[0];
            var id_line = cell.innerHTML;
            console.log(id_line);
            sessionStorage.setItem("id_line", id_line);
            window.location.href = 'detail_line.html';
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 
}


// CHECK ADD FORM
var listInputAdd = $$(".add-line-form__input");
var listWarningAdd = $$(".warning-add");
var listMinSecOption = $$(".min-sec-option");

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

    for (let i=0; i<=1; i++) {
        if (listInputAdd[i].value == "") {
            listInputAdd[i].addEventListener('focus',focusInputAddForm(i));
            listInputAdd[i].addEventListener('blur',blurInputAddForm(i));
            
            listInputAdd[i].style.borderColor = "red"
            listWarningAdd[i].style.display = "inline-block"                     
            
            isValid = false;
        }
    }

   
    if (listMinSecOption[0].value == "" || listMinSecOption[1].value == "") {
        listMinSecOption[0].addEventListener('focus',focusInputAddForm(2));
        listMinSecOption[1].addEventListener('focus',focusInputAddForm(2));

        listMinSecOption[0].addEventListener('blur',blurInputAddForm(2));
        listMinSecOption[1].addEventListener('blur',blurInputAddForm(2));
    
        listWarningAdd[2].style.display = "inline-block"                     
        
        isValid = false;
    }

    if (listMinSecOption[0].value == "0" && listMinSecOption[1].value == "0") {
        listMinSecOption[0].addEventListener('focus',focusInputAddForm(2));
        listMinSecOption[1].addEventListener('focus',focusInputAddForm(2));

        listMinSecOption[0].addEventListener('blur',blurInputAddForm(2));
        listMinSecOption[1].addEventListener('blur',blurInputAddForm(2));
    
        listWarningAdd[2].style.display = "inline-block"                     
        
        isValid = false;
    }
    

    for (let i=2; i<=5; i++) {
        if (listInputAdd[i].value == "") {
            listInputAdd[i].addEventListener('focus',focusInputAddForm(i+1));
            listInputAdd[i].addEventListener('blur',blurInputAddForm(i+1));
            
            listInputAdd[i].style.borderColor = "red"
            listWarningAdd[i+1].style.display = "inline-block"                     
            
            isValid = false;
        }
    }
   

    if (sBtn_text.innerText == "Chọn loại tuyến") {
        listWarningAdd[7].style.display = "inline-block";
        selectBtn.addEventListener("click", () => listWarningAdd[7].style.display = "none" );
        isValid = false;
    }

    return isValid;
}

// SEARCH 

var searchBar = $(".search");
var dataTable = $("table");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();
    var all_tr = dataTable.getElementsByTagName("tr");
    for (var i=1; i<all_tr.length; i++){
        var all_columns = all_tr[i].getElementsByTagName("td");
        for(j=0; j < all_columns.length; j++){
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
        
        if (column == 0 || column == 4) {
            first_row = Number(first_row);
            second_row = Number(second_row);
        }            

        return isDesc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}


// FILTER
var dataTable = $("table");
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
            let column_value = all_columns[2].textContent || all_columns[2].innerText;
            if (column_value == checkbox.value) {
                all_tr[i].style.display = string;
            }      
            let column_value2 = all_columns[3].textContent || all_columns[3].innerText;
            if (column_value2 == checkbox.value) {
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

