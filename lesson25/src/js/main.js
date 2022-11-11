import { toggleModal } from "./modal";

const agreeCheckBox = document.querySelector('[data-id="agree_check"]');
const agreeButton   = document.querySelector('[data-id="agree_button"]');
const submitButton  = document.querySelector('[data-id="submit_button"]');

agreeCheckBox.addEventListener('change' , () => {
    submitButton.disabled = !agreeCheckBox.checked;
});

agreeButton.addEventListener('click' , () => {
    agreeCheckBox.removeAttribute('disabled');
    agreeCheckBox.checked = true;
    submitButton.disabled = false;
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

toggleModal();
