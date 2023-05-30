import { Link } from 'react-router-dom'; // Se você estiver usando o React Router
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig.js';
import { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInUser, user, isLoading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(event) {
    event.preventDefault();
    signInUser(email, password);
  }

  if (user) {
    console.log(user);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 lg:w-1/3 max-[500px]:w-screen">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : 'Entrar'}
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Criar conta
          </Link>
        </div>
      </form>
    </div>
  );
}
