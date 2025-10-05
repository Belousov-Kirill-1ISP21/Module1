document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const competition = document.getElementById('competition').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const participants = document.getElementById('participants').value;
    
    if (competition && date && time && participants) {
        alert('Запись успешно создана!');
        document.getElementById('booking-form').reset();
        document.getElementById('date').value = '2024-07-08';
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});

document.querySelector('.btn-logout').addEventListener('click', function() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.location.href = 'index.html';
    }
});

document.querySelectorAll('.btn-cancel').forEach(button => {
    button.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите отменить запись?')) {
            this.closest('.booking-card').remove();
            const bookingsList = document.getElementById('bookings-list');
            if (bookingsList.children.length === 0) {
                bookingsList.innerHTML = '<div class="no-bookings">У вас нет активных записей на конкурсы</div>';
            }
        }
    });
});