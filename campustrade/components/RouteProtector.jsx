"use client"
import React, { useEffect,useState } from 'react'
import { UseFirebase } from '@/auth/firebase'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

const RouteProtector = ({ children }) => {
  const firebase = UseFirebase();
  const user = firebase.user;
  const loading = firebase.loading; 
  const router = useRouter();
  const pathname = usePathname();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (loading) return; 

    if (!user && pathname !== "/" && pathname !== "/login") {
      setRedirect(true);
      setTimeout(() => setRedirect(false), 2000);
      router.push("/login");
    }
  }, [user, pathname, router, loading]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center flex-col">
        <Image src={"/loader2.svg"} width={400} height={500} alt="loader" />
        <h2 className="text-white text-3xl text-center">Authenticating...</h2>
      </div>
    );
  }

  if (redirect) {
    return (
      <div className="w-full flex justify-center items-center flex-col">
        <Image src={"/loader2.svg"} width={400} height={500} alt="loader" />
        <h2 className="text-white text-3xl text-center">Redirecting to login page</h2>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteProtector
