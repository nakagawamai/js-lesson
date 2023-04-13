import * as validation from "./validation";

const submitButton  = document.querySelector('[data-id="submit_button"]');
const email = document.querySelector('[data-id="email"]');

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkRegisteredEmail(email);
});

const changeDisabledStatusSubmitButton = () => submitButton.disabled = validation.isInvalid();

const validateEmail = (input) => {
    input.classList.add("field-invalid");

    input.addEventListener("blur", () => {
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }else{
            validation.removeErrorMessage(input);
            validation.checkEmail(input);
        }

        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        if(input.nextElementSibling && input.nextElementSibling.classList.contains("field-invalid")){
            validation.checkEmail(input);
        }
    
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.removeErrorMessage(input);
            validation.showErrorMessage(input,"入力してください");
        }

        changeDisabledStatusSubmitButton();
    });
}

validateEmail(email);

const checkRegisteredEmail = (email) => {
    if( !isRegisteredEmail(email.value) ){
        validation.showErrorMessage(email,"一致するアカウントが見つかりませんでした");
    }else{
        window.location.href = "./register-password.html";
    }
}

const isRegisteredEmail = (emailValue) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const registeredEmail = userData?.email;

    return registeredEmail === emailValue;
}
