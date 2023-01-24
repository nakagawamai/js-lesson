import * as validation from "./validation";
import { togglePassword } from "./module/toggle-password";

const submitButton  = document.querySelector('[data-id="submit_button"]');

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
});

const changeDisabledStatusSubmitButton = () => submitButton.disabled = validation.isInvalid();

const inputSelector = document.querySelectorAll('input');

for (const input of inputSelector){
    input.classList.add("field-invalid");

    input.addEventListener("blur", () => {
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }else{
            validation.removeErrorMessage(input);

            input.name === "current-password" && validation.checkPassword(input);
        }
        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        if(input.nextElementSibling && input.nextElementSibling.classList.contains("field-invalid")){
            input.name === "current-password" && validation.checkPassword(input);
        }
    
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }

        changeDisabledStatusSubmitButton();
    });
}

const passwordInput = document.getElementById('current-password');
const togglePasswordButton = document.getElementById('js-toggle-password');

togglePasswordButton.addEventListener('click', () => togglePassword(passwordInput,togglePasswordButton));
