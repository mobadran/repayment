const amount = document.getElementById('amount');
const term = document.getElementById('term');
const interestRate = document.getElementById('interest-rate');
const repaymentBtn = document.getElementById('repayment-btn');
const interestBtn = document.getElementById('interest-btn');
const calcBtn = document.getElementById('calc-btn');
amount.addEventListener('input', formatNumber);
term.addEventListener('input', formatNumber);
interestRate.addEventListener('input', (event) => {
    interestRate.value = restrictToNumeric(event.target.value);
});
calcBtn.addEventListener('click', calculate)

function calculate(event) {
    event.preventDefault();

    // Check if any field is empty
    let wrong = false;
    if (!amount.value) {
        invalid('amount', true);
        wrong = true;
    } else invalid('amount', false);
    if (!term.value) {
        invalid('term', true);
        wrong = true;
    } else invalid('term', false);
    if (!interestRate.value) {
        invalid('rate', true);
        wrong = true;
    } else invalid('rate', false);
    if (!document.getElementById('interest-btn').checked && !document.getElementById('repayment-btn').checked) {
        invalid('type', true);
        wrong = true;
    } else invalid('type', false);

    if (wrong) return;

    const amountNum = amount.value.replace(',', '');
    const termNum = term.value.replace(',', '');
    const rateNum = interestRate.value.replace(',', '');

    let monthly;

    if (document.getElementById('repayment-btn').checked) {
        monthly = calculateRepaymentMortgage(amountNum, rateNum, termNum);
    } else {
        monthly = calculateInterestOnlyMortgage(amountNum, rateNum);
    }
    let total = monthly * termNum * 12;
    displayMortgage(monthly, total);



}


function formatNumber(event) {
    const input = event.target;
    input.value = restrictToNumeric(input.value);
    const value = input.value;
    let dot = '.';
    let [integer, decimal] = value.split('.');
    if (!decimal) decimal = '';
    if (!inArray('.', value)) dot = '';

    let formatted = new Intl.NumberFormat().format(integer) + dot + decimal;

    if (value === '') {
        input.value = '';
        return;
    }

    input.value = formatted;

}

function inArray(element, array) {
    let times = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            times++;
        }
    }
    return times;
}

function restrictToNumeric(value) {
    let newValue = '';
    const availableNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    for (let i = 0; i < value.length; i++) {
        if (inArray(value[i], availableNums)) {
            newValue += value[i];
        }
        if (inArray('.', newValue) > 1) {
            // Remove last character Which is the dot
            newValue = newValue.slice(0, newValue.length - 1);
        }
    }
    return newValue;
}

function invalid(which, inv) {
    if (inv) {
        switch (which) {
            case 'amount':
                document.getElementById('req-amount').style.visibility = 'visible';
                amount.style.borderColor = 'hsl(4, 69%, 50%)';
                document.getElementById('amount-container').style.setProperty('--beforeBGColor', 'hsl(4, 69%, 50%)');
                document.getElementById('amount-container').style.setProperty('--contentColor', 'hsl(0, 0%, 100%)');
                break
            case 'term':
                document.getElementById('req-term').style.visibility = 'visible';
                term.style.borderColor = 'hsl(4, 69%, 50%)';
                document.getElementById('term-container').style.setProperty('--beforeBGColor', 'hsl(4, 69%, 50%)');
                document.getElementById('term-container').style.setProperty('--contentColor', 'hsl(0, 0%, 100%)');
                break
            case 'rate':
                document.getElementById('req-interest').style.visibility = 'visible';
                interestRate.style.borderColor = 'hsl(4, 69%, 50%)';
                document.getElementById('rate-container').style.setProperty('--beforeBGColor', 'hsl(4, 69%, 50%)');
                document.getElementById('rate-container').style.setProperty('--contentColor', 'hsl(0, 0%, 100%)');
                break
            case 'type':
                document.getElementById('req-type').style.visibility = 'visible';
                break
        }
    } else {
        switch (which) {
            case 'amount':
                document.getElementById('req-amount').style.visibility = 'hidden';
                amount.style.borderColor = 'hsl(200, 26%, 54%)';
                document.getElementById('amount-container').style.setProperty('--beforeBGColor', 'hsl(202, 86%, 94%)');
                document.getElementById('amount-container').style.setProperty('--contentColor', 'hsl(200, 24%, 40%)');
                break

            case 'term':
                document.getElementById('req-term').style.visibility = 'hidden';
                term.style.borderColor = 'hsl(200, 26%, 54%)';
                document.getElementById('term-container').style.setProperty('--beforeBGColor', 'hsl(202, 86%, 94%)');
                document.getElementById('term-container').style.setProperty('--contentColor', 'hsl(200, 24%, 40%)');
                break

            case 'rate':
                document.getElementById('req-interest').style.visibility = 'hidden';
                interestRate.style.borderColor = 'hsl(200, 26%, 54%)';
                document.getElementById('rate-container').style.setProperty('--beforeBGColor', 'hsl(202, 86%, 94%)');
                document.getElementById('rate-container').style.setProperty('--contentColor', 'hsl(200, 24%, 40%)');
                break

            case 'type':
                document.getElementById('req-type').style.visibility = 'hidden';
                break
        }
    }
}

function calculateRepaymentMortgage(principal, annualInterestRate, termYears) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = termYears * 12;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const monthlyRepayment = principal * (numerator / denominator);
    return monthlyRepayment.toFixed(2);
}

function calculateInterestOnlyMortgage(principal, annualInterestRate) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const monthlyInterestOnlyPayment = principal * monthlyInterestRate;
    return monthlyInterestOnlyPayment.toFixed(2);
}

function displayMortgage(monthly, total) {
    document.querySelector('.empty-results').style.display = 'none';
    document.querySelector('.completed-results').style.display = 'block';
    document.getElementById('monthly-repayments').innerHTML = '$' + new Intl.NumberFormat().format(monthly);
    document.getElementById('total').innerHTML = '$' + new Intl.NumberFormat().format(total);
}