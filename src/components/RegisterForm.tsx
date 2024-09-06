import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to an API)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center mt-24 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {['email', 'password', 'firstName', 'lastName'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-600 mb-1">
                {field === 'firstName' ? 'First Name' : 
                 field === 'lastName' ? 'Last Name' : 
                 field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={field === 'firstName' ? 'First Name' : 
                             field === 'lastName' ? 'Last Name' : 
                             field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}
          <div className="mt-6">
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-indigo-600 hover:underline">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
