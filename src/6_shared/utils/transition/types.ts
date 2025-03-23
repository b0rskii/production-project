import { ReactElement } from 'react';

export type TransitionComponentProps = {
  isShow?: boolean;
  enterFrom?: Partial<CSSStyleDeclaration>;
  enterTo?: Partial<CSSStyleDeclaration>;
  enterTransition?: string;
  leaveTo?: Partial<CSSStyleDeclaration>;
  leaveTransition?: string;
  children: ReactElement;
  // eslint-disable-next-line no-unused-vars
  setMounted: (value: boolean) => void;
};

export type TransitionProps = Omit<TransitionComponentProps, 'setMounted'>;
