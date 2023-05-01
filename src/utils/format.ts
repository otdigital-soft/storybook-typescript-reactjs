export function toLowerCaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export const yesNoFormatter = (value?: string | boolean | null) => {
  return !!value ? 'Yes' : 'No';
};

export const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(' ');
  return allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
};

export function prettyString(str: string | undefined) {
  if (!str) {
    return str;
  }
  const first = str.split(' ')[0];
  if (first === first.toUpperCase()) {
    return str;
  }
  return toLowerCaseFirstLetter(str);
}

export function prettyPlaceholder(
  strings: TemplateStringsArray,
  ...values: string[]
) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (prettyString(values[i]) || '');
  });
  return str;
}

export function prettyNumber(value: string | number | null | undefined) {
  if (value === undefined || value === null || value === '') return '';

  const [wholeNumber, ...decimal] = `${Number(value)}`.split('.');
  const formattedWholeNumber = Intl.NumberFormat('en-US').format(
    Number(wholeNumber),
  );

  if (decimal.length) {
    return `${formattedWholeNumber}.${decimal.join('')}`;
  }

  return formattedWholeNumber;
}

export function parsePrettyNumber(value: string) {
  return value.replace(/\?|(,*)/g, '');
}

export function roundNumber(value: number, precision: number) {
  return Number(value.toFixed(precision));
}
