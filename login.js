document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        
        const username = formData.get('username');
        const password = formData.get('password');

        // Перевіряємо, чи вірний логін та пароль адміністратора
        if (username === 'admin' && password === '12345') {
            // Якщо вірно, перенаправляємо користувача на сторінку профілю
            window.location.href = 'admin_profile.html';
        } else {
            // Якщо невірно, виводимо помилку
            loginError.style.display = 'block';
        }
    });
});











