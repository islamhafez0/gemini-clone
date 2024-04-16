import { ReactNode, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useFirebaseContext } from "../hooks/useFirebaseContext";
import { FirebaseError } from "firebase/app";
import { AuthContextProps } from "../interface";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseLoading, setFirebaseLoading] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const { app } = useFirebaseContext();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log("No user");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const signup = async ({
    displayName,
    email,
    password,
  }: {
    displayName: string;
    password: string;
    email: string;
  }): Promise<boolean> => {
    try {
      setFirebaseLoading(true);
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      if (creds.user) {
        await updateProfile(creds.user, { displayName });
      }
      return true;
    } catch (error) {
      handleFirebaseError(error);
      return false;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setFirebaseLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      handleFirebaseError(error);
      return false;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const signUserOut = async () => {
    try {
      setFirebaseLoading(true);
      await signOut(auth);
      return true;
    } catch (error) {
      handleFirebaseError(error);
      return false;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    try {
      setFirebaseLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return true;
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
      return false;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const handleFirebaseError = (error: any) => {
    if (error instanceof FirebaseError) {
      setFirebaseError(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signUserOut,
        firebaseError,
        firebaseLoading,
        user,
        isAuth: !!user,
        signupWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
