import React, { useState } from "react";
import { useForm } from "@mantine/form";
import Animatedbtn from "../common/Animatebtn";
import Heading from "../common/Heading";
import { useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formmode, setFormMode] = useState("register");
  const [submitMessage, setSubmitMessage] = useState(null);

  const isRegister = formmode === "register";
const navigate=useNavigate()
  const [loading, setLoading] = useState(false);

  const api = axios.create({ baseURL: "http://localhost:5000" });

  //const api = axios.create({ baseURL: 'https://vael.onrender.com' });
  // register form
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

  // login form
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

  // auto dismiss toast
  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  const handleRegisterSubmit = async (values) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      console.log("register payload", payload);

      const response = await axios.post(
        "http://localhost:5000/auth/register",
        payload,
      );

       const data = response.data; 

      setSubmitMessage({ text: 'Account created successfully!' });
      registerForm.reset();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/')
    } catch (err) {
      setSubmitMessage({ type: "error", text: "Error creating account." });
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      console.log("login payload", values);

      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values,
      );
       const data = response.data; 

      setSubmitMessage({ text: 'Logged in successfully!' });
      loginForm.reset();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/')
    } catch (err) {
      setSubmitMessage({ type: "error", text: "Error signing in." });
    }
  };

  const inputClass =
    "border bg-white px-3 py-2 text-sm outline-none focus:border-lux transition-colors rounded-md w-full";
  const labelClass = "text-sm uppercase text-hair";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-cream-light">
      {submitMessage && (
        <div
          className={`fixed z-50 right-10 top-2 p-4 rounded-md ${
            submitMessage.type === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-green-50 text-green-800 border border-green-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div
        className={`hidden lg:block absolute top-0 z-20 w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-in-out ${
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
              <button
                onClick={() => setFormMode("register")}
                className="underline"
              >
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
                <input
                  type="password"
                  placeholder="Your password"
                  className={inputClass}
                  {...loginForm.getInputProps("password")}
                />
                {loginForm.errors.password && (
                  <p className={errorClass}>{loginForm.errors.password}</p>
                )}
              </div>

              <Animatedbtn str={"Sign In"} />
            </form>
          </div>
        </div>

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
              <button
                onClick={() => setFormMode("login")}
                className="underline"
              >
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
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className={inputClass}
                  {...registerForm.getInputProps("password")}
                />
                {registerForm.errors.password && (
                  <p className={errorClass}>{registerForm.errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  className={inputClass}
                  {...registerForm.getInputProps("confirmPassword")}
                />
                {registerForm.errors.confirmPassword && (
                  <p className={errorClass}>
                    {registerForm.errors.confirmPassword}
                  </p>
                )}
              </div>

              <button type="submit" className="bg-ink text-white">
                <Animatedbtn str={"Create Account"} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
