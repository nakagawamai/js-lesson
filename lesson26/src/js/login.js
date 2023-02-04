import * as validation from "./validation";
import { togglePassword } from "./module/toggle-password";
import { Chance } from "chance";
const chance = new Chance();

const submitButton  = document.querySelector('[data-id="submit_button"]');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('current-password');
const togglePasswordButton = document.getElementById('js-toggle-password');

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    init();
});

const isRegisteredUser = (inputValues) => {
    const userData = {
        name:"Nakagawa",
        email: "nakagawa@sample.com",
        password: "N302aoe3"
    }

    return ( inputValues.userName === userData.name || inputValues.userName === userData.email ) && inputValues.password === userData.password;
}

const checkRegisteredUser = () => {
    const inputValues = {
        userName : userNameInput.value,
        password : passwordInput.value
    }

    return new Promise((resolve,reject) => {
        if( isRegisteredUser(inputValues) ){
            resolve({ token: chance.guid(), ok: true , code: 200 })
        }else{
            reject({ ok: false, code: 401 })
        }
    }) 
}

const awaitCheckRegisteredUser = async () => {
    try{
        const response = await checkRegisteredUser();
        if(!response) return;
        return response.token;
    }catch{
        window.location.href = "./401.html";
    }
}

const init = async () => {
    const token = await awaitCheckRegisteredUser();
    if(!token) return;
    localStorage.setItem("token",JSON.stringify(token));
    window.location.href = "./index.html"
}

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

togglePasswordButton.addEventListener('click', () => togglePassword(passwordInput,togglePasswordButton));
