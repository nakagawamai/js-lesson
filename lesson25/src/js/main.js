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
for (const input of inputSelector){
    input.classList.add("field-invalid");

    input.addEventListener("blur", () => {
        validation.checkRequired(input);

        input.name === "user_name" && validation.checkLength("ユーザー名",15,input);
        input.type === "email" && validation.checkEmail(input);

        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        input.classList.remove("field-invalid");
        validation.removeErrorMessage(input);

        input.type === "password" && validation.checkPassword(input)

        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("change",() => {
        if(input.type === "checkbox"){
            !input.checked && input.classList.add("field-invalid");
        }

        changeDisabledStatusSubmitButton();
    });
}

toggleModal();
