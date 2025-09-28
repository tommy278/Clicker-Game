import { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create user
      await api.post('api/register/', { username, password });

      // Optionally, log in immediately
      const res = await api.post('api/token/', { username, password });
      login(res.data.access, res.data.refresh);

      navigate('/'); // go to home
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-2-sum mx-auto text-white">
      <label className="flex flex-col items-center w-full max-w-sm mx-auto mt-10">
        <span className="mb-1 text-sm font-medium">Username</span> 
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto mr-auto"
      /> </label>

      <label className="flex flex-col items-center w-full max-w-sm mx-auto">
        <span className="mb-1 text-sm font-medium">Password</span>
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-auto ml-auto"
      /> </label>
      
      <label className="flex flex-col items-center w-full max-w-sm mx-auto mb-7">
        <span className="mb-1 text-sm font-medium"> Confirm Password</span>
      <input
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-auto ml-auto"
      /> </label>

      <button type='submit'
      > <span className="border border-2 p-2 rounded-lg text-blue-700">Register</span>
      </button>
    </form>
  )
}

export default Register;