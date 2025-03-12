import { makeAutoObservable, runInAction } from 'mobx';
import { OnResultCallback, RequestData, RequestFn } from './types';

type QueryParams<
  QueryFn extends RequestFn,
  Data extends RequestData<QueryFn>,
> = {
  queryFn: QueryFn;
  initialData?: Data | null;
  errorMessage?: string | null;
  onSuccess?: OnResultCallback<Data>;
  onError?: OnResultCallback<unknown>;
};

export class Query<
  QueryFn extends RequestFn,
  Data extends RequestData<QueryFn>,
> {
  private queryFn: QueryFn;
  private onSuccess?: OnResultCallback<Data>;
  private onError?: OnResultCallback<unknown>;
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

    return this.queryFn(...args)
      .then((data) => {
        runInAction(() => {
          this.status = 'idle';
          this.data = data;
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
      }) as ReturnType<QueryFn>;
  }
}
