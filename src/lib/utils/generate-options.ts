import capitalize from 'lodash-es/capitalize';

export const generateOptions = (options: Array<string>) =>
  options.map((item) => ({
    label: capitalize(item),
    value: item,
  }));
