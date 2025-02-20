"use client"
import React from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const isAuthRoute = router.pathname.startsWith('/auth');

    React.useEffect(() => {
      if (!isAuthRoute) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          router.replace('/auth/login');
        }
      }
    }, [isAuthRoute, router]);

    if (!isAuthRoute && typeof window !== 'undefined' && !localStorage.getItem('authToken')) {
      return null; // Prevent rendering protected components without a token
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;

