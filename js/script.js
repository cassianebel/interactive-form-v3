/**
 * Cassia Nebel's
 * Interactive Form Project
 */


/**
 * initiate the focus on the Name input
 */
const nameInput = document.getElementById('name');
nameInput.focus();


/**
 * Hide the 'other-job-role' input onload,
 * display it based on user input.
 */
const otherJobInput = document.getElementById('other-job-role');
otherJobInput.style.display = 'none';

const jobTitleSelect = document.getElementById('title');
jobTitleSelect.addEventListener('change', () => {
  if (jobTitleSelect.value === 'other') {
    otherJobInput.style.display = 'block';
  } else {
    otherJobInput.style.display = 'none';
  }
});


/**
 * Disable the t-shirt color select onload.
 */
const colorSelect = document.getElementById('color');
colorSelect.disabled = true;

/**
 * Display available color options based on t-shirt theme selection.
 */
const designSelect = document.getElementById('design');
designSelect.addEventListener('change', () => {
  colorSelect.disabled = false;
  const colorOptions = colorSelect.querySelectorAll('option');
  for (let i = 0; i < colorOptions.length; i++) {
    if (colorOptions[i].getAttribute('data-theme') !== designSelect.value) {
      colorOptions[i].hidden = true;
    } else {
      colorOptions[i].hidden = false;
      colorOptions[i].selected = true;
    }
  }
});


/**
 * Update total cost display based on selected activities.
 */
const activitiesSet = document.getElementById('activities');
activitiesSet.addEventListener('change', () => {
  const activitiesInputs = activitiesSet.querySelectorAll('input');
  let total = 0;
  for(let i = 0; i < activitiesInputs.length; i++) {
    if (activitiesInputs[i].checked) {
      total = total + +activitiesInputs[i].getAttribute('data-cost');
    }
  }
  document.getElementById('activities-cost').innerHTML = `Total: $${total}`;
});


/**
 * Select the credit card payment option onload,
 * and hide the bitcoin and paypal info divs.
 */
const paymentSelect = document.getElementById('payment');
paymentSelect.querySelector('option[value="credit-card"]').selected = true;

const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

/**
 * Only display the relevant payment info based on selection.
 */
paymentSelect.addEventListener('change', () => {
  if (paymentSelect.value === 'credit-card') {
    creditCardDiv.style.display = 'block';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  } else if (paymentSelect.value === 'paypal') {
    paypalDiv.style.display = 'block';
    bitcoinDiv.style.display = 'none';
    creditCardDiv.style.display = 'none';
  } else if (paymentSelect.value === 'bitcoin') {
    bitcoinDiv.style.display = 'block';
    paypalDiv.style.display = 'none';
    creditCardDiv.style.display = 'none';
  }
});