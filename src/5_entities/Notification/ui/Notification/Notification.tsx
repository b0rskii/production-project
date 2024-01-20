import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '@/6_shared/utils/classNames';
import { Card } from '@/6_shared/ui/Card';
import { Text } from '@/6_shared/ui/Text';
import { AppLink } from '@/6_shared/ui/AppLink';
import { Notification as TypeNotification } from '../../model/types/notification';
import style from './Notification.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  data: TypeNotification;
}>;

export const Notification = memo((props: Props) => {
  const { className, data } = props;

  const content = (
    <Card className={getClassNames(style.notification, {}, [className])}>
      <Text title={data.title} text={data.description} />
    </Card>
  );

  if (data.href) {
    return (
      <AppLink to={data.href} target="_blank">
        {content}
      </AppLink>
    );
  }

  return content;
});
