import * as validation from "./validation";

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

            input.type === "password" && validation.checkPassword(input);
        }
        changeDisabledStatusSubmitButton();
    });

    input.addEventListener("input" , () => {
        if(input.nextElementSibling && input.nextElementSibling.classList.contains("field-invalid")){
            input.type === "password" && validation.checkPassword(input);
        }
    
        if(input.hasAttribute("required") && input.value.trim() === ""){
            validation.showErrorMessage(input,"入力してください");
        }

        changeDisabledStatusSubmitButton();
    });
}
