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
      await getUserData(user);
      navigate('/')
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex justify-center items-center">
      <form className="w-72 bg-[#F2CC8F] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={emailRef} placeholder="email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" ref={passwordRef} placeholder="password" />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="submit">Log in</button>
          <div className="inline-block align-baseline font-bold text-sm text-[#1745E9]">
            <Link className="" to='/forgot-password'>Forgot password?</Link>
          </div>
        </div>
        <div className="">
          Need an account? <Link className="font-bold text-sm text-[#1745E9]" to='/signup'>Sign up</Link>
        </div>
        {error && console.log('error', {error})}
      </form>
    </div>
  );
};

export default Login;