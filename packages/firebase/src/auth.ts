import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuth = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);
