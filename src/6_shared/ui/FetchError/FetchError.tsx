import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import { Stack } from '6_shared/ui/Stack';
import { Text, TextTheme } from '6_shared/ui/Text';
import { RepeatButton } from '6_shared/ui/RepeatButton';
import style from './FetchError.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  message: string;
  onRepeat?: () => void;
}>;

export const FetchError = memo((props: Props) => {
  const { className, message, onRepeat } = props;

  return (
    <Stack
      className={getClassNames('', {}, [className])}
      justify="center"
      mode="v"
      maxWidth
    >
      <Text
        title={message}
        theme={TextTheme.ERROR}
        align="center"
      />
      {onRepeat && (
        <RepeatButton
          className={style.repeatButton}
          onRepeat={onRepeat}
        />
      )}
    </Stack>
  );
});
