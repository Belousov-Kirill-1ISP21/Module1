
document.getElementById('file-upload-area').addEventListener('click', function() {
    document.getElementById('family-photo').click();
});

document.getElementById('family-photo').addEventListener('change', function() {
    if (this.files.length > 0) {
        document.getElementById('file-upload-area').innerHTML = 
            `<p>Файл выбран: ${this.files[0].name}</p>`;
    }
});


const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function validatePassword() {
    if (password.value !== confirmPassword.value) {
        document.getElementById('confirm-password-error').style.display = 'block';
        return false;
    } else {
        document.getElementById('confirm-password-error').style.display = 'none';
        return true;
    }
}

password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validatePassword);


const ageNumber = document.getElementById('age');
const ageText = document.getElementById('age-text');

function validateAge() {
    if (ageNumber.value || ageText.value) {
        document.getElementById('age-error').style.display = 'none';
        return true;
    } else {
        document.getElementById('age-error').style.display = 'block';
        return false;
    }
}

ageNumber.addEventListener('input', validateAge);
ageText.addEventListener('input', validateAge);


let memberCount = 1;

document.getElementById('add-member').addEventListener('click', function() {
    memberCount++;
    const newMember = document.createElement('div');
    newMember.className = 'family-member';
    newMember.innerHTML = `
        <button type="button" class="remove-member">×</button>
        <div class="family-fields">
            <div class="form-group">
                <label for="member-last-name-${memberCount}">Фамилия</label>
                <input type="text" id="member-last-name-${memberCount}" name="member-last-name[]" placeholder="Фамилия члена семьи">
            </div>
            <div class="form-group">
                <label for="member-first-name-${memberCount}">Имя</label>
                <input type="text" id="member-first-name-${memberCount}" name="member-first-name[]" placeholder="Имя члена семьи">
            </div>
            <div class="form-group">
                <label for="member-age-${memberCount}">Возраст</label>
                <input type="number" id="member-age-${memberCount}" name="member-age[]" min="1" max="120" placeholder="Возраст">
            </div>
            <div class="form-group">
                <label for="member-gender-${memberCount}">Пол</label>
                <select id="member-gender-${memberCount}" name="member-gender[]">
                    <option value="">Выберите пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
            </div>
        </div>
    `;
    
    document.getElementById('family-members').appendChild(newMember);
    
    newMember.querySelector('.remove-member').addEventListener('click', function() {
        newMember.remove();
    });
});

document.querySelector('.remove-member').addEventListener('click', function() {
    this.closest('.family-member').remove();
});


document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('form-error').style.display = 'none';
    
    let isValid = true;
    
    const requiredFields = [
        'email', 'first-name', 'last-name', 'password', 'confirm-password', 
        'family-photo', 'privacy-policy'
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element || (element.type === 'checkbox' && !element.checked) || 
            (element.type !== 'checkbox' && !element.value)) {
            isValid = false;
            if (field !== 'privacy-policy') {
                document.getElementById(`${field}-error`).style.display = 'block';
            } else {
                document.getElementById('policy-error').style.display = 'block';
            }
        }
    });
    
    if (!validateAge()) {
        isValid = false;
    }
    
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        isValid = false;
        document.getElementById('gender-error').style.display = 'block';
    }
    
    if (!validatePassword()) {
        isValid = false;
    }
    
    if (isValid) {
        document.getElementById('success-message').style.display = 'block';
        console.log('Форма отправлена успешно');
    } else {
        document.getElementById('form-error').style.display = 'block';
    }
});