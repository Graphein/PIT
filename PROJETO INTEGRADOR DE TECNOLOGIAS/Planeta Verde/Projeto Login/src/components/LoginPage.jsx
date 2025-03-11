import "../styles/LoginPage.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulando autenticação
    if (email === "grpheinleli@gmail.com" && password === "123") {
      localStorage.setItem('token', 'token123'); // Token fictício
      navigate('/Voluntarios');
    } else {
      alert('Email ou senha incorretos');
    }
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
