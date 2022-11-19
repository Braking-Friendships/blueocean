import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ getUserData }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await login(emailRef.current.value, passwordRef.current.value);
      const userInfo = await getUserData(user);
      // if (user) {
      //   const userInfo = await getUserData(user);
      //   if (userRole) {
      //     console.log('logging in as', userRole)
      //     if (userRole === "Client") {
      //       navigate('/client')
      //     } else if (userRole === "Coach") {
      //       navigate('/coach')
      //     } else {
      //       console.log('not loading')
      //     }
      //   }
      // }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-72 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        {/* <h2 className="w-48 text-3xl font-bold underline">Log in</h2> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={emailRef} placeholder="email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordRef} placeholder="password" />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <button className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="submit">Log in</button>
          <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <Link className="" to='/forgot-password'>Forgot password?</Link>
          </div>
        </div>
        <div className="">
          Need an account? <Link className="font-bold text-sm text-blue-500 hover:text-blue-800" to='/signup'>Sign up</Link>
        </div>
        {error && console.log('error', {error})}
      </form>
    </div>
  );
};

export default Login;