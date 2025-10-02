// src/hooks/useRegister.ts
import { useState } from "react";
import { auth } from "@/shared/lib/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schema/register-schema";
import { useAuthStore } from "@/shared/store/use-auth-store";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate(); 
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const registerUser = async (values: RegisterFormValues) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user: User = userCredential.user;

      await updateProfile(user, { displayName: values.name });

      await sendEmailVerification(user, {
        url: import.meta.env.VITE_FIREBASE_EMAIL_VERIFICATION_URL,
      });

      const token = await user.getIdToken();
      setToken(token);

      setSuccessMessage(
        `Реєстрація успішна. Лист для підтвердження надіслано на ${values.email}.`
      );

      reset();
      navigate("/login"); 
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Сталася помилка під час реєстрації");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    registerUser,
    loading,
    reset,
    errorMessage,
    successMessage,
  };
}
