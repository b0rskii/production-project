import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export type Profile = {
  firstname?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
};

export type ProfileSchema = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};
