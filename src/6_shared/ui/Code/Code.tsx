import { PropsWithChildren, memo, useState } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Timer } from '@/6_shared/const/timers';
import { Button, ButtonTheme } from '@/6_shared/ui/Button';
import CopyIcon from '@/6_shared/assets/icons/copy.svg?react';
import SuccessIcon from '@/6_shared/assets/icons/check-mark.svg?react';
import ErrorIcon from '@/6_shared/assets/icons/cross.svg?react';
import style from './Code.module.scss';

type CopyStatus = 'success' | 'error' | 'initial';

type CodeProps = PropsWithChildren<{
  className?: string;
  code: string;
}>;

export const Code = memo((props: CodeProps) => {
  const { className, code } = props;
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('initial');

  const copyButtonClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }

    setTimeout(() => {
      setCopyStatus('initial');
    }, Timer.NOTIFICATION);
  };

  return (
    <pre className={getClassNames(style.code, {}, [className])}>
      {copyStatus === 'success' && (
        <SuccessIcon className={getClassNames(style.statusIcon, {}, [style.statusIconSuccess])} />
      )}
      {copyStatus === 'error' && (
        <ErrorIcon className={getClassNames(style.statusIcon, {}, [style.statusIconError])} />
      )}
      <Button
        className={style.copyButton}
        theme={ButtonTheme.CLEAR}
        onClick={copyButtonClickHandler}
      >
        <CopyIcon className={style.icon} />
      </Button>
      <code>
        {code}
      </code>
    </pre>
  );
});
