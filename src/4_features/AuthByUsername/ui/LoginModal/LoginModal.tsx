import { Suspense } from 'react';
import { Loader } from '6_shared/ui/Loader';
import { Modal } from '6_shared/ui/Modal';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = (props: LoginModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Suspense fallback={<Loader />}>
        <LoginFormLazy onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
