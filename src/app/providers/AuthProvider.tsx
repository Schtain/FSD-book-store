// import { useEffect, type ReactNode } from 'react';
// import { useAuthStore } from '@/features/auth';

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const initAuthListener = useAuthStore((state) => state.initAuthListener);

//   useEffect(() => {
//     const unsubscribe = initAuthListener();

//     return () => unsubscribe();
//   }, [initAuthListener]);
//   return <>{children}</>;
// }
