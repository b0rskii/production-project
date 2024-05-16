import { ReactElement } from 'react';
import { FeatureFlags } from '../types';
import { getFeatureFlag } from '../getSetFeatureFlags';

type Props = {
  featureName: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
};

export const ToggleFeature = ({ featureName, on, off }: Props) => {
  if (getFeatureFlag(featureName)) {
    return on;
  }
  return off;
};
