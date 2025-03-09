import { makeAutoObservable, runInAction } from 'mobx';
import { Data, RequestFn } from './types';

// eslint-disable-next-line no-unused-vars
type OnResultCallback<T> = (data: T) => void;

type MutationParams<T extends RequestFn> = {
  mutationFn: T;
  errorMessage?: string | null;
  onSuccess?: OnResultCallback<Data<T>>;
  onError?: OnResultCallback<Data<T>>;
};

export class Mutation<T extends RequestFn, K extends Data<T>> {
  private mutationFn: T;
  private onSuccess?: OnResultCallback<K>;
  private onError?: OnResultCallback<K>;
  private errorMessage: string | null;
  private status: 'idle' | 'loading' = 'idle';

  error: string | null = null;

  get isLoading() {
    return this.status === 'loading';
  }

  get isError() {
    return Boolean(this.error);
  }

  constructor({
    mutationFn,
    errorMessage = null,
    onSuccess,
    onError,
  }: MutationParams<T>) {
    makeAutoObservable(this);

    this.errorMessage = errorMessage;
    this.mutationFn = mutationFn;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async mutate(...args: Parameters<T>) {
    this.error = null;
    this.status = 'loading';

    let data: K;

    try {
      data = await this.mutationFn(...args);

      runInAction(() => {
        this.status = 'idle';
        this.onSuccess?.(data);
      });
    } catch {
      runInAction(() => {
        this.status = 'idle';
        this.error = this.errorMessage;
        this.onError?.(data);
      });
    }
  }
}
