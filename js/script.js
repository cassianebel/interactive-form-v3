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