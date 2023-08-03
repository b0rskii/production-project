const firstCharLowerCase = require('../firstCharLowerCase');

module.exports = (componentName) => `import { PropsWithChildren, memo } from 'react';
import { getClassNames } from '6_shared/utils/classNames';
import style from './${componentName}.module.scss';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const ${componentName} = memo((props: Props) => {
  const { className } = props;

  return (
    <div className={getClassNames(style.${firstCharLowerCase(componentName)}, {}, [className])}>
      
    </div>
  );
});
`;
