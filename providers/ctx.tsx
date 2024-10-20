import { auth, db } from "@/firebase/firebase";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { addDoc, doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext<{
  signUp: (
    userName: string,
    email: string,
    password: string
  ) => Promise<string>;
  signIn: (email: string, password: string) => Promise<string>;
  logOut: () => Promise<string>;
  session?: string | null;
  isLoading: boolean;
}>({
  signUp: async () => "",
  signIn: async () => "",
  logOut: async () => "",
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signUp = async (
    userName: string,
    email: string,
    password: string
  ): Promise<string> => {
    try {
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSession(res.user.uid);
      const docRef = doc(db, "users", res.user.uid);
      setDoc(docRef, {
        name: userName,
      });
      return "User created successfully";
    } catch (error) {
      throw new Error("User creation failed: " + (error as Error).message);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Perform sign-in logic here
    try {
      const res: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSession(res.user.uid);

      return "Signed in successfully";
    } catch (error) {
      throw new Error("Signed in failed: " + (error as Error).message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setSession(null);
      return "Sign out successfull";
    } catch (error) {
      throw new Error("Sign out failed: " + (error as Error).message);
    }
  };

  useEffect(() => {
    // Perform any initialization or cleanup here if needed
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        session: session,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
