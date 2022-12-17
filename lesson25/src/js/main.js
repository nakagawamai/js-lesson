import { toggleModal } from "./modal";
import * as validation from "./validation";

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
    window.location.href = "register-done.html";
});

const options = {
    root: document.querySelector('[data-id="modal-inner"]'),
    threshold: 1
};

const removeDisabledForAgreeButton = ([entry]) => {
    if(entry.isIntersecting){
        const agreeButton  = document.querySelector('[data-id="agree_button"]');
        agreeButton.removeAttribute('disabled');
    }
};

const observer = new IntersectionObserver(removeDisabledForAgreeButton, options);
observer.observe(document.querySelector('[data-id="last_text"]'));

const invalidSelector = document.getElementsByClassName("field-invalid");
const changeDisabledStatusSubmitButton = () => submitButton.disabled = invalidSelector.length > 0;;

const inputSelector = document.querySelectorAll('input');
inputSelector[0].focus();

for (const input of inputSelector){
    input.classList.add("field-invalid");

    input.addEventListener("blur", () => {
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }else{
            validation.removeErrorMessage(input);

            input.type === "email" && validation.checkEmail(input);
            input.name === "user_name" && validation.checkLength("ユーザー名",15,input);
            input.type === "password" && validation.checkPassword(input);
        }
        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        input.name === "user_name" && validation.checkLength("ユーザー名",15,input);

        if(input.nextElementSibling && input.nextElementSibling.classList.contains("field-invalid")){
            input.type === "email" && validation.checkEmail(input);
            input.type === "password" && validation.checkPassword(input);
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
