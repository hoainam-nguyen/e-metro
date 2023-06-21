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
var optionmenu1 = document.querySelector(".dropdown_line"),
selectbtn1 = optionmenu1.querySelector(".select-btn"),
options1 = optionmenu1.querySelectorAll(".option"),
sbtn_text1 = optionmenu1.querySelector(".sBtn-text");

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
setInterval(function() {
    if (sbtn_text.innerText !== "Số lượng" && ischecked && sbtn_text1.innerText !== "Chọn tuyến")
    {
        var today = new Date();
        var date = today.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
        document.getElementById("tf_date_select").value = date;
        document.getElementById("tf_status").value = "Còn hạn";
        document.getElementById("tf_price").value = 150000 * sbtn_text.innerText + " VND";
    }
}, 100);

// Xác nhận tạo vé

//Toast function

function toast(
    {
        title= '',
        message= '',
        type= 'info',
        duration = 3000
    }){
        const main =  document.getElementById('success_toast');
        if (main)
        {
            const toast = document.createElement('div');

            const autoremove = setTimeout(function(){
                main.removeChild(toast);
            }, duration + 1000);

            toast.onclick= function(e){
                if (e.target.closest('.toast_close'))
                {
                    main.removeChild(toast);
                    clearTimeout(autoremove);
                }
            }
            toast.classList.add('toast');
            const delay = (duration/1000).toFixed(2);
            toast.style.animation = `slideinleft ease .3s, fadeout 1s ${delay}s forwards`;

            toast.innerHTML = `
            <div class="toast_icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="toast_body">
                        <h3 class="toast_title">${title}</h3>
                        <p class="toast_msg">${message}</p>
                    </div>
                    <div class="toast_close">
                        <i class="fas fa-times"></i>
                    </div>
            `;
            main.appendChild(toast);
        }
    }
function showToast()
{
    toast({
        title: 'Success',
        message: 'Tạo vé tự động thành công',
        type: 'success',
        duration: 4000
    });
}
//api

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
    let dropdownlines = document.querySelector('.dropdown_line ul');

    let htmls = data.map(function(line) {
        return `<li class="option">
                <span class="option-text">${line.name}</span>
                </li>`;
    });
    dropdownlines.innerHTML = htmls.join('');
}

getAlllines(renderLines);

async function getlineoncbb(){

    selectbtn1.addEventListener("click", ()=> optionmenu1.classList.toggle("active"));
    options1.forEach(option =>{  
        option.addEventListener("click", ()=>{
            let selectedoption = option.querySelector(".option-text").innerText;
            sbtn_text1.innerText = selectedoption;
            
            optionmenu1.classList.remove("active");
        });
    });
}
getlineoncbb();