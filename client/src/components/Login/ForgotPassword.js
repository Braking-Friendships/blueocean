import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
    } catch(err){
      setError('Error, please check the format and spelling of your email')
    }
    setLoading(false);
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1DE] flex justify-center items-center">
      <form className="w-72 bg-[#F2CC8F] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" ref={emailRef} />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <button className="bg-[#81B29A] hover:outline text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading} type="submit">Reset Password</button>
        </div>
        <div className="text-sm">
          Already have an account? <Link className="font-bold text-sm text-[#1745E9]" to='/login'>Log in</Link>
        </div>
        <div className="text-sm">
          Need an account? <Link className="font-bold text-sm text-[#1745E9]" to='/signup'>Sign up</Link>
        </div>
        {error && <div className="mt-4">{(error)}</div>}
        {message && <div className="mt-4">{message}</div>}
      </form>
    </div>
  )
}

export default ForgotPassword;