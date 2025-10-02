import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/shared/lib/firebase";
import { useAuthStore } from "@/shared/store/use-auth-store";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { loginSchema, type LoginFormValues } from "../schema/login-schema";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { setToken, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user && user.emailVerified) {
        const token = await user.getIdToken();
        setToken(token);
        setUser({ uid: user.uid, email: user.email, name: user.displayName });
      } else {
        setToken(null);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setToken, setUser]);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user: User = userCredential.user;

  
      if (!user.emailVerified) {
        await sendEmailVerification(user, {
          url: import.meta.env.VITE_MEETING_ROOM,
        });
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      setToken(token);
      setUser({ uid: user.uid, email: user.email, name: user.displayName });

      navigate("/me/books");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
  };
}
