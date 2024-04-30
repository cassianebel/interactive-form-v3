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
 * Activities
 * Update total cost display based on selected activities.
 * When an activity is selected - disable other activities that 
 * are scheduled for the same time.
 */
const activitiesSet = document.getElementById('activities');
const activitiesInputs = activitiesSet.querySelectorAll('input');

activitiesSet.addEventListener('change', (e) => {

  //Update total cost display based on selected activities.
  let total = 0;
  for(let i = 0; i < activitiesInputs.length; i++) {
    if (activitiesInputs[i].checked) {
      total = total + +activitiesInputs[i].getAttribute('data-cost');
    }
  }
  document.getElementById('activities-cost').innerHTML = `Total: $${total}`;

  //check for conflicting activities based on time of selected activity
  let clicked = e.target;
  let clickedTime = clicked.getAttribute('data-day-and-time');
  for (let i = 0; i < activitiesInputs.length; i++) {
    let activityTime = activitiesInputs[i].getAttribute('data-day-and-time');
    if (clickedTime === activityTime && clicked !== activitiesInputs[i]) {
      if (clicked.checked) {
        activitiesInputs[i].disabled = true;
        activitiesInputs[i].parentElement.classList.add('disabled');
      } else {
        activitiesInputs[i].disabled = false;
        activitiesInputs[i].parentElement.classList.remove('disabled');
      }
    }
  }
});


/**
 * Set the focus class on activities inputs
 */
for(let i = 0; i < activitiesInputs.length; i++) {
  activitiesInputs[i].addEventListener('focus', () => {
    activitiesInputs[i].parentElement.classList.add('focus');
  });
  activitiesInputs[i].addEventListener('blur', () => {
    activitiesInputs[i].parentElement.classList.remove('focus');
  });
}


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
const creditcardInput = document.getElementById('cc-num');
const zipcodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

/**
 * Email validator checks for email format
 */
const emailValidator = () => {
  const emailHint = document.getElementById('email-hint');
  const emailMissingAt = /^[^@]+[^@.]+\.[a-z]+$/i.test(emailInput.value);
  if (emailMissingAt) {
    emailHint.innerHTML = `Your email is missing the '@'`;
  }
  const emailMissingPeriod = /^[^@]+@[^@.]+[a-z]+$/i.test(emailInput.value);
  if (emailMissingPeriod) {
    emailHint.innerHTML = `Your email is missing the '.'`;
  }
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
  return emailIsValid;
}

/**
 * Activities validator checks for at least one selected activity 
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
 * Credit card number validator checks for 13-16 digits
 */
const creditcardValidator = () => {
  return /^\d{13,16}$/.test(creditcardInput.value);
}

/**
 * Zipcode validator check for 5 digits
 */
const zipcodeValidator = () => {
  return /^\d{5}$/.test(zipcodeInput.value);
}

/**
 * CVV validator checks for 3 digits
 */
const cvvValidator = () => {
  return /^\d{3}$/.test(cvvInput.value);
}

/**
 * Validation Pass handler:
 * swaps the 'not-valid' class for 'valid' on the parent of the element,
 * and hides the 'hint'
 */
const validationPass = (element) => {
  element.parentElement.classList.add('valid');
  element.parentElement.classList.remove('not-valid');
  element.parentElement.querySelector('.hint').style.display = 'none';
}

/**
 * Validation Fail handler:
 * swaps the 'valid' class for 'not-valid' on the parent of the element,
 * and displays the 'hint'
 */
const validationFail = (element) => {
  element.parentElement.classList.add('not-valid');
  element.parentElement.classList.remove('valid');
  element.parentElement.querySelector('.hint').style.display = 'block';
}

/**
 * Validate all the required inputs on submit
 */
form.addEventListener('submit', e => {
  
  if (!nameInput.value) {
    e.preventDefault();
    validationFail(nameInput);
  } else {
    validationPass(nameInput);
  }

  if (!emailValidator()){
    e.preventDefault();
    validationFail(emailInput);
  } else {
    validationPass(emailInput);
  }

  if (!activitiesValidator()) {
    e.preventDefault();
    activitiesSet.classList.add('not-valid');
    activitiesSet.classList.remove('valid');
    activitiesSet.querySelector('.hint').style.display = 'block';
  } else {
    activitiesSet.classList.add('valid');
    activitiesSet.classList.remove('not-valid');
    activitiesSet.querySelector('.hint').style.display = 'none';
  }

  if (paymentSelect.value === 'credit-card') {
    if (!creditcardValidator()) {
      e.preventDefault();
      validationFail(creditcardInput);
    } else {
      validationPass(creditcardInput);
    }

    if (!zipcodeValidator()) {
      e.preventDefault();
      validationFail(zipcodeInput);
    } else {
      validationPass(zipcodeInput);
    }

    if (!cvvValidator()) {
      e.preventDefault();
      validationFail(cvvInput);
    } else {
      validationPass(cvvInput);
    }
  }
});


/**
 * Real-time error messaging on:
 * email, credit card, zipcode and cvv inputs
 */
emailInput.addEventListener('keyup', () => {
  if (!emailValidator()) {
    validationFail(emailInput);
  } else {
    validationPass(emailInput);
  }
});

activitiesSet.addEventListener('change', () => {
  if (!activitiesValidator()) {
    activitiesSet.classList.add('not-valid');
    activitiesSet.classList.remove('valid');
    activitiesSet.querySelector('.hint').style.display = 'block';
  } else {
    activitiesSet.classList.add('valid');
    activitiesSet.classList.remove('not-valid');
    activitiesSet.querySelector('.hint').style.display = 'none';
  }
});

creditcardInput.addEventListener('keyup', () => {
  if (!creditcardValidator()) {
    validationFail(creditcardInput);
  } else {
    validationPass(creditcardInput);
  }
});

zipcodeInput.addEventListener('keyup', () => {
  if (!zipcodeValidator()) {
    validationFail(zipcodeInput);
  } else {
    validationPass(zipcodeInput);
  }
});

cvvInput.addEventListener('keyup', () => {
  if (!cvvValidator()) {
    validationFail(cvvInput);
  } else {
    validationPass(cvvInput);
  }
});