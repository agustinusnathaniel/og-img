import capitalize from 'lodash-es/capitalize';

export const generateOptions = (options: Array<string>) => {
  return options.map((item) => ({
    value: item,
    label: capitalize(item),
  }));
};
