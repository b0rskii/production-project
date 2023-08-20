import { PropsWithChildren, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '6_shared/utils/classNames';
import { Button, ButtonTheme } from '6_shared/ui/Button';

type Props = PropsWithChildren<{
  className?: string;
  onRepeat: () => void;
}>;

export const RepeatButton = memo((props: Props) => {
  const { className, onRepeat } = props;
  const { t } = useTranslation();

  return (
    <Button
      className={getClassNames('', {}, [className])}
      theme={ButtonTheme.OUTLINE}
      onClick={onRepeat}
    >
      {t('Повторить')}
    </Button>
  );
});
