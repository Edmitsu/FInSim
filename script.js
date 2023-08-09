function calculateResults() {
    const initialAmount = parseFloat(document.getElementById('initial-amount').value);
    const monthlyDeposit = parseFloat(document.getElementById('monthly-deposit').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const investmentPeriod = parseInt(document.getElementById('investment-period').value);
    const reinvest = document.getElementById('reinvest').checked;

    let currentAmountWithoutDeposit = initialAmount;
    let currentAmountWithDeposit = initialAmount;

    let totalRendimentoResgatado = 0;

    let tableHtml = '<h2>Resultados da Simulação</h2>';
    tableHtml += '<table>';

    let tituloTable = '<tr><th>Mês</th><th>Patrimônio (Com Aportes)</th><th>Rendimento (Com Aportes)</th>';
    tituloTable += `<th>Patrimônio (Sem Aportes)</th><th>Rendimento (Sem Aportes)</th>`;

    if (!reinvest) {
        tituloTable += `<th>Total Rendimento Resgatado</th>`;
    }

    tituloTable += '</tr>';
    tableHtml += tituloTable;

    for (let month = 1; month <= investmentPeriod; month++) {
        let rendimentoComAportes;
        let rendimentoSemAportes;

        if (reinvest) {
            rendimentoComAportes = (currentAmountWithDeposit + monthlyDeposit) * interestRate;
            currentAmountWithDeposit = currentAmountWithDeposit + monthlyDeposit + rendimentoComAportes;
            rendimentoSemAportes = currentAmountWithoutDeposit * interestRate;
            currentAmountWithoutDeposit += currentAmountWithoutDeposit * interestRate;
        } else {
            rendimentoComAportes = currentAmountWithDeposit * interestRate;
            currentAmountWithDeposit = currentAmountWithDeposit + monthlyDeposit;
            rendimentoSemAportes = currentAmountWithoutDeposit * interestRate;
            totalRendimentoResgatado += rendimentoSemAportes;
        }

        tableHtml += '<tr>';
        tableHtml += `<td>${month}</td>`;
        tableHtml += `<td>R$ ${currentAmountWithDeposit.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${rendimentoComAportes.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${currentAmountWithoutDeposit.toFixed(2)}</td>`;
        tableHtml += `<td>R$ ${rendimentoSemAportes.toFixed(2)}</td>`;

        if (!reinvest) {
            tableHtml += `<td>R$ ${totalRendimentoResgatado.toFixed(2)}</td>`;
        }

        tableHtml += '</tr>';
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
