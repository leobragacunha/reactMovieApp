import type { LoginFormProps, LoginResponseProps } from "@/types/login";
import type { AuthProps } from "@/types/auth";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/services/supabaseAPI";
import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  useContext,
  useMemo,
} from "react";

const UserContext = createContext<AuthProps | undefined>(undefined);

// IMPORTANT: supabase already has an event listener for auth/sessions. It is better to use this than react query.
// https://supabase.com/docs/reference/javascript/auth-onauthstatechange
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const rememberMe = Boolean(localStorage.getItem("rememberMe"));

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listening auth events
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({
    email,
    password,
  }: LoginFormProps): Promise<LoginResponseProps> => {
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (response?.data.user === null) {
      throw new Error(
        response.error?.message ||
          "Could not complete sign up. Please try again."
      );
    }

    return response;
  };

  const signIn = async ({
    email,
    password,
  }: LoginFormProps): Promise<LoginResponseProps> => {
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (response?.data.user === null) {
      throw new Error(
        response.error?.message ||
          "Authentication failed. Check your credentials."
      );
    }

    return response;
  };

  // Logout function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Logout when closing window (if user chooses not to stay logged in)
  if (!rememberMe) {
    window.addEventListener("beforeunload", () => {
      signOut();
      localStorage.removeItem("rememberMe");
    });
  }

  const value = useMemo(
    () => ({
      isLoading,
      signUp,
      signIn,
      session,
      user,
      isAuthenticated: !!user,
      signOut,
    }),
    [isLoading, signUp, signIn, session, user, signOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    console.error("User context used outside provider");
    throw new Error("User context used outside provider");
  }

  return context;
}
