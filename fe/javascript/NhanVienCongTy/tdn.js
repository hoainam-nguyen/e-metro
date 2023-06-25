
const profile_pic = document.querySelector('.profile-pic')
const file_upload = document.querySelector('.file-upload')
const upload_button = document.querySelector('.upload-button')
const profile2_pic = document.querySelector('.profile2-pic')
const file2_upload = document.querySelector('.file2-upload')
const upload2_button = document.querySelector('.upload2-button')
const profile3_pic = document.querySelector('.profile3-pic')

file_upload.addEventListener('change',function() {
    if (this.files && this.files[0]) {
        profile_pic.onload = () => {
            URL.revokeObjectURL(profile_pic.src);  // no longer needed, free memory
        }
  
        profile_pic.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
    if (this.files && this.files[0]) {
        profile2_pic.onload = () => {
            URL.revokeObjectURL(profile2_pic.src);  // no longer needed, free memory
        }
  
        profile2_pic.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
    if (this.files && this.files[0]) {
        profile3_pic.onload = () => {
            URL.revokeObjectURL(profile3_pic.src);  // no longer needed, free memory
        }
  
        profile3_pic.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
});

upload_button.addEventListener('click', function() {
   file_upload.click();
});


const ClickElement = document.querySelector('.js-click')
const Openhistory = document.querySelector('.js-open')
const Closehistory = document.querySelector('.history__searching__element')

function OpenHistory(){
    Openhistory.classList.add('open');
}

function CloseHistory(){
    Openhistory.classList.remove('open')
}

ClickElement.addEventListener('click', OpenHistory)
Closehistory.addEventListener('click', CloseHistory)