import type { ComplexAttributeConverter } from 'lit';

export const stringAndNumberConverter: ComplexAttributeConverter<string | number | undefined> = {
  fromAttribute: (_value) => {
    const value = _value?.trim();
    return value != null && value !== '' && Number.isSafeInteger(+value)
      ? +value
      : value || undefined;
  },
  toAttribute: (value) => (value == null || value === '' ? null : value),
};

export const stringAndBooleanConverter: ComplexAttributeConverter<string | boolean | undefined> = {
  fromAttribute: (_value) => {
    const value = _value?.trim();
    return value === '' ? true : (value ?? undefined);
  },
  // eslint-disable-next-line no-nested-ternary
  toAttribute: (value) => (value == null || value === false ? null : value === true ? '' : value),
};

export const numberAndBooleanConverter: ComplexAttributeConverter<number | boolean | undefined> = {
  fromAttribute: (_value) => {
    const value = _value?.trim();
    if (value == null) return undefined;
    if (value === '') return true;
    return Number.isFinite(+value) ? +value : !!value;
  },
  // eslint-disable-next-line no-nested-ternary
  toAttribute: (value) => (value == null || value === false ? null : value === true ? '' : value),
};

export const numberAndStringAndBooleanConverter: ComplexAttributeConverter<
  number | string | boolean | undefined
> = {
  fromAttribute: (_value) => {
    const value = _value?.trim();
    if (value == null) return undefined;
    if (value === '') return true;
    return Number.isFinite(+value) ? +value : !!value;
  },
  // eslint-disable-next-line no-nested-ternary
  toAttribute: (value) => (value == null || value === false ? null : value === true ? '' : value),
};
