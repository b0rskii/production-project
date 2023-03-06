import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from 'shared/utils/classNames';
import style from './ProfileRow.module.scss';

type ProfileRowProps = PropsWithChildren<{
  className?: string;
  name: string;
  isReadonly: boolean;
  value?: string;
}>;

export const ProfileRow = memo((props: ProfileRowProps) => {
  const { className, name, isReadonly, value, children } = props;
  const { t } = useTranslation();

  return (
    <div className={getClassNames(style.profileRow, {}, [className])}>
      <span>
        {t(name)}
        :
      </span>
      {isReadonly && <span>{value}</span>}
      {!isReadonly && children}
    </div>
  );
});
