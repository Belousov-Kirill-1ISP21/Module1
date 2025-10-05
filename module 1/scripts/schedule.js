
 const competitions = [
    "Космическая семья", 
    "Семейная галактика", 
    "Звездный танец",
    "Планета семьи", 
    "Космическая история", 
    "Созвездие талантов",
    "Галактика улыбок", 
    "Орбита дружбы", 
    "Комета вдохновения",
    "Млечный путь творчества", 
    "Спутник мечты", 
    "Астероид фантазии",
    "Космодром идей", 
    "Вселенная гармонии", 
    "Телескоп возможностей"
];

function generateScheduleData() {
    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';
    
    competitions.forEach(competition => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.className = 'competition-name';
        nameCell.textContent = competition;
        row.appendChild(nameCell);
        
        for (let i = 0; i < 12; i++) {
            const slotCell = document.createElement('td');
            const freeSlots = Math.floor(Math.random() * 21);
            
            const slotDiv = document.createElement('div');
            slotDiv.className = 'time-slot';
            slotDiv.textContent = freeSlots;
            
            if (freeSlots === 0) {
                slotDiv.classList.add('full');
            } else if (freeSlots <= 5) {
                slotDiv.classList.add('limited');
            } else {
                slotDiv.classList.add('available');
            }
            
            slotCell.appendChild(slotDiv);
            row.appendChild(slotCell);
        }
        
        scheduleBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', generateScheduleData);