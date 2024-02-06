import { PropsWithChildren, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Card } from '@/6_shared/ui/Card';
import { Stack } from '@/6_shared/ui/Stack';
import { Text } from '@/6_shared/ui/Text';
import { StarsRating } from '@/6_shared/ui/StarsRating';
import { Modal } from '@/6_shared/ui/Modal';
import { Input } from '@/6_shared/ui/Input';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import { DesktopView, MobileView } from '@/6_shared/utils/deviceDetection';
import { Drawer } from '@/6_shared/ui/Drawer';
import style from './RatingCard.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  rate?: number;
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
    className, rate = 0, title, feedbackTitle, feedbackPlaceholder, hasFeedback, onAccept, onCancel,
  } = props;
  const { t } = useTranslation();

  const [isShowModal, setIsShowModal] = useState(false);
  const [stars, setStars] = useState(rate);
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
    onAccept?.(stars);
    onCancel?.();
    closeModal();
  };

  const ModalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        className={style.input}
        placeholder={feedbackPlaceholder}
        autoFocus
        onChange={handleInputChange}
      />
    </>
  );

  return (
    <Card className={getClassNames(style.ratingCard, {}, [className])}>
      <Stack mode="v" gap="m">
        {title && (
          <Text
            title={stars ? t('Спасибо за вашу оценку!') : title}
          />
        )}
        <StarsRating selectedStars={stars} onStarClick={handleStarClick} />
      </Stack>

      {isShowModal && (
        <>
          <DesktopView>
            <Modal onClose={() => setIsShowModal(false)}>
              {(closeModal) => (
                <>
                  <Stack mode="v" gap="l" maxWidth>
                    {ModalContent}
                  </Stack>
                  <Stack className={style.buttonsModal} gap="m" justify="end">
                    <Button
                      theme={ButtonTheme.OUTLINE}
                      disabled={feedback.length === 0}
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
          </DesktopView>
          <MobileView>
            <Drawer onClose={() => setIsShowModal(false)}>
              {(closeDrawer) => (
                <>
                  {ModalContent}
                  <Stack className={style.buttonsDrawer} mode="v" gap="s" justify="end">
                    <Button
                      theme={ButtonTheme.OUTLINE}
                      onClick={() => handleAcceptButtonClick(closeDrawer)}
                    >
                      {t('Отправить')}
                    </Button>
                    <Button
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={() => handleCancelButtonClick(closeDrawer)}
                    >
                      {t('Отменить')}
                    </Button>
                  </Stack>
                </>
              )}
            </Drawer>
          </MobileView>
        </>
      )}
    </Card>
  );
});
