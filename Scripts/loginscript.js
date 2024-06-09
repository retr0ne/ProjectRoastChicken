document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'd_vargas8' && password === 'polloypapa11') {
            loginError.textContent = '';
            window.location.href = 'index.html'; // Redirige al usuario a index.html
        } else {
            loginError.textContent = 'Nombre de usuario o contraseña incorrectos';
        }
    });
});
