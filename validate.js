// Validate Zipcode

export function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

// Display alert mesage
export function showAlert(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert alert-${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get container
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#pet-form');
  // Insert Alert
  container.insertBefore(div, form);

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
