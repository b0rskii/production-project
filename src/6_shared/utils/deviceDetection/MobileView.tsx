import { useIsMobile } from './useIsMobile';

type Props = {
  children: JSX.Element;
};

export const MobileView = (props: Props) => {
  const { children } = props;
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return children;
};
