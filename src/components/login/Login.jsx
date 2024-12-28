import React, { useState } from 'react';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userDataReducer } from '../../slices/UserSlices';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleSubmit = () => {
    if (!email) setEmailError("Enter your email");
    if (!password) setPasswordError("Enter your password");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
            toast.warn('Verify your email!', {
              position: "top-right",
              autoClose: 5000,
              theme: "dark",
              transition: Bounce,
            });
          } else {
            dispatch(userDataReducer(user));
            navigate("/");
            localStorage.setItem("userData", JSON.stringify(user));
          }
        })
        .catch(() => {
          toast.error('Something went wrong!', {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
            transition: Bounce,
          });
        });
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-yellow-300 opacity-30 rounded-full blur-[200px] top-[-100px] left-[-100px] animate-spin-slow"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-40 rounded-full blur-[150px] bottom-[-80px] right-[-80px] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-pink-500 opacity-20 rounded-full blur-[250px] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] animate-bounce-slow"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-96">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">Sign In</h1>
        <div className="space-y-6">
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
            Login
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/Register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
