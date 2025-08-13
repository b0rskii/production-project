import z from 'zod';
import { ZCountryEnum } from '@/5_entities/Country';
import { ZCurrencyEnum } from '@/5_entities/Currency';

export const ZProfile = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number(),
  currency: ZCurrencyEnum,
  country: ZCountryEnum,
  city: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
});
export type Profile = z.infer<typeof ZProfile>;

// export type Profile = {
//   id?: string;
//   firstname?: string;
//   lastname?: string;
//   age?: number;
//   currency?: Currency;
//   country?: Country;
//   city?: string;
//   username?: string;
//   avatar?: string;
// };

export type ProfileSchema = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};
