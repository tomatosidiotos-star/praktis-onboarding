import { useState } from 'react';
import OnboardingFlow from './OnboardingFlow';
import WorkspacePage from './WorkspacePage';

export default function App() {
  const [page, setPage] = useState<'onboarding' | 'workspace'>('onboarding');
  const [initialTab, setInitialTab] = useState<'showcase' | 'catalog-is'>('showcase');

  if (page === 'workspace') return <WorkspacePage initialTab={initialTab} />;

  return (
    <OnboardingFlow
      onComplete={(tab) => {
        setInitialTab(tab);
        setPage('workspace');
      }}
    />
  );
}
