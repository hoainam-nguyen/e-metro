var ischecked = false;
//dropdown_number
const optionmenu = document.querySelector(".dropdown_number"),
selectbtn = optionmenu.querySelector(".select-btn"),
options = optionmenu.querySelectorAll(".option"),
sbtn_text = optionmenu.querySelector(".sBtn-text");


selectbtn.addEventListener("click", ()=> optionmenu.classList.toggle("active"));
options.forEach(option =>{  
    option.addEventListener("click", ()=>{
        let selectedoption = option.querySelector(".option-text").innerText;
        sbtn_text.innerText = selectedoption;
        
        optionmenu.classList.remove("active");
    });
});
//dropdown_line
// var optionmenu1 = document.querySelector(".dropdown_line"),
// selectbtn1 = optionmenu1.querySelector(".select-btn"),
// options1 = optionmenu1.querySelectorAll(".option"),
// sbtn_text1 = optionmenu1.querySelector(".sBtn-text");

//Check
var type;
var normalTicket = document.querySelector('input[name="tickettype"][value="normal_ticket"]');
normalTicket.addEventListener("click", ()=>{
   type = normalTicket.value;
   ischecked = true;
})
var monthTicket = document.querySelector('input[name="tickettype"][value="month_ticket"]');
monthTicket.addEventListener("click", ()=>{
   type = monthTicket.value;
   ischecked = true;
})
async function Getpricebyid(callback) {
    fetch(getprice)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}

var getprice = `https://aiclub.uit.edu.vn/namnh/emetro/lines/search?id=`;

async function renderprice(lines) {
    var data = lines.data;

    let divprice = $(".price"); 

    let htmls = data.map(function(line) {

        return `<input type="text" name="price-item" style="background-color: #ffffff;" class="text_field_price" id="tf_price" value="${line.ticket_price}" disabled>
        <label for="tf_price" class="tf_label_price"> Giá vé: </label>`;
    });

    divprice.innerHTML = htmls.join('');
}


var checkline = document.querySelector('.form__input');

let hengio = setInterval(function() {
    if (sbtn_text.innerText !== "Số lượng" && ischecked && checkline.value !== "")
    {
        var str = checkline.value;
        var index = str.indexOf("-");
        var result = str.substring(0, index);

        getprice = `https://aiclub.uit.edu.vn/namnh/emetro/lines/search?id=${result}`

        var today = new Date();
        var date = today.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
        document.getElementById("tf_date_select").value = date;
        document.getElementById("tf_status").value = "Còn hạn";

        var ticketnum = sbtn_text.innerText;

        
        var tfprice = document.getElementById('tf_price').value;

        document.getElementById('total_price').value = Number(ticketnum) * Number(tfprice);
        
        Getpricebyid(renderprice);
    }
}, 500);

// Xác nhận tạo vé

//Toast function

// function toast(
//     {
//         title= '',
//         message= '',
//         type= 'info',
//         duration = 3000
//     }){
//         const main =  document.getElementById('success_toast');
//         if (main)
//         {
//             const toast = document.createElement('div');

//             const autoremove = setTimeout(function(){
//                 main.removeChild(toast);
//             }, duration + 1000);

//             toast.onclick= function(e){
//                 if (e.target.closest('.toast_close'))
//                 {
//                     main.removeChild(toast);
//                     clearTimeout(autoremove);
//                 }
//             }
//             toast.classList.add('toast');
//             const delay = (duration/1000).toFixed(2);
//             toast.style.animation = `slideinleft ease .3s, fadeout 1s ${delay}s forwards`;

//             toast.innerHTML = `
//             <div class="toast_icon">
//                         <i class="fas fa-check-circle"></i>
//                     </div>
//                     <div class="toast_body">
//                         <h3 class="toast_title">${title}</h3>
//                         <p class="toast_msg">${message}</p>
//                     </div>
//                     <div class="toast_close">
//                         <i class="fas fa-times"></i>
//                     </div>
//             `;
//             main.appendChild(toast);
//         }
//     }

//     function toastfail(
//         {
//             title= '',
//             message= '',
//             type= 'info',
//             duration = 3000
//         }){
//             const main =  document.getElementById('success_toast');
//             if (main)
//             {
//                 const toast = document.createElement('div');
    
//                 const autoremove = setTimeout(function(){
//                     main.removeChild(toast);
//                 }, duration + 1000);
    
//                 toast.onclick= function(e){
//                     if (e.target.closest('.toast_close'))
//                     {
//                         main.removeChild(toast);
//                         clearTimeout(autoremove);
//                     }
//                 }
//                 toast.classList.add('toast_fail');
//                 const delay = (duration/1000).toFixed(2);
//                 toast.style.animation = `slideinleft ease .3s, fadeout 1s ${delay}s forwards`;
    
//                 toast.innerHTML = `
//                 <div class="toast_icon">
//                             <i class="fas fa-exclamation-circle" style="color:#dc143c;"></i>
//                         </div>
//                         <div class="toast_body">
//                             <h3 class="toast_title">${title}</h3>
//                             <p class="toast_msg">${message}</p>
//                         </div>
//                         <div class="toast_close">
//                             <i class="fas fa-times"></i>
//                         </div>
//                 `;
//                 main.appendChild(toast);
//             }
//         }

//Createticket
var ticketsapi = "https://aiclub.uit.edu.vn/namnh/emetro/tickets/insert"
// async function Createticket(data, callback)
// {
//     var opt = {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify(data)
//     };
//     fetch(ticketsapi, opt).then(function(response){
//         response.json();
//     }).then(callback);
// }
async function Createticket(newticket) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",      
        body: JSON.stringify(newticket)
    };

    return fetch(ticketsapi, options) 
        .then(function(response) {
            return response.json(); 
        })
        .then(function(ticket) {
            console.log(ticket);
            return ticket.data.id;
        })
        .catch(function(err) {
            console.log(err);
        }); 
}
    //Xác nhận bán vé
function showToast()
{
    if (sbtn_text.innerText !== "Số lượng" && ischecked && checkline.value !== "")
    {
        var typeint;
        if (type == "normal_ticket")
        {
            typeint = 0;
        }
        else{
            typeint = 1;
        }
        var number = sbtn_text.innerHTML;

        for (var i=0; i < number; i++)
        {
        }
        var str = checkline.value;
        var index = str.indexOf("-");
        var result = str.substring(0, index);

        var lineid = result;

        var purchasedate = document.getElementById("tf_date_select").value;

        var status = true;

        var ticketprice = document.getElementById('tf_price').value;
        
        let ticketdata = {
            data: {
            type: typeint,
            price: ticketprice,
            line_id: lineid,
            is_effective: status,
            no_used:0,
            purchase_date : purchasedate
            }
        };


        for (var i=0; i < number;i++)
        {
            Createticket(ticketdata);
        }

        toast({
            title: "Xuất vé hành công!",
            message: "Bạn đã xuất vé thành công!",
            type: "success",
            duration: 3000
          });

    }
    else
    {
        toast({
            title: "Thất bại!",
            message: "Vui lòng chọn đầy đủ thông tin!",
            type: "error",
            duration: 3000
          });
    }
}


// SELECT DIALOG
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var modal = $(".modal");
var selectLineForm = $(".select-company-form");

var selectLineInput = $(".form__input");

selectLineInput.onclick = function() {
    modal.style.display = "block";
    selectLineForm.style.display = "block"
}

var getlines = "https://aiclub.uit.edu.vn/namnh/emetro/lines/getall";

async function getAlllines(callback) {
    fetch(getlines)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err) {
            console.log(err);
        });
}
async function renderLines(lines) {
    var data = lines.data;

    let tableCompanies = $(".list-company"); 

    let htmls = data.map(function(line) {

        return `<li class="item-company">
                    <span class="name-company">${line.id} - ${line.name}</span>
                </li>`;
    });

    tableCompanies.innerHTML = htmls.join('');
    setOnClickListCompany();
}

getAlllines(renderLines);

function setOnClickListCompany() {
    let listRowsCompany = $$(".item-company");

    for (let i=0; i<listRowsCompany.length; i++) {
        setOnClickItemCompany(listRowsCompany[i]);
    }
}

function setOnClickItemCompany(item) {
    var onClickRow = function(row) {
        return function() {
            var rowSpan = row.getElementsByTagName("span");
            
            const arr = rowSpan[0].innerText.split(" - ");
            
            companySelected = {
                id: Number(arr[0]),
                name: arr[1]
            }

            let input = $(".form__input");

            input.value = rowSpan[0].innerText;
            selectLineForm.style.display = "none";
            modal.style.display = "none";
        };
    }; 
    item.addEventListener('click', onClickRow(item)); 
}

var searchBar = $(".select-company__search");

searchBar.addEventListener('keyup', function() {
    var keyword = this.value;
    keyword = keyword.toUpperCase();

    let all_tr = $$(".item-company");

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