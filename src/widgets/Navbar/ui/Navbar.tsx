import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { getClassNames } from 'shared/utils/classNames';
import style from './Navbar.module.scss';

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  return (
    <nav className={getClassNames(style.navbar, {}, [className])}>
      <div className={style.links} />
      <Button
        onClick={() => setIsAuthModalOpened(true)}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Войти')}
      </Button>
      <Modal
        isOpen={isAuthModalOpened}
        onClose={() => setIsAuthModalOpened(false)}
      >
        <div style={{ width: '300px', height: '200px', background: 'gray' }} />
      </Modal>
    </nav>
  );
};
