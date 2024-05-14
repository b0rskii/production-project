import { getFeatureFlag } from './getSetFeatureFlags';
import { FeatureFlags } from './types';

type ToggleFeatureOptions<T> = {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
};

export const toggleFeature = <T>({
  name,
  on,
  off,
}: ToggleFeatureOptions<T>) => {
  if (getFeatureFlag(name)) {
    return on();
  }
  return off();
};
