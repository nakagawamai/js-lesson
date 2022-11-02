const showModal = (target)  => {
    target.classList.remove('hidden');
    target.setAttribute('aria-hidden', 'false');

    document.querySelector('[data-id="close-button"]').focus();
    document.body.setAttribute('aria-hidden', 'true');
}

const hideModal = (target)  => {
    target.classList.add('hidden');
    target.setAttribute('aria-hidden', 'true');

    document.querySelector('[data-id="terms-link"]').focus();
    document.body.removeAttribute('aria-hidden');
}

const focusLock = (target) => {
    const focusableElementsSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

    target.addEventListener("keydown",(event)=> {
        if (event.key === "Tab") {
            event.preventDefault();

            const focusableElements = [...target.querySelectorAll(focusableElementsSelector)];
            const focusedItemIndex = focusableElements.indexOf(document.activeElement);
        
            if (focusedItemIndex === focusableElements.length - 1) {
                focusableElements[0].focus();
              } else {
                focusableElements[focusedItemIndex + 1].focus();
            }
        }

        if (event.key === "Escape") {
            event.preventDefault();
            hideModal(target);
        }
    });
}

const toggleModal = () => {
    const modalTarget = document.querySelector('[data-id="popup-modal"]');
    const modalTriggerElements = document.querySelectorAll("[data-modal-toggle]");
    const isHiddenModalTarget = modalTarget.classList.contains("hidden");

    focusLock(modalTarget);
    
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
};

const removeDisabledForAgreeButton = (entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const agreeButton  = document.querySelector('[data-id="agree_button"]');
            agreeButton.removeAttribute('disabled');
        }
    });
};

const observer = new IntersectionObserver(removeDisabledForAgreeButton, options);
observer.observe(document.querySelector('[data-id="last_text"]'));

toggleModal();
