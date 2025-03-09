import { makeAutoObservable, runInAction } from 'mobx';
import { Data, RequestFn } from './types';

type OnResultCallback = () => void;

type QueryParams<T extends RequestFn, K extends Data<T>> = {
  queryFn: T;
  initialData?: K | null;
  errorMessage?: string | null;
  onSuccess?: () => void;
  onError?: () => void;
};

export class Query<T extends RequestFn, K extends Data<T>> {
  private queryFn: T;
  private onSuccess?: OnResultCallback;
  private onError?: OnResultCallback;
  private errorMessage: string | null;
  private status: 'idle' | 'loading' = 'idle';

  data: K | null = null;
  error: string | null = null;

  get isLoading() {
    return this.status === 'loading';
  }

  get isError() {
    return Boolean(this.error);
  }

  constructor({
    queryFn,
    initialData = null,
    errorMessage = null,
    onSuccess,
    onError,
  }: QueryParams<T, K>) {
    makeAutoObservable(this);

    this.data = initialData;
    this.errorMessage = errorMessage;
    this.queryFn = queryFn;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  setData(value: K) {
    this.data = value;
  }

  clearData() {
    this.data = null;
  }

  async fetch(...args: Parameters<T>) {
    this.error = null;
    this.status = 'loading';

    try {
      const data = await this.queryFn(...args);

      runInAction(() => {
        this.status = 'idle';
        this.data = data;
        this.onSuccess?.();
      });
    } catch {
      runInAction(() => {
        this.status = 'idle';
        this.error = this.errorMessage;
        this.onError?.();
      });
    }
  }
}
