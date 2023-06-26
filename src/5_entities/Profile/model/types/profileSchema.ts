import { Country } from '5_entities/Country';
import { Currency } from '5_entities/Currency';

export type Profile = {
  id?: string;
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
