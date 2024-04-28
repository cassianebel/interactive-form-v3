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


/**
 * Form validation
 */
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const creditcardNum = document.getElementById('cc-num');
const creditcardZip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

/**
 * Email validator
 */
const emailValidator = () => {
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
  return emailIsValid;
}

/**
 * Activities validator
 */
const activitiesValidator = () => {
  const activities = activitiesSet.querySelectorAll('input');
  let total = 0;
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].checked) {
      total += 1;
    }
  }
  return (total > 0);
}

/**
 * Credit card number validator
 */
const creditcardValidator = () => {
  return /^\d{13,16}$/.test(creditcardNum.value);
}

/**
 * Zipcode validator
 */
const zipcodeValidator = () => {
  return /^\d{5}$/.test(creditcardZip.value);
}

/**
 * cvv validator
 */
const cvvValidator = () => {
  return /^\d{3}$/.test(cvv.value);
}

/**
 * Validate all the required inputs on submit
 */
form.addEventListener('submit', e => {
  
  if (!nameInput.value) {
    e.preventDefault();
    console.log(`Name: '${nameInput.value}' is not valid`);
  }

  if (!emailValidator()){
    e.preventDefault();
    console.log(`Email: '${emailInput.value}' is not valid`);
  }

  if (!activitiesValidator()) {
    e.preventDefault();
    console.log('There are no activities selected');
  }

  if (paymentSelect.value === 'credit-card') {
    if (!creditcardValidator()) {
      e.preventDefault();
      console.log(`Credit card number: '${creditcardNum.value}' is not valid`);
    }
    if (!zipcodeValidator()) {
      e.preventDefault();
      console.log(`Zipcode: '${creditcardZip.value}' is not valid`);
    }
    if (!cvvValidator()) {
      e.preventDefault();
      console.log(`cvv: '${cvv.value}' is not valid`);
    }
  }
});