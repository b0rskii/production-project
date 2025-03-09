import { makeAutoObservable, runInAction } from 'mobx';

// eslint-disable-next-line no-unused-vars
type QueryFn = (...args: any) => Promise<any>;
type Data<T extends QueryFn> = Awaited<ReturnType<T>>;

type QueryParams<T extends QueryFn, K extends Data<T>> = {
  queryFn: T;
  initialData?: K | null;
  errorMessage?: string | null;
  onSuccess?: () => void;
  onError?: () => void;
};

export class Query<T extends QueryFn, K extends Data<T>> {
  private queryFn: T;
  private onSuccess?: () => void;
  private onError?: () => void;
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
        this.data = data;
        this.onSuccess?.();
      });
    } catch {
      runInAction(() => {
        this.error = this.errorMessage;
        this.onError?.();
      });
    } finally {
      this.status = 'idle';
    }
  }
}
