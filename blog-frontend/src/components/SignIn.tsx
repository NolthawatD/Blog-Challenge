import React from "react";

const SignIn = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-green-300">
      {/* Left side */}
      <div className="flex-1 bg-dark-green flex items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <span className="block mb-3 text-4xl font-bold text-white">Sign in</span>
          <div className="py-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <button className="w-full bg-custom-success text-white p-2 rounded-lg mb-6 hover:bg-green-400">
            Sign In
          </button>
        </div>
      </div>

      {/* Right side */}
			<div className="flex-1 bg-green-500 flex items-center justify-center p-4 lg:rounded-tl-3xl lg:rounded-bl-3xl">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">a Board</h1>
        </div>
      </div>
			
    </div>
  );
};

export default SignIn;
