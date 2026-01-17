import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { FaEnvelope, FaEye, FaLock } from "react-icons/fa";

import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { useLogin } from "@/hooks/useLogin";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [pageState, setPageState] = useState<"Login" | "SignUp">("Login");
  const navigate = useNavigate();
  const { loginMutation, signUpMutation } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    // mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      if (pageState === "Login") {
        await loginMutation.mutate(data);
        localStorage.setItem("rememberMe", String(data.rememberMe));
        navigate("/my-movie-space");
      } else if (pageState === "SignUp") {
        await signUpMutation.mutate(data);
        console.log("User created. Now confirm you user and that's it!");
      }
    } catch (error) {
      console.error(
        `${pageState === "Login" ? "Login" : "Sign Up"} error:`,
        error
      );
    }
  };

  //Structure with SHADCN, REACT-HOOK-FORM and ZOD
  //<FieldGroup>
  //  <Controller
  //    name=''
  //    control={form.control}
  //    render={({field,fieldState}) => (
  //      <ShadCNField>
  //        <Shadcn Input {...field}>
  //      </ShadCNField>
  //      )}
  //  />
  //</FieldGroup>

  return (
    <div className="flex-1 bg-linear-to-r from-violet-500 to-cyan-500">
      <div className="shadow-2xs p-8 gap-8 flex flex-col top-[50vh] left-[50vw] w-140 rounded-xl bg-white absolute translate-x-[-50%] translate-y-[-50%]">
        {/* Header */}
        <h2 className="text-4xl mx-auto font-medium text-gray-700">Login</h2>
        {/* Form */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup className="text-gray-700">
                    <InputGroupInput
                      placeholder="Email address"
                      aria-invalid={fieldState.invalid}
                      {...field}
                      autoComplete="on"
                    />
                    <InputGroupAddon>
                      <FaEnvelope />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Password"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon>
                      <FaLock />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <FaEye className="hover:cursor-pointer" />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <Field
                  className={`flex gap-2 ${pageState === "SignUp" && "hidden"}`}
                >
                  <Label
                    htmlFor="rememberMe"
                    className="font-normal has-aria-checked:font-bold"
                  >
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    Remember my credentials
                  </Label>
                </Field>
              )}
            />

            <InputGroupButton
              className="p-4 bg-gray-700 text-white"
              type="submit"
            >
              {pageState === "Login" ? "Login" : "Sign Up"}
            </InputGroupButton>
          </FieldGroup>
        </form>

        {/* Switch to other option */}
        <div className="border-t-2 border-gray-200 pt-8 text-center">
          <p className="text-gray-700">
            {pageState === "Login"
              ? "Don't have an account yet?"
              : "Already have an account?"}
            <Button
              className="text-violet-500 hover:underline hover:text-cyan-500 m-0 p-0"
              variant="link"
              onClick={() =>
                pageState === "Login"
                  ? setPageState("SignUp")
                  : setPageState("Login")
              }
            >
              {pageState === "Login" ? "Sign up" : "Login"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
