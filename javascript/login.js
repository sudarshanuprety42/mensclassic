var USERNAME = "admin";
var PASSWORD = "12345678";

function setFormMessage(formElement,type, message)
{
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success","form-message-error");
    messageElement.classList.add('form-message-$(type)');
}

function setInputError(inputElement, message)
{
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
}

function clearInputError(inputElement)
{
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#creatAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault(); 
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogIn").addEventListener("click", e => {
        e.preventDefault(); 
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        
        uname = document.querySelector("#loginUserName");
        pwd = document.querySelector("#loginPwd");
        
        if(uname.value.trim() === USERNAME && pwd.value.trim() === PASSWORD )
        {
            swal({
                title: "Success",
                text: "Welcome "+uname.value,
                icon: "success",
                button: false
              });
            //setFormMessage(loginForm, "success", "Login successful");
            setTimeout(function() {
                window.location.href = 'index.html';    
            },1500);
            
        }
        else{
            swal({
                title: "Error",
                text: "Username or Password Invalid",
                icon: "error",
                button: false
              });
            //setFormMessage(loginForm, "error", "username or Password invalid.");
        }

       loginForm.addEventListener("input", e => {
        setFormMessage(loginForm,"error","");
       }) 
    });

    createAccountForm.addEventListener("submit", e=> {
        e.preventDefault();

        uname = document.querySelector("#signupUsername");
        pwd = document.querySelector("#signupPwd");

        USERNAME = uname.value;
        PASSWORD = pwd.value;

        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");

        swal({
            title: "Success",
            text: "Account Created",
            icon: "success",
            button: false
          });
        //setFormMessage(loginForm, "success","Account Created");
    });

    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 8){
                setInputError(inputElement, "Username must be at least 8 characters long");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupEmail" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))){
                setInputError(inputElement, "Enter valid email address");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupPwd" && e.target.value.length > 0 && e.target.value.length < 8){
                setInputError(inputElement, "Password must be atleast 8 Characters Long");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("blur", e => {
            if(e.target.id === "signupCPwd" && e.target.value != document.querySelector("#signupPwd").value){
                setInputError(inputElement, "Passwords must be same.");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });


    });
});