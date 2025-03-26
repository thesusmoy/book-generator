export function generateISBN(faker) {
  const group = faker.number.int({ min: 0, max: 9 });
  const publisher = faker.string.numeric(2);
  const title = faker.string.numeric(6);
  const isbn = `978-${group}-${publisher}-${title}`;
  return isbn + calculateCheckDigit(isbn);
}

function calculateCheckDigit(isbn) {
  const digits = isbn
    .replace(/[^0-9]/g, '')
    .split('')
    .map(Number);
  const sum = digits.reduce((acc, digit, index) => {
    const weight = index % 2 === 0 ? 1 : 3;
    return acc + digit * weight;
  }, 0);

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}
