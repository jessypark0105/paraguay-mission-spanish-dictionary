const units = [
  'cero',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
  'diez',
  'once',
  'doce',
  'trece',
  'catorce',
  'quince',
  'dieciséis',
  'diecisiete',
  'dieciocho',
  'diecinueve',
];

const twenties = [
  'veinte',
  'veintiuno',
  'veintidós',
  'veintitrés',
  'veinticuatro',
  'veinticinco',
  'veintiséis',
  'veintisiete',
  'veintiocho',
  'veintinueve',
];

const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const hundreds: Record<number, string> = {
  2: 'doscientos',
  3: 'trescientos',
  4: 'cuatrocientos',
  5: 'quinientos',
  6: 'seiscientos',
  7: 'setecientos',
  8: 'ochocientos',
  9: 'novecientos',
};

const koreanReadings: Record<string, string> = {
  cero: '세로',
  uno: '우노',
  un: '운',
  dos: '도스',
  tres: '뜨레스',
  cuatro: '꾸아뜨로',
  cinco: '씽꼬',
  seis: '세이스',
  siete: '시에떼',
  ocho: '오초',
  nueve: '누에베',
  diez: '디에스',
  once: '온세',
  doce: '도세',
  trece: '뜨레세',
  catorce: '까또르세',
  quince: '낀세',
  dieciséis: '디에시세이스',
  diecisiete: '디에시시에떼',
  dieciocho: '디에시오초',
  diecinueve: '디에시누에베',
  veinte: '베인떼',
  veintiuno: '베인띠우노',
  veintiún: '베인띠운',
  veintidós: '베인띠도스',
  veintitrés: '베인띠뜨레스',
  veinticuatro: '베인띠꾸아뜨로',
  veinticinco: '베인띠씽꼬',
  veintiséis: '베인띠세이스',
  veintisiete: '베인띠시에떼',
  veintiocho: '베인띠오초',
  veintinueve: '베인띠누에베',
  treinta: '뜨레인따',
  cuarenta: '꾸아렌따',
  cincuenta: '씽꾸엔따',
  sesenta: '세센따',
  setenta: '세뗀따',
  ochenta: '오첸따',
  noventa: '노벤따',
  cien: '시엔',
  ciento: '시엔또',
  doscientos: '도스시엔또스',
  trescientos: '뜨레스시엔또스',
  cuatrocientos: '꾸아뜨로시엔또스',
  quinientos: '끼니엔또스',
  seiscientos: '세이스시엔또스',
  setecientos: '세떼시엔또스',
  ochocientos: '오초시엔또스',
  novecientos: '노베시엔또스',
  mil: '밀',
  y: '이',
};

function underOneHundred(number: number): string {
  if (number < 20) return units[number];
  if (number < 30) return twenties[number - 20];
  const tensWord = tens[Math.floor(number / 10)];
  const remainder = number % 10;
  return remainder ? `${tensWord} y ${units[remainder]}` : tensWord;
}

function underOneThousand(number: number): string {
  if (number < 100) return underOneHundred(number);
  if (number === 100) return 'cien';

  const hundredsDigit = Math.floor(number / 100);
  const remainder = number % 100;
  const hundredsWord = hundredsDigit === 1 ? 'ciento' : hundreds[hundredsDigit];
  return remainder ? `${hundredsWord} ${underOneHundred(remainder)}` : hundredsWord;
}

function apocopateUno(words: string): string {
  if (words.endsWith('veintiuno')) return `${words.slice(0, -'veintiuno'.length)}veintiún`;
  if (words.endsWith(' y uno')) return `${words.slice(0, -'uno'.length)}un`;
  if (words.endsWith('uno')) return `${words.slice(0, -'uno'.length)}un`;
  return words;
}

export function numberToSpanish(number: number): string {
  if (!Number.isInteger(number) || number < 0 || number > 999_999) {
    throw new RangeError('Number must be an integer from 0 to 999,999.');
  }
  if (number < 1_000) return underOneThousand(number);

  const thousands = Math.floor(number / 1_000);
  const remainder = number % 1_000;
  const thousandsWords = thousands === 1 ? 'mil' : `${apocopateUno(underOneThousand(thousands))} mil`;
  return remainder ? `${thousandsWords} ${underOneThousand(remainder)}` : thousandsWords;
}

export function numberToKoreanPronunciation(spanishWords: string): string | undefined {
  const words = spanishWords.split(' ');
  const readings = words.map((word) => koreanReadings[word]);
  return readings.every((reading): reading is string => reading !== undefined) ? readings.join(' ') : undefined;
}
