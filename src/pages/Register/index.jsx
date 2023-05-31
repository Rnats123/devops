import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { isEmailValid } from '../../utils/isEmailValid.js';
import { app } from '../../services/firebaseConfig.js';

import './styles.css';

export function Register() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState('');

  const toast = useRef(null);
  const navigate = useNavigate();

  const auth = getAuth(app);

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function handlePassword(event) {
    setPassword(event.target.value);

    if (event.target.value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  function handleConfirmPassoword(event) {
    setConfirmPassword(event.target.value);

    if (event.target.value === password && event.target.value.length > 5) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate('/home');

      console.log(userCredentials);
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: 'error',
        summary: error.name,
        detail: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Cadastre - se</h2>
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
            className={`w-full ${passwordError && 'p-invalid'}`}
            inputId="password"
            value={password}
            onChange={handlePassword}
            toggleMask
            header={
              <p className="mb-1">A senha deve ter pelo menos 6 characteres</p>
            }
          />
          <label htmlFor="password">Senha</label>
        </span>
        <span className="p-float-label">
          <Password
            className={`w-full ${passwordError && 'p-invalid'}`}
            inputId="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassoword}
            toggleMask
            feedback={false}
          />
          <label htmlFor="confirmPassword">Confirme a Senha</label>
        </span>
        <div
          id="buttons"
          className="flex align-items-center sm:flex-row-reverse flex-column w-full justify-content-between"
        >
          <Button
            className="sm:m-0 mb-3"
            label="Criar Conta"
            iconPos="right"
            loading={isLoading}
            type="submit"
            disabled={emailError || !email || passwordError || !confirmPassword}
          />
          <Link to="/">
            <Button label="Fazer login" outlined />
          </Link>
        </div>
      </form>
      <Toast ref={toast} />
    </div>
  );
}
