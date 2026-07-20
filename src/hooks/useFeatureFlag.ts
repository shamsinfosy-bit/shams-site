import { useState, useEffect, useRef } from 'react';
import { subscribeToFeatureFlag, subscribeToAllFeatureFlags } from '../services/featureFlags';
import { type FeatureFlagKey, type FeatureFlagsMap, DEFAULT_FEATURE_FLAGS } from '../types/featureFlags';

export function useFeatureFlag(key: FeatureFlagKey): boolean {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_FEATURE_FLAGS[key]);
  const ref = useRef<boolean>(DEFAULT_FEATURE_FLAGS[key]);
  useEffect(() => {
    return subscribeToFeatureFlag(key, (v) => {
      if (v !== ref.current) { ref.current = v; setEnabled(v); }
    });
  }, [key]);
  return enabled;
}

export function useAllFeatureFlags(): FeatureFlagsMap {
  const [flags, setFlags] = useState<FeatureFlagsMap>(DEFAULT_FEATURE_FLAGS);
  useEffect(() => subscribeToAllFeatureFlags(setFlags), []);
  return flags;
}

export function useFeatureFlags(keys: FeatureFlagKey[]): boolean {
  const [enabled, setEnabled] = useState<boolean>(keys.every((k) => DEFAULT_FEATURE_FLAGS[k]));
  useEffect(() => {
    return subscribeToAllFeatureFlags((f) => setEnabled(keys.every((k) => f[k])));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join(',')]);
  return enabled;
}
