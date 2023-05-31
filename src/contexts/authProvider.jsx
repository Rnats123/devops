import { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { Toast } from 'primereact/toast';

import { app } from '../services/firebaseConfig.js';

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext({});
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const toast = useRef(null);
  const auth = getAuth(app);

  useEffect(() => {
    function loadStorageAuth() {
      const sessionToken = sessionStorage.getItem('@AuthFirebase:token');
      const sessionUser = sessionStorage.getItem('@AuthFirebase:user');

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    }

    loadStorageAuth();
  });

  async function signInGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      setUser(user);

      sessionStorage.setItem('@AuthFirebase:token', token);
      sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: error.name,
        detail: error.message,
      });
    }
  }

  async function signInWithEmail({ email, password }) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = user.accessToken;

      setUser(user);

      sessionStorage.setItem('@AuthFirebase:token', token);
      sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: error.name,
        detail: error.message,
      });

      throw new Error('firebase');
    }
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return;
  }

  return (
    <AuthContext.Provider
      value={{ signInGoogle, signInWithEmail, signOut, signed: !!user, user }}
    >
      {children}
      <Toast ref={toast} />
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
