
var modal = $(".modal");


function start() {
    getAllTickets();
}

start();

// GET ALL TICKETS
function getAllTickets() {
    fetch("https://aiclub.uit.edu.vn/namnh/emetro/tickets/getall")
        .then(function(response) {
            return response.json();
        })
        .then(function(tickets) {
            getNameLine(tickets);
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

// RENDER ALL USER
function renderTicketEndList(ticket, line_name) {
    let tableTickets = $("table tbody"); 

    let type = "Tốc hành";
    if (ticket.type == 0) {
        type = "Thường";
    }

    let is_effective = "Còn hạn sử dụng";
    if (ticket.is_effective == false) {
        is_effective = "Hết hạn sử dụng";
    }


    let htmls = `<tr>
                    <td>${ticket.id}</td>
                    <td>${ticket.line_id} - ${line_name}</td>
                    <td>${type}</td>
                    <td>${ticket.price}</td>
                    <td>${ticket.purchase_date}</td>
                    <td class="hide">${is_effective}</td>
                    <td class="hide">${ticket.no_used}</td>
                </tr>`;

    tableTickets.innerHTML += htmls;

    updateTotal();  

    setOnClickTable();
}

// GET NAME LINE
function getNameLine(tickets) {
    var data = tickets.data;

    for(let i=0; i<data.length; i++) {
        fetch('https://aiclub.uit.edu.vn/namnh/emetro/lines/search/?id=' + data[i].line_id)
            .then(function (response) {
                return response.json();
            })
            .then(function(line) {
                renderTicketEndList(data[i], line.data[0].name);
            })
            .catch(function (err) {
                toast({
                    title: "Thất bại!",
                    message: "Có lỗi xảy ra!",
                    type: "error",
                    duration: 3000
                  });
            });
    }
}

// 

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
            openDetailTicket(row);
        };
    }; 
    currentRow.addEventListener('click', onClickRow(currentRow)); 
}

function openDetailTicket(row) {
    let detailForm = $(".detail-ticket-form");
    modal.style.display = "block";
    detailForm.style.display = "block";

    setDataDetailTicket(row);
} 

function setDataDetailTicket(row) {
    let listInput = $$(".detail-ticket-input");

    var cells = row.getElementsByTagName("td");

    listInput[0].value = cells[0].innerText;
    listInput[1].value = cells[1].innerText;
    listInput[2].value = cells[2].innerText;
    listInput[3].value = cells[3].innerText;
    listInput[4].value = cells[4].innerText;
    listInput[5].value = cells[5].innerText;
    listInput[6].value = cells[6].innerText;
} 

// CLOSE DETAIL TICKET

var btnCLose = $("#close-detail-form");

btnCLose.onclick = function() {
    let detailForm = $(".detail-ticket-form");
    modal.style.display = "none";
    detailForm.style.display = "none";
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

