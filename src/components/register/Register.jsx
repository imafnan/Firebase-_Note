import React, { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = () => {
    if (!name) setNameError("Enter your name");
    if (!email) setEmailError("Enter your email");
    if (!password) setPasswordError("Enter your password");
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.success('Registration successful! Verify your email.', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
                transition: Bounce,
              });
              navigate("/login");
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setEmailError("Email is already in use");
          } else if (errorCode === "auth/weak-password") {
            setPasswordError("Password is too weak");
          } else {
            toast.error("Something went wrong!", {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
              transition: Bounce,
            });
          }
        });
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-yellow-300 opacity-30 rounded-full blur-[200px] top-[-100px] left-[-100px] animate-move"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-40 rounded-full blur-[150px] bottom-[-80px] right-[-80px] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-pink-500 opacity-20 rounded-full blur-[250px] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] animate-bounce"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-96">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
          Register
        </h1>
        <div className="space-y-6">
          <div>
            {nameError && <p className="text-red-500 text-sm mb-1">{nameError}</p>}
            <input
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-500"
              placeholder="Name"
              type="text"
            />
          </div>

          <div>
            {emailError && <p className="text-red-500 text-sm mb-1">{emailError}</p>}
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-500"
              placeholder="Email"
              type="email"
            />
          </div>

          <div>
            {passwordError && <p className="text-red-500 text-sm mb-1">{passwordError}</p>}
            <div className="relative">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-500"
                placeholder="Password"
                type={showPass ? "text" : "password"}
              />
              {showPass ? (
                <IoIosEye
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <IoIosEyeOff
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
