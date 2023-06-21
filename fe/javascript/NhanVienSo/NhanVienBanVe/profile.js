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
}

