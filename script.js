// script.js
function calculateResults() {
    const initialAmount = parseFloat(document.getElementById('initial-amount').value);
    const monthlyDeposit = parseFloat(document.getElementById('monthly-deposit').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const investmentPeriod = parseInt(document.getElementById('investment-period').value);

    let currentAmountWithoutDeposit = initialAmount;
    let currentAmountWithDeposit = initialAmount;

    let tableHtml = '<h2>Resultados da Simulação</h2>';
    tableHtml += '<table>';
    tableHtml += '<tr><th>Mês</th><th>Patrimônio (Com Aportes)</th><th>Rendimento (Com Aportes)</th><th>Patrimônio (Sem Aportes)</th><th>Rendimento (Sem Aportes)</th></tr>';

    for (let month = 1; month <= investmentPeriod; month++) {
        const rendimentoComAportes = (currentAmountWithDeposit + monthlyDeposit) * interestRate;
        const rendimentoSemAportes = currentAmountWithoutDeposit * interestRate;
        const patrimonioSemAportes = currentAmountWithoutDeposit;

        tableHtml += '<tr>';
        tableHtml += `<td>${month}</td>`;
        tableHtml += `<td>R$ ${currentAmountWithDeposit.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${rendimentoComAportes.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${patrimonioSemAportes.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${rendimentoSemAportes.toFixed(2)}</td>`;
        tableHtml += '</tr>';

        currentAmountWithoutDeposit += currentAmountWithoutDeposit * interestRate;
        currentAmountWithDeposit = (currentAmountWithDeposit + monthlyDeposit) * (1 + interestRate);
    }

    tableHtml += '</table>';

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = tableHtml;
}

const form = document.getElementById('investment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    calculateResults();
});
