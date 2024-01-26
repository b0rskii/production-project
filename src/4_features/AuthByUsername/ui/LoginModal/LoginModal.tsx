import { Suspense } from 'react';
import { Loader } from '@/6_shared/ui/Loader';
import { Modal } from '@/6_shared/ui/Modal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

type LoginModalProps = {
  onClose: () => void;
};

export const LoginModal = (props: LoginModalProps) => {
  const { onClose } = props;

  return (
    <Modal onClose={onClose}>
      {(closeModal) => (
        <Suspense fallback={<Loader />}>
          <LoginFormLazy onSuccess={closeModal} />
        </Suspense>
      )}
    </Modal>
  );
};
