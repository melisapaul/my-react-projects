import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-[350px] h-[600px] bg-amber-300 flex flex-col items-center justify-start rounded-2xl shadow-lg p-6 pt-8">
        <h1 className="font-extrabold text-4xl mb-10">Register below</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            onChange={handleInput}
            className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-5"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInput}
            className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-5"
          />
          <input
            type="number"
            name="number"
            placeholder="Enter your number"
            onChange={handleInput}
            className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-5"
          />
          <input
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-5"
          />
          <button className="px-5 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white hover:cursor-pointer mt-10">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
