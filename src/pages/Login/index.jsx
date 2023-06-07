import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { AuthContext } from '../../contexts/authProvider.jsx';
import { isEmailValid } from '../../utils/isEmailValid.js';

import './styles.css';

export function Login() {
  const { signInGoogle, signInWithEmail, signed } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useRef(null);
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);

      await signInGoogle();

      navigate('/home');
    } catch (error) {
      if (error.message == 'firebase') {
        return;
      }

      toast.current.show({
        severity: 'error',
        summary: 'Erro Interno',
        detail: 'Tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const credentials = {
      email: event.target[0].value,
      password: event.target[1].value,
    };

    try {
      setIsLoading(true);

      await signInWithEmail(credentials);

      navigate('/home');
    } catch (error) {
      if (error.message == 'firebase') {
        return;
      }

      toast.current.show({
        severity: 'error',
        summary: 'Erro Interno',
        detail: 'Tente novamente mais tarde',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (signed) {
    return <Navigate to="/home" />
  }

  return (
    <div className="w-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form className="flex flex-column gap-5" onSubmit={handleSubmit}>
        <span className="p-float-label">
          <InputText
            className={`w-full ${emailError && 'p-invalid'}`}
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="email">Email</label>
        </span>
        <span className="p-float-label">
          <Password
            className="w-full"
            inputId="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
          />
          <label htmlFor="password">Senha</label>
        </span>
        <div
          id="buttons"
          className="flex align-items-center flex-column w-full justify-content-between"
        >
          <Button
            className="m-0 mb-3 h-3rem"
            label="Entrar"
            icon="pi pi-arrow-right"
            iconPos="right"
            loading={isLoading}
            type="submit"
            disabled={emailError || !email || !password}
          />
          <Button
            className="m-0 mb-5 h-3rem flex align-items-center justify-content-center"
            severity="secondary"
            text
            raised
            onClick={handleSignInWithGoogle}
          >
            <img
              className="w-2rem mr-3"
              src="https://developers.google.com/static/identity/images/g-logo.png?hl=pt-br"
              alt="google icon"
            />
            <p>Continuar com Google</p>
          </Button>
          <Link to="/register">
            <Button className="h-3rem" label="Criar Conta" outlined />
          </Link>
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
}
