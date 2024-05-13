import { FeatureFlags } from './types';

let featureFlags: FeatureFlags;

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
  return featureFlags[flag];
};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};
