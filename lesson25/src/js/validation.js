export const showErrorMessage = (target,message) => {
    target.classList.add("border-2","border-red-500","bg-red-100");

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("field-invalid","text-sm","my-2","text-rose-600");
	errorMessage.textContent = message;

	if(!target.nextElementSibling){
		target.insertAdjacentElement("afterend",errorMessage);
	}
}

export const removeErrorMessage = (target) => {
    target.classList.remove("field-invalid","border-red-500","bg-red-100");

    const error = target.nextElementSibling;
    if(error && error.classList.contains("field-invalid")){
        error.remove();
    }
}

export const checkLength = (labelName,maxLength,input) => {
    if(input.value.length > maxLength){
        showErrorMessage(input,`${labelName}は、${maxLength}文字以内にしてください`)
    }else{
        removeErrorMessage(input);
    }
}

export const checkEmail = (input) => {
    //ref https://github.com/Octagon-simon/octaValidate/blob/4c09725647a560bb47eb277a9c32df27831f5202/src/validate.js#L226
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(input.value))){
        showErrorMessage(input,"メールアドレスの形式にしてください");  
    }else{
        removeErrorMessage(input);  
    }
}

export const checkPassword = (input) => {
    if(input.value.length > 0 && !(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})+$/.test(input.value))){
        showErrorMessage(input,"8文字以上の大小の英数字を交ぜたものにしてください");
    }else{
        removeErrorMessage(input);
    }
}
