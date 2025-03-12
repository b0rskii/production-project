import { makeAutoObservable, runInAction } from 'mobx';
import { OnResultCallback, RequestData, RequestFn } from './types';

type MutationParams<MutationFn extends RequestFn> = {
  mutationFn: MutationFn;
  errorMessage?: string | null;
  onSuccess?: OnResultCallback<RequestData<MutationFn>>;
  onError?: OnResultCallback<unknown>;
};

export class Mutation<
  MutationFn extends RequestFn,
  Data extends RequestData<MutationFn>,
> {
  private mutationFn: MutationFn;
  private onSuccess?: OnResultCallback<Data>;
  private onError?: OnResultCallback<unknown>;
  private onSuccessLocal?: OnResultCallback<Data>;
  private onErrorLocal?: OnResultCallback<unknown>;
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

  mutate(...args: Parameters<MutationFn>) {
    this.error = null;
    this.status = 'loading';

    this.mutationFn(...args)
      .then((data) => {
        runInAction(() => {
          this.status = 'idle';
          this.onSuccess?.(data);
          this.onSuccessLocal?.(data);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.status = 'idle';
          this.error = this.errorMessage;
          this.onError?.(error);
          this.onErrorLocal?.(error);
        });
      });

    return {
      onSuccess: (callback: OnResultCallback<Data>) => {
        this.onSuccessLocal = callback;

        return {
          onError: (callback: OnResultCallback<unknown>) => {
            this.onErrorLocal = callback;
          },
        };
      },
      onError: (callback: OnResultCallback<unknown>) => {
        this.onErrorLocal = callback;

        return {
          onSuccess: (callback: OnResultCallback<Data>) => {
            this.onSuccessLocal = callback;
          },
        };
      },
    };
  }

  mutateAsync(...args: Parameters<MutationFn>) {
    this.error = null;
    this.status = 'loading';

    return this.mutationFn(...args)
      .then((data) => {
        runInAction(() => {
          this.status = 'idle';
          this.onSuccess?.(data);
        });
        return data;
      })
      .catch((error) => {
        runInAction(() => {
          this.status = 'idle';
          this.error = this.errorMessage;
          this.onError?.(error);
        });
        return error;
      }) as ReturnType<MutationFn>;
  }
}
