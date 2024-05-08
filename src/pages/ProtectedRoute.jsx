import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../firebase/config';

const ProtectedRoute = () => {
  // kullanıcın yetkisi var mı?
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // anlık olarak kullanıcın oturmuu izle
    // herhangi bir değişimde state'i güncelle
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    // kullanıcı sayfan ayrılırsa izlyeciyi kaldır
    return () => unsub();
  }, []);

  // eğer yetkisi yoksa logine yönlendir:
  if (isAuth === false) return <Navigate to={'/'} />;

  /* outlet: alt route'un ekrnda yerleşeciği yeri belirler */
  // yetkisi varsa sayfayı göster:
  return <Outlet />;
};

export default ProtectedRoute;