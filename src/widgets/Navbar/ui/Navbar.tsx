import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { getClassNames } from 'shared/utils/classNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  const onCloseModal = useCallback(() => setIsAuthModalOpened(false), []);

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links} />

      <Button
        onClick={() => setIsAuthModalOpened(true)}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Войти')}
      </Button>

      {isAuthModalOpened && (
        <LoginModal
          isOpen={isAuthModalOpened}
          onClose={onCloseModal}
        />
      )}
    </nav>
  );
};
