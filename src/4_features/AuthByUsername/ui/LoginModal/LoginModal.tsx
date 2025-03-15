import { Suspense } from 'react';
import { Loader } from '@/6_shared/ui/Loader';
import { FloatingModal } from '@/6_shared/ui/FloatingModal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

type LoginModalProps = {
  onClose: () => void;
};

export const LoginModal = (props: LoginModalProps) => {
  const { onClose } = props;

  return (
    <FloatingModal onClose={onClose}>
      {(closeModal) => (
        <Suspense fallback={<Loader />}>
          <LoginFormLazy onSuccess={closeModal} />
        </Suspense>
      )}
    </FloatingModal>
  );
};
