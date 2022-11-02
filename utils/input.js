export function isInputAlphanumeric(input) {
  if (
    (input >= 48 && input <= 57) ||
    (input >= 65 && input <= 90) ||
    (input >= 97 && input <= 122)
  ) {
    return true;
  } else {
    return false;
  }
}
