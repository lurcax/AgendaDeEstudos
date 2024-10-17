function generateSchedule() {
    // Pegar os dados dos inputs
    let subjects = document.getElementById("subjects").value.split(",");
    let priorities = document.getElementById("priorities").value.split(",").map(Number);
    let hoursPerWeek = parseInt(document.getElementById("hoursPerWeek").value);
    let daysOfWeek = document.getElementById("daysOfWeek").value.split(",").map(Number);

    if (subjects.length !== priorities.length) {
        alert("O número de matérias e prioridades não corresponde.");
        return;
    }

    // Calcular a soma das prioridades
    let totalPriority = priorities.reduce((acc, priority) => acc + priority, 0);

    // Criar a tabela de estudos com base nas importâncias
    let studySchedule = subjects.map((subject, index) => {
        let priority = priorities[index];
        let hoursForSubject = (priority / totalPriority) * hoursPerWeek;
        
        // Converter horas em horas e minutos
        let hours = Math.floor(hoursForSubject);
        let minutes = Math.round((hoursForSubject - hours) * 60);
        
        return {
            subject: subject.trim(),
            hours: { hours, minutes }
        };
    });

    // Distribuir as horas nos dias da semana
    let studyPerDay = {};
    let totalDays = daysOfWeek.length;
    studySchedule.forEach(item => {
        let totalHours = item.hours.hours + item.hours.minutes / 60;
        let hoursPerDay = totalHours / totalDays;

        // Calcular horas e minutos por dia
        let hours = Math.floor(hoursPerDay);
        let minutes = Math.round((hoursPerDay - hours) * 60);

        daysOfWeek.forEach(day => {
            if (!studyPerDay[day]) {
                studyPerDay[day] = [];
            }
            studyPerDay[day].push(`${item.subject}: ${hours} horas e ${minutes} minutos`);
        });
    });

    // Exibir os resultados
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Ciclo de Estudos</h2>";
    daysOfWeek.forEach(day => {
        resultDiv.innerHTML += `<h3>Dia ${day}</h3>`;
        studyPerDay[day].forEach(study => {
            resultDiv.innerHTML += `<p>${study}</p>`;
        });
    });

    resultDiv.innerHTML += `<button onclick="window.print()">Imprimir Tabela</button>`;
}
