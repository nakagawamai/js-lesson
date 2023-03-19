export const togglePassword = (passwordInput,togglePasswordButton) => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordButton.textContent = '非表示';
      togglePasswordButton.setAttribute('aria-label', 'パスワードを非表示');
    } else {
      passwordInput.type = 'password';
      togglePasswordButton.textContent = '表示';
      togglePasswordButton.setAttribute('aria-label','パスワードを表示');
    }
}
