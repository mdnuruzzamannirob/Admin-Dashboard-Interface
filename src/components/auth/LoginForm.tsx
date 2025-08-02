import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "react-hot-toast";
import { cn } from "../../lib/utils";
import AuthInput from "./AuthInput";
import { loginSchema, type LoginFormData } from "@/lib/auth";
import { Form } from "../ui/form";

const AuthForm = () => {
  // const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      // const response = await axios.post(`/login`, {
      //   identifier: data.identifier,
      //   password: data.password,
      // });

      const response = null as any;

      if (response.status === 200) {
        // dispatch(addUserData(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));

        const expiryDate = new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString();

        // Use more robust cookie setting and ensure all values are encoded
        const setCookie = (name: string, value: string) => {
          document.cookie = `${name}=${encodeURIComponent(
            value
          )}; expires=${expiryDate}; path=/; SameSite=Strict; Secure;`;
        };

        setCookie("jwt", response.data.tokens.token);
        setCookie("refreshJwt", response.data.tokens.refreshToken);
        setCookie("userInfo", JSON.stringify(response.data));
        setCookie("userEmail", response.data.email);
        setCookie("userRole", response.data.role);
        setCookie("userPhone", response.data.phone);

        toast.success("Login Successful", {
          // description: "You have successfully logged in",
          duration: 2000,
        });
        // router.push((redirect as string) || "/home");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, {
        // description: "An error occurred during login.",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md space-y-8">
      <header className="flex flex-col">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-base">Please enter your details</p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5">
            <AuthInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
              type="text"
            />
            <div className="relative">
              <AuthInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-1 bottom-2 z-10 flex items-center bg-zinc-50 px-2 text-xl text-gray-600 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <div className="flex w-full justify-between gap-3 select-none">
              <button
                type="button"
                onClick={() => setIsRemember(!isRemember)}
                className="text-muted-foreground flex items-center gap-1"
              >
                {isRemember ? (
                  <MdCheckBox
                    className={cn("text-xl", isRemember && "text-primary")}
                  />
                ) : (
                  <MdCheckBoxOutlineBlank className="text-xl" />
                )}
                <span className={isRemember ? "text-primary" : ""}>
                  Remember Me
                </span>
              </button>
              <button
                type="button"
                // onClick={() => router.push("/forgot-password")}
                className="text-primary"
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? <>Loading...</> : "Login"}
            </button>
            {/* <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 h-9 w-full gap-1 rounded-sm text-white"
          >
            {isLoading ? <>Loading...</> : "Login"}
          </Button> */}
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p>Don't have an account?</p>
        <button
          // onClick={() => router.push("/register")}
          className="text-primary font-medium"
        >
          Register
        </button>
      </footer>
    </section>
  );
};

export default AuthForm;
