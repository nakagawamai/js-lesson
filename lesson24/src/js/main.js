const showModal = (target)  => {
    target.classList.remove('hidden');
    target.setAttribute('aria-modal', 'true');
    target.setAttribute('role', 'dialog');
    target.removeAttribute('aria-hidden');
}

const hideModal = (target)  => {
    target.classList.add('hidden');
    target.setAttribute('aria-hidden', 'true');
    target.removeAttribute('aria-modal');
    target.removeAttribute('role');
}

const toggleModal = () => {
    const modalTarget = document.querySelector('[data-id="popup-modal"]');
    const modalTriggerElements = document.querySelectorAll("[data-modal-toggle]");
    const isHiddenModalTarget = modalTarget.classList.contains("hidden");
    
    modalTarget.addEventListener('click',() => hideModal(modalTarget));
    
    modalTriggerElements.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            isHiddenModalTarget ? showModal(modalTarget) : hideModal(modalTarget);
        });
    });
}

const agreeCheckBox = document.querySelector('[data-id="agree_check"]');
const agreeButton   = document.querySelector('[data-id="agree_button"]');
const submitButton  = document.querySelector('[data-id="submit_button"]');

agreeCheckBox.addEventListener('change' , () => {
    submitButton.disabled = agreeCheckBox.checked ? false : true;
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

toggleModal();
