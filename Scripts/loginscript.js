/* 
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
}); */

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cedula = document.getElementById('cedula').value;
    const password = document.getElementById('password').value;

    fetch('database/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `cedula=${cedula}&password=${password}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('cedula', data.cedula);
            window.location.href = 'index.html'; // Redirige a la página principal
        } else {
            document.getElementById('login-message').textContent = data.message;
        }
    });
});
