/* eslint-disable no-unused-vars */
import { memo, PropsWithChildren, useMemo } from 'react';
import { Profile, ProfileContent } from '5_entities/Profile';
import { Country, CountrySelect } from '5_entities/Country';
import { Currency, CurrencySelect } from '5_entities/Currency';
import { Field } from '6_shared/ui/Field';
import { getClassNames } from '6_shared/utils/classNames';
import { getKeysMap } from '6_shared/utils/getKeysMap';
import style from './EditProfileForm.module.scss';

export type ProfileHandlers = {
  onInputChange?: (value: string, name?: string) => void,
  onAgeChange?: (value: string) => void;
  onCountryChange: (value: Country) => void;
  onCurrencyChange: (value: Currency) => void;
};

type ProfileProps = PropsWithChildren<{
  className?: string;
  profile: Profile | null;
  isUpdating: boolean;
  handlers: ProfileHandlers;
}>;

export const EditProfileForm = memo((props: ProfileProps) => {
  const {
    className,
    profile,
    isUpdating,
    handlers,
  } = props;

  const {
    onInputChange,
    onAgeChange,
    onCountryChange,
    onCurrencyChange,
  } = handlers;

  const profileMap = useMemo(() => {
    if (!profile) {
      return null;
    }

    return getKeysMap<Profile>(profile);
  }, [profile]);

  return (
    <form
      className={getClassNames(
        style.editProfileForm,
        { [style.updating]: isUpdating },
        [className],
      )}
    >
      <ProfileContent
        avatar={profile?.avatar}
        Firstname={(
          <Field
            className={style.input}
            initialValue={profile?.firstname}
            onChange={onInputChange}
            name={profileMap?.firstname}
            disabled={isUpdating}
          />
        )}
        Lastname={(
          <Field
            className={style.input}
            initialValue={profile?.lastname}
            onChange={onInputChange}
            name={profileMap?.lastname}
            disabled={isUpdating}
          />
        )}
        Username={(
          <Field
            className={style.input}
            initialValue={profile?.username}
            onChange={onInputChange}
            name={profileMap?.username}
            disabled={isUpdating}
          />
        )}
        Age={(
          <Field
            className={style.input}
            initialValue={profile?.age}
            onChange={onAgeChange}
            type="number"
            disabled={isUpdating}
          />
        )}
        City={(
          <Field
            className={style.input}
            initialValue={profile?.city}
            onChange={onInputChange}
            name={profileMap?.city}
            disabled={isUpdating}
          />
        )}
        Country={(
          <CountrySelect
            initialValue={profile?.country}
            onChange={onCountryChange}
            disabled={isUpdating}
          />
        )}
        Currency={(
          <CurrencySelect
            initialValue={profile?.currency}
            onChange={onCurrencyChange}
            disabled={isUpdating}
          />
        )}
        AvatarNode={(
          <Field
            className={style.input}
            initialValue={profile?.avatar}
            onChange={onInputChange}
            name={profileMap?.avatar}
            disabled={isUpdating}
          />
        )}
      />
    </form>
  );
});
