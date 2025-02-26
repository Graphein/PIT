import "../styles/LoginPage.css"; // Importando o CSS
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Aqui você pode adicionar a lógica para autenticar o usuário
  };

  return (
    <div className="login-container">
      <header>
        <img src="logo-ong.png" alt="Logo da ONG" id="logo-ong" />
      </header>
      <div className="login-form">
        <h1>Bem-vindo</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
