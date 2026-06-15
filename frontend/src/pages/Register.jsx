import React, { useState } from "react";
import { useForm } from "@mantine/form";
import Animatedbtn from "@/common/Animatebtn";
import Heading from "@/common/Heading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { LoginUser, RegisterUser } = useAuth();
  const [formmode, setFormMode] = useState("register");
  const isRegister = formmode === "register";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

      {/* ── register form ── */}

  const registerForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) => {
        if (!value || !value.trim()) return "First name is required";
        if (value.trim().length < 2)
          return "First name must be at least 2 characters";
        return null;
      },
      lastName: (value) => {
        if (!value || !value.trim()) return "Last name is required";
        return null;
      },
      email: (value) => {
        if (!value || !value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email address";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },
    },
  });

      {/* ── Login form── */}

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (!value || !value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email address";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        return null;
      },
    },
  });

const handleRegisterSubmit = async (values) => {
  if (loading) return;
  setLoading(true);
  try {
    await RegisterUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
    toast.success("Registered successfully!");
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", { position: "top-left" });
  } finally {
    setLoading(false);
  }
};

const handleLoginSubmit = async (values) => {
  if (loading) return;

  setLoading(true);
  try {
    await LoginUser(values);
    toast.success("Logged in successfully!");
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong", { position: "top-left" });
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full";
  const labelClass = "text-sm uppercase text-hair";
  const errorClass = "mt-1 text-xs text-red-500";

      {/* ── password visibility ── */}

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formModeChange = () => {
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormMode(isRegister ? "login" : "register");
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden bg-cream-light">
      <div
        className={`hidden lg:block absolute top-0 z-20 w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-in-out bg-lux-light ${
          isRegister ? "left-0 translate-x-0" : "left-0 translate-x-full"
        }`}
        style={{ backgroundImage: "url('/main.png')" }}
      >
        <div className="w-full h-full bg-black/20 flex items-end p-10">
          <p className="font-cormorant text-white text-5xl">
            VA<span className="text-lux">E</span>L
          </p>
        </div>
      </div>

{/* ── login form ── */}

      <div className="absolute inset-0 z-10 flex">
        <div
          className={`w-full lg:w-1/2 h-full flex items-center justify-center px-8 py-12 ${isRegister ? "hidden lg:flex" : "flex"}`}
        >
          <div className="w-full max-w-sm">
            <Heading
              subheading={"Welcome back"}
              mainheading={"Sign"}
              termheading={"In"}
            />
            <p className="text-hair text-sm mb-8">
              Don't have an account?{" "}
              <button onClick={formModeChange} className="underline">
                Register
              </button>
            </p>

            <form
              onSubmit={loginForm.onSubmit(handleLoginSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                  {...loginForm.getInputProps("email")}
                />
                {loginForm.errors.email && (
                  <p className={errorClass}>{loginForm.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className={inputClass}
                    {...loginForm.getInputProps("password")}
                  />
                  <button
                    title={showPassword ? "Hide password" : "Show password"}
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {loginForm.errors.password && (
                  <p className={errorClass}>{loginForm.errors.password}</p>
                )}
              </div>

            <button
  type="submit"
  disabled={loading}
  className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Animatedbtn str={loading ? "Signing in…" : "Sign In"} disabled={loading} />
</button>
            </form>
          </div>
        </div>

{/* ── register form ── */}
        <div
          className={`w-full lg:w-1/2 h-full flex items-center justify-center px-8 py-12 ${!isRegister ? "hidden lg:flex" : "flex"}`}
        >
          <div className="w-full max-w-sm">
            <Heading
              subheading={"New here"}
              mainheading={"Create an"}
              termheading={"Account"}
            />
            <p className="text-hair text-sm mb-8">
              Already have one?{" "}
              <button onClick={formModeChange} className="underline">
                Sign in
              </button>
            </p>

            <form
              onSubmit={registerForm.onSubmit(handleRegisterSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    placeholder="Aria"
                    className={inputClass}
                    {...registerForm.getInputProps("firstName")}
                  />
                  {registerForm.errors.firstName && (
                    <p className={errorClass}>
                      {registerForm.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Voss"
                    className={inputClass}
                    {...registerForm.getInputProps("lastName")}
                  />
                  {registerForm.errors.lastName && (
                    <p className={errorClass}>{registerForm.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                  {...registerForm.getInputProps("email")}
                />
                {registerForm.errors.email && (
                  <p className={errorClass}>{registerForm.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className={inputClass}
                    {...registerForm.getInputProps("password")}
                  />

                  <button
                    title={showPassword ? "Hide password" : "Show password"}
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {registerForm.errors.password && (
                  <p className={errorClass}>{registerForm.errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    className={inputClass}
                    {...registerForm.getInputProps("confirmPassword")}
                  />
                  <button
                    title={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {registerForm.errors.confirmPassword && (
                  <p className={errorClass}>
                    {registerForm.errors.confirmPassword}
                  </p>
                )}
              </div>

<button
  type="submit"
  disabled={loading}
  className="bg-ink text-white disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Animatedbtn str={loading ? "Creating…" : "Create Account"} disabled={loading} />
</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
