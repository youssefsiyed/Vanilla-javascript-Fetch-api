//// Validate Zip code

export function zipcodeValidate(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

//// Alert Of Message

export function showAlert(message, className) {
  /// create div
  const div = document.createElement('div');
  /// add class name
  div.className = `alert alert-${className}`;
  /// add text
  div.appendChild(document.createTextNode(message));
  /// get container
  const container = document.querySelector('.container');
  const form = document.querySelector('#form-pet');
  /// Insert Alert
  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}
