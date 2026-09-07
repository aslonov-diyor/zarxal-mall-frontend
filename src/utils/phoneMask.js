// Faqat +998 (O'zbekiston) va +7 (Rossiya) formatlarini qabul qiladi, harflarga yo'l qo'ymaydi.

export function maskPhoneInput(rawValue, previousValue = '') {
  let digits = rawValue.replace(/[^\d]/g, '');

  // Prefiksni aniqlash
  let country = null;
  if (digits.startsWith('998')) {
    country = 'UZ';
    digits = digits.slice(3);
  } else if (digits.startsWith('7')) {
    country = 'RU';
    digits = digits.slice(1);
  } else if (previousValue.startsWith('+7')) {
    country = 'RU';
  } else {
    country = 'UZ'; // standart — O'zbekiston
  }

  if (country === 'UZ') {
    digits = digits.slice(0, 9);
    let out = '+998';
    if (digits.length > 0) out += ' ' + digits.slice(0, 2);
    if (digits.length > 2) out += ' ' + digits.slice(2, 5);
    if (digits.length > 5) out += ' ' + digits.slice(5, 7);
    if (digits.length > 7) out += ' ' + digits.slice(7, 9);
    return out;
  } else {
    digits = digits.slice(0, 10);
    let out = '+7';
    if (digits.length > 0) out += ' ' + digits.slice(0, 3);
    if (digits.length > 3) out += ' ' + digits.slice(3, 6);
    if (digits.length > 6) out += ' ' + digits.slice(6, 8);
    if (digits.length > 8) out += ' ' + digits.slice(8, 10);
    return out;
  }
}

// Backendga yuborish uchun faqat +XXXXXXXXXXX formatga tozalaydi
export function toRawPhone(maskedValue) {
  return maskedValue.replace(/[^\d+]/g, '');
}

export function isCompletePhone(maskedValue) {
  const raw = toRawPhone(maskedValue);
  return /^(\+998\d{9}|\+7\d{10})$/.test(raw);
}
