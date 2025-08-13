import z from 'zod';

export const CountryEnum = {
  Russia: 'Russia',
  Belarus: 'Belarus',
  Ukraine: 'Ukraine',
  Kazakhstan: 'Kazahstan',
  Armenia: 'Armenia',
} as const;

export const ZCountryEnum = z.enum(CountryEnum);
export type Country = z.infer<typeof ZCountryEnum>;
