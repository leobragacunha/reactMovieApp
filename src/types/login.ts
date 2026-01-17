import type { AuthError, Session, User } from "@supabase/supabase-js";

export interface LoginFormProps {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponseProps {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
}
