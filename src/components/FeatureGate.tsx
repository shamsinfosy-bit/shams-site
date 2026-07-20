import { type ReactNode } from 'react';
import { useFeatureFlag, useFeatureFlags } from '../hooks/useFeatureFlag';
import { type FeatureFlagKey } from '../types/featureFlags';

interface FeatureGateProps {
  feature: FeatureFlagKey | FeatureFlagKey[];
  children: ReactNode;
  fallback?: ReactNode;
}

function SingleGate({ feature, children, fallback = null }: { feature: FeatureFlagKey; children: ReactNode; fallback?: ReactNode }) {
  return useFeatureFlag(feature) ? <>{children}</> : <>{fallback}</>;
}

function MultiGate({ features, children, fallback = null }: { features: FeatureFlagKey[]; children: ReactNode; fallback?: ReactNode }) {
  return useFeatureFlags(features) ? <>{children}</> : <>{fallback}</>;
}

export function FeatureGate({ feature, children, fallback = null }: FeatureGateProps) {
  if (Array.isArray(feature)) return <MultiGate features={feature} fallback={fallback}>{children}</MultiGate>;
  return <SingleGate feature={feature} fallback={fallback}>{children}</SingleGate>;
}

export function FeatureComingSoon({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="w-16 h-16 rounded-full bg-shams-500/10 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-shams-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{label ? `${label} قادم قريباً` : 'هذه الميزة قادمة قريباً'}</h3>
      <p className="text-gray-400 text-sm max-w-xs">نعمل على تطوير هذه الميزة وستكون متاحة قريباً.</p>
    </div>
  );
}

export default FeatureGate;
