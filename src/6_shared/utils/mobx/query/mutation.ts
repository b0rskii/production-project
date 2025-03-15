import { makeAutoObservable, runInAction } from 'mobx';
import { OnResultCallback, RequestData, RequestFn, Status } from './types';

type MutationParams<MutationFn extends RequestFn> = {
  mutationFn: MutationFn;
  errorMessage?: string | null;
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data: RequestData<MutationFn>) => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: unknown) => void;
};

export class Mutation<
  MutationFn extends RequestFn,
  Data extends RequestData<MutationFn>,
> {
  private mutationFn: MutationFn;
  private onSuccess?: OnResultCallback<Data>;
  private onError?: OnResultCallback<unknown>;
  private errorMessage: string | null;
  private status: Status = 'idle';

  error: string | null = null;

  get isPending() {
    return this.status === 'pending';
  }

  get isError() {
    return this.status === 'error';
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

  setError(value: string) {
    this.error = value;
  }

  mutate(...args: Parameters<MutationFn>) {
    this.error = null;
    this.status = 'pending';

    return this.mutationFn(...args)
      .then((data) => {
        runInAction(() => {
          this.status = 'success';
          this.onSuccess?.(data);
        });
        return data;
      })
      .catch((error) => {
        runInAction(() => {
          this.status = 'error';
          this.error = this.errorMessage;
          this.onError?.(error);
        });
        return error;
      }) as ReturnType<MutationFn>;
  }
}
