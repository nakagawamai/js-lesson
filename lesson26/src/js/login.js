import * as validation from "./validation";
import { togglePassword } from "./module/toggle-password";
import { Chance } from "chance";
const chance = new Chance();

const submitButton  = document.querySelector('[data-id="submit_button"]');

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    changeLocation();
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

const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('current-password');
const togglePasswordButton = document.getElementById('js-toggle-password');

togglePasswordButton.addEventListener('click', () => togglePassword(passwordInput,togglePasswordButton));

const  isRegisteredUser = () => {
    const userData = {
        name:"Nakagawa",
        email: "nakagawa@sample.com",
        password: "N302aoe3"
    }

    return (userNameInput.value === userData.name || userData.email) && passwordInput.value === userData.password;
}

const login = () => {
    return new Promise((resolve,reject) => {
        if(	isRegisteredUser()){
            resolve({ token: chance.apple_token(), ok: true , code: 200 })
        }else{
            reject({ ok: false, code: 401 })
        }
    }) 
}

const changeLocation = async () => {
    try{
        const response = await login();
        localStorage.setItem("token",JSON.stringify(response.token));
        window.location.href = "./index.html";
    }catch{
        window.alert("ログイン権限がありません。");
    }
}
