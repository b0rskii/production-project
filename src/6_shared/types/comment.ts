export interface Comment<T> {
  id: string;
  text: string;
  user: T;
}
