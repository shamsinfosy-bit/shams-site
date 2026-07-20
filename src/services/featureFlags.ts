import {
  collection, doc, getDoc, getDocs, setDoc, onSnapshot, type Unsubscribe,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import {
  type FeatureFlagKey, type FeatureFlag, type FeatureFlagsMap, DEFAULT_FEATURE_FLAGS,
} from '../types/featureFlags';

const COL = 'featureFlags';

function mapDocs(docs: Array<{ id: string; data: () => Record<string, unknown> }>): FeatureFlagsMap {
  const result: Partial<FeatureFlagsMap> = {};
  docs.forEach((d) => { result[d.id as FeatureFlagKey] = Boolean(d.data().enabled); });
  return { ...DEFAULT_FEATURE_FLAGS, ...result } as FeatureFlagsMap;
}

export async function initializeFeatureFlags(): Promise<void> {
  const existing = new Set((await getDocs(collection(db, COL))).docs.map((d) => d.id));
  const user = auth.currentUser;
  await Promise.all(
    (Object.keys(DEFAULT_FEATURE_FLAGS) as FeatureFlagKey[])
      .filter((k) => !existing.has(k))
      .map((k) => setDoc(doc(db, COL, k), { enabled: DEFAULT_FEATURE_FLAGS[k], updatedAt: new Date().toISOString(), updatedBy: user?.uid ?? null }))
  );
}

export async function getAllFeatureFlags(): Promise<FeatureFlagsMap> {
  try {
    return mapDocs((await getDocs(collection(db, COL))).docs);
  } catch {
    return DEFAULT_FEATURE_FLAGS;
  }
}

export async function getFeatureFlag(key: FeatureFlagKey): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, COL, key));
    return snap.exists() ? Boolean(snap.data().enabled) : DEFAULT_FEATURE_FLAGS[key];
  } catch {
    return DEFAULT_FEATURE_FLAGS[key];
  }
}

export function subscribeToAllFeatureFlags(onUpdate: (f: FeatureFlagsMap) => void): Unsubscribe {
  return onSnapshot(collection(db, COL),
    (snap) => onUpdate(mapDocs(snap.docs)),
    () => onUpdate(DEFAULT_FEATURE_FLAGS)
  );
}

export function subscribeToFeatureFlag(key: FeatureFlagKey, onUpdate: (v: boolean) => void): Unsubscribe {
  return onSnapshot(doc(db, COL, key),
    (snap) => onUpdate(snap.exists() ? Boolean(snap.data().enabled) : DEFAULT_FEATURE_FLAGS[key]),
    () => onUpdate(DEFAULT_FEATURE_FLAGS[key])
  );
}

export async function setFeatureFlag(key: FeatureFlagKey, enabled: boolean): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required');
  await setDoc(doc(db, COL, key), { enabled, updatedAt: new Date().toISOString(), updatedBy: user.uid }, { merge: true });
}
