import { toggleModal } from "./modal";
import * as validation from "./validation";
import { togglePassword } from "./module/toggle-password";

const agreeCheckBox = document.querySelector('[data-id="agree_check"]');
const agreeButton   = document.querySelector('[data-id="agree_button"]');
const submitButton  = document.querySelector('[data-id="submit_button"]');

agreeButton.addEventListener('click' , () => {
    agreeCheckBox.removeAttribute('disabled');
    agreeCheckBox.classList.remove("field-invalid");
    agreeCheckBox.checked = true;
    changeDisabledStatusSubmitButton();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveUserData();
});

const options = {
    root: document.querySelector('[data-id="modal-inner"]'),
    threshold: 1
};

const removeDisabledForAgreeButton = ([entry]) => {
    if(entry.isIntersecting){
        agreeButton.removeAttribute('disabled');
        agreeButton.focus();
    }
};

const observer = new IntersectionObserver(removeDisabledForAgreeButton, options);
observer.observe(document.querySelector('[data-id="last_text"]'));

const changeDisabledStatusSubmitButton = () => submitButton.disabled = validation.isInvalid();

const inputSelector = document.querySelectorAll('input');
inputSelector[0].focus();

for (const input of inputSelector){
    input.classList.add("field-invalid");

    input.addEventListener("blur", (event) => {
        if(isRelatedTarget(event,"js-toggle-password")) return;

        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }else{
            validation.removeErrorMessage(input);

            input.type === "email" && validation.checkEmail(input);
            input.name === "user_name" && validation.checkLength("ユーザー名",15,input);
            input.name === "new-password" && validation.checkPassword(input);
        }
        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        input.name === "user_name" && validation.checkLength("ユーザー名",15,input);

        if(input.nextElementSibling && input.nextElementSibling.classList.contains("field-invalid")){
            input.type === "email" && validation.checkEmail(input);
            input.name === "new-password" && validation.checkPassword(input);
        }
    
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }

        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("change",() => {
        if(input.type === "checkbox"){
            input.checked ? input.classList.remove("field-invalid") : input.classList.add("field-invalid");
        }

        changeDisabledStatusSubmitButton();
    });
}

toggleModal();

const passwordInput = document.getElementById('new-password');
const togglePasswordButton = document.getElementById('js-toggle-password');

togglePasswordButton.addEventListener('click', () => togglePassword(passwordInput,togglePasswordButton));

togglePasswordButton.addEventListener('blur', (event) => {
    if(isRelatedTarget(event,"new-password")) return;

    validation.removeErrorMessage(passwordInput);
    validation.checkPassword(passwordInput);
    changeDisabledStatusSubmitButton();
});

const isRelatedTarget = (event,target) => {
    const related = event.relatedTarget ? event.relatedTarget.id : "unknown";
    return related === target;
}

const saveUserData = () => {
    const userName = document.querySelector('[data-id="userName"]');
    const email = document.querySelector('[data-id="email"]');
    const password = document.querySelector('[data-id="password"]');

    const userData = {
        name: userName.value,
        email: email.value,
        password : password.value,
    }

    if( isRegisteredEmail(email.value) ){
        validation.showErrorMessage(email,"登録済みのメールアドレスです");
    }else{
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.href = "register-done.html";
    }
}

const isRegisteredEmail = (emailValue) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const registeredEmail = userData?.email;

    return registeredEmail === emailValue;
}
