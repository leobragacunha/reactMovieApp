import { useUserContext } from "@/contexts/UserContext";
import type { LoginFormProps, LoginResponseProps } from "@/types/login";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { signIn, signUp } = useUserContext();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormProps) =>
      signIn({ email, password }),
    // onSuccess: ({ data }: LoginResponseProps) => {
    //   console.log("Funcionou");
    //   console.log("Mutation data:", data);
    // },
    onError: (error) => console.log("Error:", error.message),
  });

  const signUpMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormProps) =>
      signUp({ email, password }),
    // onSuccess: ({ data }: LoginResponseProps) => {
    //   console.log("Funcionou");
    //   console.log("Mutation data:", data);
    // },
    onError: (error) => console.log("Error:", error.message),
  });

  // Just for testing purposes
  //   if (mutation.isPending) {
  //     console.log("Pending....");
  //   }

  return { loginMutation, signUpMutation };
}
