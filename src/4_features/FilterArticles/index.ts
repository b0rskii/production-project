export {
  SLICE_NAME as FILTER_ARTICLES_SLICE,
  filterArticlesReducer,
  filterArticlesActions,
} from './model/slice/filterArticlesSlice';

export { FilterArticlesSchema } from './model/types/filterArticlesSchema';
export { filterArticlesSelectors } from './model/selectors';
export { ArticlesSearch } from './ui/ArticlesSearch';
export { SearchParam as FilterArticlesSearchParam } from './model/const';
