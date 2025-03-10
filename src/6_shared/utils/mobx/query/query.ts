import { makeAutoObservable, runInAction } from 'mobx';
import { RequestData, RequestFn } from './types';

type OnResultCallback = () => void;

type QueryParams<
  QueryFn extends RequestFn,
  Data extends RequestData<QueryFn>,
> = {
  queryFn: QueryFn;
  initialData?: Data | null;
  errorMessage?: string | null;
  onSuccess?: () => void;
  onError?: () => void;
};

export class Query<
  QueryFn extends RequestFn,
  Data extends RequestData<QueryFn>,
> {
  private queryFn: QueryFn;
  private onSuccess?: OnResultCallback;
  private onError?: OnResultCallback;
  private errorMessage: string | null;
  private status: 'idle' | 'loading' = 'idle';

  data: Data | null = null;
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
  }: QueryParams<QueryFn, Data>) {
    makeAutoObservable(this);

    this.data = initialData;
    this.errorMessage = errorMessage;
    this.queryFn = queryFn;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  setData(value: Data) {
    this.data = value;
  }

  clearData() {
    this.data = null;
  }

  async fetch(...args: Parameters<QueryFn>) {
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
