import z from 'zod';

export const CurrencyEnum = {
  RUB: 'RUB',
  USD: 'USD',
  EUR: 'EUR',
} as const;

export const ZCurrencyEnum = z.enum(CurrencyEnum);
export type Currency = z.infer<typeof ZCurrencyEnum>;
