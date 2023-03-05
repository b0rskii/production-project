import { Country, Currency } from 'shared/const/common';

export type Profile = {
  firstname: string;
  lastname: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
};

export type ProfileSchema = {
  profile: Profile | null;
  isReadonly: boolean;
  isLoading: boolean;
  error: string | null;
};
