/* eslint-disable react/jsx-no-useless-fragment */
import { useDataBoundary } from './context';

export type DataProps = {
  name: string;
  children: string | number | null | undefined;
};

export const Data = ({ name, children }: DataProps) => {
  const { updateErrors } = useDataBoundary();
  const isEmpty = !children && children !== 0;

  updateErrors(name, isEmpty);

  // eslint-disable-next-line i18next/no-literal-string
  if (isEmpty) return <span style={{ color: 'red' }}>Нет данных</span>;

  return <>{children}</>;
};
