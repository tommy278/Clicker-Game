import { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('api/token/', { username, password });
      // use context login to update state + localStorage
      login(res.data.access, res.data.refresh);
      navigate('/');
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  }

  return (
   <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-2-sum mx-auto">
      <label className="flex flex-col items-center w-full max-w-sm mx-auto mt-10">
        <span className="mb-1 text-sm font-medium text-white">Username</span> 
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto mr-auto"
      /> </label>

      <label className="flex flex-col items-center w-full max-w-sm mx-auto">
        <span className="mb-1 text-sm font-medium text-gray-700 text-white">Password</span>
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-auto ml-auto text-white"
      /> </label>

      <button type='submit'
      className="my-5"> <span className="border border-2 p-2 rounded-lg text-blue-700">Login</span>
      </button>

    </form>
  )
}

export default Login;