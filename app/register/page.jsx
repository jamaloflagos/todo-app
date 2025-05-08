"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../components/notification";

export default function Register() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const errors = {};

    if (!fullname.trim()) errors.fullname = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!password.trim()) errors.password = "Password is required";
    if (password.trim() && !(password.trim() >= 8))
      errors.password = "Password must be at least 8 characters";
    if (!confirmPassword.trim()) errors.confirmPassword = "Confirm password";
    if (password.trim() !== confirmPassword.trim())
      errors.isPasswordMatch = "Password does not match";
    if (email && !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("You have succesfully registered");
      router.push("/login");
    }
  };

  return (
    <>
      <main className="w-full max-w-xl md:mt-30">
        <Notification />

        <div className="text-center mt-65 md:mt-0">
          <h1 className="font-bold text-lg leading-[100%]">
            Welcome to Onboard
          </h1>
          <p className="text-sm leading-[157%] mt-8">
            Let’s help to meet up your tasks.
          </p>
        </div>

        <form
          className="grid md:grid-cols-2 gap-6 mt-22"
          onSubmit={handleSubmit}
        >
          {/* Full name */}
          <label htmlFor="fullname">
            <span className="sr-only">Full name</span>
            <input
              type="text"
              id="fullname"
              value={fullname}
              placeholder="Enter your Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className={`bg-white outline-none rounded-3xl p-4 placeholder:text-sm w-full ${
                formErrors.fullname ? "border border-red-500" : ""
              }`}
            />
            {formErrors.fullname && (
              <p className="text-red-500 mt-2">{formErrors.fullname}</p>
            )}
          </label>

          {/* Email */}
          <label htmlFor="email">
            <span className="sr-only">Email</span>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white outline-none rounded-3xl p-4 placeholder:text-sm w-full ${
                formErrors.email ? "border border-red-500" : ""
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 mt-2">{formErrors.email}</p>
            )}
          </label>

          {/* Password */}
          <label htmlFor="password">
            <span className="sr-only">Password</span>
            <div
              className={`flex bg-white rounded-3xl p-4 placeholder:text-sm w-full ${
                formErrors.password ? "border border-red-500" : ""
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Confrim password"
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-white outline-none border-none rounded-3xl placeholder:text-sm w-full`}
              />
              {!showPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0022 8.42888C8.89226 8.42888 7.99219 9.2924 7.99219 10.3585C7.99219 11.4239 8.89235 12.2881 10.0022 12.2881C11.112 12.2881 12.0122 11.4239 12.0122 10.3585C12.0122 9.2924 11.1122 8.42888 10.0022 8.42888ZM6.74219 10.3585C6.74219 8.62936 8.20214 7.22888 10.0022 7.22888C11.8023 7.22888 13.2622 8.62936 13.2622 10.3585C13.2622 12.0866 11.8023 13.4881 10.0022 13.4881C8.20201 13.4881 6.74219 12.0866 6.74219 10.3585Z"
                      fill="#717784"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.1466 5.99548C5.64193 4.78181 7.70928 3.91687 10.002 3.91687C12.2942 3.91687 14.3615 4.78113 15.857 5.99451C17.3362 7.19468 18.337 8.80808 18.337 10.3585C18.337 11.9089 17.3362 13.5222 15.857 14.7224C14.3615 15.9358 12.2942 16.8001 10.002 16.8001C7.70928 16.8001 5.64193 15.9351 4.1466 14.7214C2.66762 13.521 1.66699 11.9077 1.66699 10.3585C1.66699 8.80928 2.66762 7.19588 4.1466 5.99548ZM4.95364 6.91186C3.64221 7.97626 2.91699 9.28368 2.91699 10.3585C2.91699 11.4333 3.64221 12.7406 4.95364 13.8051C6.24873 14.8562 8.03638 15.6001 10.002 15.6001C11.9673 15.6001 13.755 14.8567 15.0501 13.8059C16.3615 12.7418 17.087 11.4345 17.087 10.3585C17.087 9.28248 16.3615 7.97506 15.0501 6.91102C13.755 5.8602 11.9673 5.11687 10.002 5.11687C8.03638 5.11687 6.24873 5.86073 4.95364 6.91186Z"
                      fill="#717784"
                    />
                  </svg>

                  <span className="sr-only">Show Password</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.42 17.73c-2.23-1.46-3.67-3.66-3.67-5.59 0-3.28 4.14-7.3 9.25-7.3 2.09 0 4.03.67 5.59 1.71M19.85 8.61c.891 1.13 1.41 2.38 1.41 3.53 0 3.28-4.15 7.3-9.26 7.3-.91 0-1.799-.13-2.63-.36"
                    />
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.766 14.367a3.12 3.12 0 0 1-.925-2.23 3.159 3.159 0 0 1 5.394-2.24M15.11 12.7a3.158 3.158 0 0 1-2.538 2.541M19.892 4.25 4.118 20.024"
                    />
                  </svg>
                  <span className="sr-only">Hide Password</span>
                </button>
              )}
            </div>
            {formErrors.password && (
              <p className="text-red-500 mt-2">{formErrors.password}</p>
            )}
          </label>

          {/* Confirm password */}
          <label htmlFor="confirmPassword">
            <span className="sr-only">Confirm password</span>
            <div
              className={`flex bg-white rounded-3xl p-4 placeholder:text-sm w-full ${
                formErrors.confirmPassword ? "border border-red-500" : ""
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confrim password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`bg-white outline-none border-none rounded-3xl placeholder:text-sm w-full`}
              />
              {!showConfirmPassword ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0022 8.42888C8.89226 8.42888 7.99219 9.2924 7.99219 10.3585C7.99219 11.4239 8.89235 12.2881 10.0022 12.2881C11.112 12.2881 12.0122 11.4239 12.0122 10.3585C12.0122 9.2924 11.1122 8.42888 10.0022 8.42888ZM6.74219 10.3585C6.74219 8.62936 8.20214 7.22888 10.0022 7.22888C11.8023 7.22888 13.2622 8.62936 13.2622 10.3585C13.2622 12.0866 11.8023 13.4881 10.0022 13.4881C8.20201 13.4881 6.74219 12.0866 6.74219 10.3585Z"
                      fill="#717784"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.1466 5.99548C5.64193 4.78181 7.70928 3.91687 10.002 3.91687C12.2942 3.91687 14.3615 4.78113 15.857 5.99451C17.3362 7.19468 18.337 8.80808 18.337 10.3585C18.337 11.9089 17.3362 13.5222 15.857 14.7224C14.3615 15.9358 12.2942 16.8001 10.002 16.8001C7.70928 16.8001 5.64193 15.9351 4.1466 14.7214C2.66762 13.521 1.66699 11.9077 1.66699 10.3585C1.66699 8.80928 2.66762 7.19588 4.1466 5.99548ZM4.95364 6.91186C3.64221 7.97626 2.91699 9.28368 2.91699 10.3585C2.91699 11.4333 3.64221 12.7406 4.95364 13.8051C6.24873 14.8562 8.03638 15.6001 10.002 15.6001C11.9673 15.6001 13.755 14.8567 15.0501 13.8059C16.3615 12.7418 17.087 11.4345 17.087 10.3585C17.087 9.28248 16.3615 7.97506 15.0501 6.91102C13.755 5.8602 11.9673 5.11687 10.002 5.11687C8.03638 5.11687 6.24873 5.86073 4.95364 6.91186Z"
                      fill="#717784"
                    />
                  </svg>

                  <span className="sr-only">Show Password</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.42 17.73c-2.23-1.46-3.67-3.66-3.67-5.59 0-3.28 4.14-7.3 9.25-7.3 2.09 0 4.03.67 5.59 1.71M19.85 8.61c.891 1.13 1.41 2.38 1.41 3.53 0 3.28-4.15 7.3-9.26 7.3-.91 0-1.799-.13-2.63-.36"
                    />
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.766 14.367a3.12 3.12 0 0 1-.925-2.23 3.159 3.159 0 0 1 5.394-2.24M15.11 12.7a3.158 3.158 0 0 1-2.538 2.541M19.892 4.25 4.118 20.024"
                    />
                  </svg>
                  <span className="sr-only">Hide Password</span>
                </button>
              )}
            </div>

            {formErrors.confirmPassword && (
              <p className="text-red-500 mt-2">{formErrors.confirmPassword}</p>
            )}
          </label>

          {!formErrors.isPasswordMatch && (
            <p className="text-red-500 mt-2">{formErrors.isPasswordMatch}</p>
          )}

          <button
            type="submit"
            className="w-full max-w-lg bg-[#50c2c9] text-white text-lg cursor-pointer font-semibold rounded-lg py-4 mt-10 md:col-span-2 justify-self-center"
          >
            Register
          </button>
        </form>

        <p className="mt-5 mb-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#50c2c9]">
            Sign in
          </Link>
        </p>

        {/* Background Shape */}
        <svg
          width="200"
          height="183"
          viewBox="0 0 200 183"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        >
          <circle cy="83" r="100" fill="#8FE1D7" fillOpacity="0.5" />
          <circle cx="100" cy="13" r="100" fill="#8FE1D7" fillOpacity="0.5" />
        </svg>
      </main>
    </>
  );
}
