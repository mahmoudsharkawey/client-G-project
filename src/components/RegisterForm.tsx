import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterForm: React.FC = () => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const validateEmail = (email: string) => emailRegex.test(email);
  const validatePassword = (password: string) => passwordRegex.test(password);

  const navigate = useNavigate();

  const [errorMsg, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkData = () => {
    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    } else if (!validatePassword(formData.password)) {
      console.log(formData.password);
      setErrorMessage(
        "Password should: 1- has at least one lowercase letter and one uppercase letter. 2- has at least one digit. 3- has at least one special character. 4- must be at least 8 characters length."
      );
      return false;
    } else if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password
    ) {
      setErrorMessage("Please fill the empty fields.");
      return false;
    } else {
      setErrorMessage(null);
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkData()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/user/register",
          formData
        );
        postMessage("Registration successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        if (response.status == 200) {
          navigate("/");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data);
        if(error.response.data === "User already exists!")
          setErrorMessage("This email is already registered, try to sign in, or enter another email.")
        postMessage(error.response?.data || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-24 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {errorMsg && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={
                  field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)
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
