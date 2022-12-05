export const showErrorMessage = (target,message) => {
    target.classList.add("border-2","border-red-500");

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("field-invalid","text-sm","my-2","text-rose-600");
	errorMessage.textContent = message;

	if(!target.nextElementSibling){
		target.insertAdjacentElement("afterend",errorMessage);
	}
}

export const removeErrorMessage = (target) => {
    target.classList.remove("border-red-500");

    const error = target.nextElementSibling;
    if(error && error.classList.contains("field-invalid")){
        error.remove();
    }
}

export const checkRequired = (input) => {
   if(input.value.trim() === ""){
        showErrorMessage(input,"入力してください");
   }
}

export const checkLength = (labelName,maxLength,input) => {
    if(input.value.length > maxLength){
        showErrorMessage(input,`${labelName}}は、${maxLength}文字以内にしてください`)
    }
}

export const checkEmail = (input) => {
    //ref https://github.com/Octagon-simon/octaValidate/blob/4c09725647a560bb47eb277a9c32df27831f5202/src/validate.js#L226
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(input.value))){
        showErrorMessage(input,"メールアドレスの形式にしてください");
    }
}

export const checkPassword = (input) => {
    if(!(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})+$/.test(input.value))){
        showErrorMessage(input,"8文字以上の大小の英数字を交ぜたものにしてください");
    }
}
