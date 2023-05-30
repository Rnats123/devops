import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
// import { Message } from 'primereact/message';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Faça algo com os dados do formulário, como enviar para um servidor
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Confirmação:', confirmacao);
  };

  return (
    <div className="p-grid p-dir-col">
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="senha">Senha</label>
          <Password
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            toggleMask
            feedback={false}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="confirmacao">Confirmação de Senha</label>
          <Password
            id="confirmacao"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            toggleMask
            feedback={false}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="mostrarSenha">Mostrar Senha</label>
          <input
            id="mostrarSenha"
            type="checkbox"
            checked={mostrarSenha}
            onChange={handleMostrarSenha}
          />
        </div>
        <div className="p-field">
          <Button type="submit" label="Criar Conta" />
        </div>
      </form>
      <div className="p-field">
        <Button label="Já tenho conta" />
      </div>
    </div>
  );
}
