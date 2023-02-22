import { FC, useCallback, useState } from 'react';
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
      <Modal
        isOpen={isAuthModalOpened}
        onClose={onCloseModal}
      >
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {/* eslint-disable-next-line max-len */}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, est dignissimos, quisquam dolorem animi aspernatur vitae expedita eveniet quasi exercitationem natus totam libero maiores quidem soluta veritatis beatae qui vero!
      </Modal>
    </nav>
  );
};
