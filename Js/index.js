const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const passInput1 = document.getElementById("pass1");
const passInput2 = document.getElementById("pass2");
const email = document.getElementById("email");



function handleSubmit(e){
    e.preventDefault();
    
    if (validName() && validEmail() && validpass() && validpassconfirm() ) {
        location.href = "homePage.html";
    }

};

function setValidate(element , m){
    const parent = element.parentElement;
    const displayError = parent.querySelector(".error");
    displayError.innerText= m;
    element.style.borderColor='red';
}

function setSuccess (element){
    const parent = element.parentElement;
    const displayError = parent.querySelector(".error");
    displayError.innerHTML= '';
    element.style.borderColor='green';
}
let NameStore = '';
function validName(){
    const nameValue = nameInput.value.trim();
    if(nameValue === ''){
        setValidate( nameInput , 'Username is required')
        return false;
    }else if(nameValue.length > 12 ){
        setValidate(nameInput , 'Name must be at most 12 character');
        return false;
    }else{
        setSuccess(nameInput);
        NameStore = localStorage.setItem('Username',nameInput.value);
        return true;
    }
}


function isValidEmail(email){
    const regex= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(String(email).toLowerCase());

}
function validEmail(){
    const emailValue = email.value.trim();
    if(emailValue === ''){
        setValidate( email , 'Email is required');
        return false;
    }else if(!isValidEmail(emailValue)){
        setValidate( email , 'Enter a valid email address');
        return false;
    }else if(isValidEmail(emailValue)){
        setSuccess(email);
        return true;
    }
}


function isValidpass(pass){
    const regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);

}
function validpass(){
    const passInputVal1 = passInput1.value.trim();
    
    if(passInputVal1 === ''){
        setValidate( passInput1 , 'Password is required');
        return false;
    }else if(!isValidpass(passInputVal1)){
        setValidate( passInput1 , 'Password must contain at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
        return false;
    }else if(isValidpass(passInputVal1)){
        setSuccess(passInput1);
    }
    validpassconfirm();

    return true;
}
function validpassconfirm(){
    const passInputVal1 = passInput1.value.trim();
    const passInputVal2 = passInput2.value.trim();
    if(passInputVal2 === ''){
        setValidate( passInput2 , 'Please confirm your password');
        return false;
    }else if(passInputVal2 !== passInputVal1){
        setValidate( passInput2 , "Password does'nt match")
        return false;
    }else{
        setSuccess(passInput2);
        return true;
    }
}

function displayName(){
    const nameWelcome = document.getElementById("welcome-name");
    nameWelcome.innerHTML=("Welcome, " + localStorage.getItem('Username'));
}


 
document.addEventListener('DOMContentLoaded', function () {
     
    const currentPage = window.location.pathname;
    const JoinBtns= document.querySelectorAll(".Join-btn");
    const checkout = document.querySelector(".checkout");
    const paymentPart = document.querySelector(".pay-part");
    const payBtn = document.querySelector(".pay-btn");


    if (currentPage.includes('homepage.html')) {
        displayName();
    
    JoinBtns.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href="courseDetails.html";
    });
    });
  

}
if (currentPage.includes('courseDetails.html')) {
    console.log('Course Details Page Loaded');  // Debugging message

    checkout.addEventListener('click', () => {
        paymentPart.classList.remove('pay-part-close');
        paymentPart.scrollIntoView({ behavior: 'smooth' });
    });

    payBtn.addEventListener('click', () => {
    //     Swal.fire({
    //     title: 'Payment Successful!',
    //     text: 'Your payment has been processed successfully.',
    //     icon: 'success',
    //     confirmButtonText: 'OK'
    // });

    alert("Your payment has been processed successfully.")
    });
}
});

