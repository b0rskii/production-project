import { makeAutoObservable } from 'mobx';
import { Toast } from '../../ui/Notification';

export class ToastifyStore {
  constructor() {
    makeAutoObservable(this);
  }

  toasts: Toast[] = [];

  notify(text: string) {
    this.toasts.push({
      text,
      type: 'success',
    });
  }

  notifyError(text: string) {
    this.toasts.push({
      text,
      type: 'error',
    });
  }

  removeFirstNotification() {
    this.toasts.splice(0, 1);
  }
}

export const toastifyStore = new ToastifyStore();
