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
 * display it based on user input
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