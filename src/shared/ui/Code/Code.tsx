import { PropsWithChildren, memo } from 'react';
import { getClassNames } from 'shared/utils/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import CopyIcon from 'shared/assets/icons/copy.svg';
import style from './Code.module.scss';

type CodeProps = PropsWithChildren<{
  className?: string;
  code: string;
}>;

export const Code = memo((props: CodeProps) => {
  const { className, code } = props;

  return (
    <pre className={getClassNames(style.code, {}, [className])}>
      <Button className={style.copyButton} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={style.icon} />
      </Button>
      <code>
        {code}
      </code>
    </pre>
  );
});
