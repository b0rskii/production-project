import { FloatingModal, FloatingModalProps } from '@/6_shared/ui/FloatingModal';
import LoginForm from '../LoginForm/LoginForm';

type LoginModalProps = Omit<FloatingModalProps, 'children'>;

export const LoginModal = (props: LoginModalProps) => {
  return (
    <FloatingModal {...props}>
      {(closeModal) => <LoginForm onSuccess={closeModal} />}
    </FloatingModal>
  );
};
