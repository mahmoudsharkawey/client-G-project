import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { useAuth } from "../context/Auth/AuthContext"; // Assuming you have an AuthContext
import { toast } from "sonner";

const RegisterForm: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // Validate the form data
    if (!firstName || !lastName || !email || !password) {
      toast.error("Check submitted data.");
      return;
    }
    // Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      toast.error("Unable to register user,check your credentials");
      return;
    }

    const token = await response.json();
    if (!token) {
      toast.error("Incorrect token");
      return;
    }

    login(email, token);
    toast.success("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center mt-24 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={onSubmit}>
          {["email", "password", "firstName", "lastName"].map((field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                {field === "firstName"
                  ? "First Name"
                  : field === "lastName"
                  ? "Last Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                id={field}
                name={field}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={
                  field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                ref={
                  field === "firstName"
                    ? firstNameRef
                    : field === "lastName"
                    ? lastNameRef
                    : field === "email"
                    ? emailRef
                    : passwordRef
                }
              />
            </div>
          ))}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-indigo-600 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
