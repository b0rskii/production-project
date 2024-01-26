import { PropsWithChildren, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Card } from '@/6_shared/ui/Card';
import { Stack } from '@/6_shared/ui/Stack';
import { Text } from '@/6_shared/ui/Text';
import { StarsRating } from '@/6_shared/ui/StarsRating';
import { Modal } from '@/6_shared/ui/Modal';
import { Input } from '@/6_shared/ui/Input';
import style from './RatingCard.module.scss';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';

type Props = PropsWithChildren<{
  className?: string;
  title?: string;
  feedbackTitle?: string;
  feedbackPlaceholder?: string;
  hasFeedback?: boolean;
  // eslint-disable-next-line no-unused-vars
  onAccept?: (stars: number, feedback?: string) => void;
  onCancel?: () => void;
}>;

export const RatingCard = memo((props: Props) => {
  const {
    className, title, feedbackTitle, feedbackPlaceholder, hasFeedback, onAccept, onCancel,
  } = props;
  const { t } = useTranslation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarClick = (stars: number) => {
    if (hasFeedback) {
      setStars(stars);
      setIsShowModal(true);
    } else {
      onAccept?.(stars);
    }
  };

  const handleInputChange = (value: string) => {
    setFeedback(value);
  };

  const handleAcceptButtonClick = (closeModal: () => void) => {
    onAccept?.(stars, feedback);
    closeModal();
  };

  const handleCancelButtonClick = (closeModal: () => void) => {
    setFeedback('');
    onCancel?.();
    closeModal();
  };

  return (
    <Card className={getClassNames(style.ratingCard, {}, [className])}>
      <Stack mode="v" gap="m">
        {title && <Text title={title} />}
        <StarsRating onStarClick={handleStarClick} />
      </Stack>

      {isShowModal && (
        <Modal onClose={() => setIsShowModal(false)}>
          {(closeModal) => (
            <>
              <Stack mode="v" gap="l" maxWidth>
                <Text title={feedbackTitle} />
                <Input
                  className={style.input}
                  placeholder={feedbackPlaceholder}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack className={style.buttons} gap="m" justify="end">
                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={() => handleAcceptButtonClick(closeModal)}
                >
                  {t('Отправить')}
                </Button>
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={() => handleCancelButtonClick(closeModal)}
                >
                  {t('Отменить')}
                </Button>
              </Stack>
            </>
          )}
        </Modal>
      )}
    </Card>
  );
});
