const showErrorMessage = (target,message) => {
    target.classList.add("border-2","border-red-500");

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("field-invalid","text-sm","my-2","text-rose-600");
	errorMessage.textContent = message;

	const error = target.nextElementSibling;
	if(!error){
		target.insertAdjacentElement("afterend",errorMessage);
	}else{
		if(!(error.classList.contains("field-invalid"))){
			target.insertAdjacentElement("afterend",errorMessage);
		}
	}
}

const removeErrorMessage = (target) => {
    target.classList.remove("border-red-500");

    const error = target.nextElementSibling;
    if(error && error.classList.contains("field-invalid")){
        error.remove();
    }
}

const validations = {
    user_name: {
        maxLength: 16,
        valid(value){
            return value.length < this.maxLength;
        },
        message: "ユーザー名は15文字以下にしてください"
    },
    email: {
        valid(value){
            //ref https://github.com/Octagon-simon/octaValidate/blob/4c09725647a560bb47eb277a9c32df27831f5202/src/validate.js#L226
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value);
        },
        message: "メールアドレスの形式になっていません"
    },
    password: {
        valid(value) {
            return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})+$/.test(value);
        },
        message: "8文字以上の大小の英数字を交ぜたものにしてください"
    }
}

export const validateForm = (input) => {
    removeErrorMessage(input);

    if(input.type === "checkbox"){
        input.checked ? input.classList.remove("field-invalid") : input.classList.add("field-invalid");
        return;
    }

    if(input.value.trim() === ""){
        showErrorMessage(input, "入力してください");
        return;
    }

    if(!validations[input.id].valid(input.value)){
        showErrorMessage(input, validations[input.id].message);
        return;
    }
}
