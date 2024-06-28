const amount = document.getElementById('amount');
amount.addEventListener('input', formatNumber);

function formatNumber() {
    // Remove any non-digit characters
    let value = amount.value.replace(/\D/g, '');

    // Format the number with commas
    value = new Intl.NumberFormat().format(value);

    // Update the input field value
    amount.value = value;
}