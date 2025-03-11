'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import BackgroundEffect from '@/components/BackgroundEffect';

interface ProvidersProps {
  children: React.ReactNode;
}

// Change from named export to default export
export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <BackgroundEffect />
      {children}
    </LanguageProvider>
  );
}
