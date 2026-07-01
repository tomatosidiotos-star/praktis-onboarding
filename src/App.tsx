import { useState } from 'react';
import OnboardingFlow from './OnboardingFlow';
import WorkspacePage from './WorkspacePage';

export default function App() {
  const [page, setPage] = useState<'onboarding' | 'workspace'>('onboarding');

  if (page === 'workspace') return <WorkspacePage />;

  return <OnboardingFlow onComplete={() => setPage('workspace')} />;
}
