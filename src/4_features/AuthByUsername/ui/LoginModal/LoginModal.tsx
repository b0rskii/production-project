import { Suspense } from 'react';
import { Loader } from '@/6_shared/ui/Loader';
import { FloatingModal, FloatingModalProps } from '@/6_shared/ui/FloatingModal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

type LoginModalProps = {
  onClose: () => void;
  anchorElRef?: FloatingModalProps['anchorElRef'];
};

export const LoginModal = (props: LoginModalProps) => {
  return (
    <FloatingModal {...props}>
      {(closeModal) => (
        <Suspense fallback={<Loader />}>
          <LoginFormLazy onSuccess={closeModal} />
        </Suspense>
      )}
    </FloatingModal>
  );
};
