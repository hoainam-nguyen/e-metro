// Edit profile function
function EnableEditProfile()
{
    document.querySelector('.username-tb').disabled = false;
    document.querySelector('.phonenum-tb').disabled = false;
    document.querySelector('.email-tb').disabled = false;
    document.querySelector('.address-tb').disabled = false;
}
function DisableEditProfile()
{
    document.querySelector('.username-tb').disabled = true;
    document.querySelector('.phonenum-tb').disabled = true;
    document.querySelector('.email-tb').disabled = true;
    document.querySelector('.address-tb').disabled = true;
    toast({
        title: 'Success',
        message: 'Cập nhật thông tin thành công!',
        type: 'success',
        duration: 4000
    });
}


//toast

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