'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const authenticated = sessionStorage.getItem('isAuthenticated');
    if (!authenticated) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy-600">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
