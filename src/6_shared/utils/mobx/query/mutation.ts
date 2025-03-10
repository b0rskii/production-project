import { makeAutoObservable, runInAction } from 'mobx';
import { RequestData, RequestFn } from './types';

// eslint-disable-next-line no-unused-vars
type OnResultCallback<Data> = (data: Data) => void;

type MutationParams<MutationFn extends RequestFn> = {
  mutationFn: MutationFn;
  errorMessage?: string | null;
  onSuccess?: OnResultCallback<RequestData<MutationFn>>;
  onError?: OnResultCallback<RequestData<MutationFn>>;
};

export class Mutation<
  MutationFn extends RequestFn,
  Data extends RequestData<MutationFn>,
> {
  private mutationFn: MutationFn;
  private onSuccess?: OnResultCallback<Data>;
  private onError?: OnResultCallback<Data>;
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
  }: MutationParams<MutationFn>) {
    makeAutoObservable(this);

    this.errorMessage = errorMessage;
    this.mutationFn = mutationFn;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async mutate(...args: Parameters<MutationFn>) {
    this.error = null;
    this.status = 'loading';

    let data: Data;

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
