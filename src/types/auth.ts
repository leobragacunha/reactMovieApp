import type { Session, User } from "@supabase/supabase-js";
import type { LoginFormProps, LoginResponseProps } from "./login";
import type {
  updateUserFormData,
  userUpdateObject,
} from "@/schemas/updateUser";

export interface AuthProps {
  signUp: ({ email, password }: LoginFormProps) => Promise<LoginResponseProps>;
  signIn: ({ email, password }: LoginFormProps) => Promise<LoginResponseProps>;
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}
