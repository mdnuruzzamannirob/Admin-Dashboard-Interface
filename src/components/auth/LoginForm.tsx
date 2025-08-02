import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "react-hot-toast";
import { cn } from "../../lib/utils";
import AuthInput from "./AuthInput";
import { loginSchema, type LoginFormData } from "@/lib/auth";
import { Form } from "../ui/form";
import { useAppDispatch } from "@/store/hook";
import { login } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPass] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
    setLoading(true);

    const payload = {
      isRemembered: remember,
      user: {
        id: Math.random().toString(36).substring(7), // Mock user ID
        email: data.email,
        name: "",
      },
    };

    try {
      dispatch(login(payload));
      localStorage.setItem("user", JSON.stringify(payload.user));
      toast.success("Login Successful", {
        // description: "You have successfully logged in",
        duration: 2000,
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, {
        // description: "An error occurred during login.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
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
                type={showPass ? "text" : "password"}
              />
              {/* <button
                type="button"
                className="absolute right-1 bottom-2  z-10 flex items-center bg-transparent cursor-pointer px-2 text-xl text-gray-600 dark:text-gray-300"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button> */}
            </div>
            <div className="flex w-full justify-between gap-3 select-none">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className="text-muted-foreground text-sm font-medium cursor-pointer flex items-center gap-1"
              >
                {remember ? (
                  <MdCheckBox
                    className={cn("text-lg", remember && "text-primary")}
                  />
                ) : (
                  <MdCheckBoxOutlineBlank className="text-lg" />
                )}
                <span className={remember ? "text-primary" : ""}>
                  Remember Me
                </span>
              </button>
              <button
                type="button"
                // onClick={() => router.push("/forgot-password")}
                className=" text-sm font-medium cursor-pointer text-muted-foreground"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 h-9 w-full gap-1 rounded-sm text-white"
            >
              {loading ? <>Loading...</> : "Login"}
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
      <footer className="flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Don't have an account?</p>
        <button
          // onClick={() => router.push("/register")}
          className="text-primary cursor-pointer font-medium"
        >
          Register
        </button>
      </footer>
    </section>
  );
};

export default AuthForm;
