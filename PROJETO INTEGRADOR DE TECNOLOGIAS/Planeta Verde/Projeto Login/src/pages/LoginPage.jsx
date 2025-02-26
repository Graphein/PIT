// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento após login
import "../styles/LoginPage.css"; // Importando o CSS

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação real
    if (username === "admin" && password === "senha") {
      // Redireciona para a página inicial (ou onde for necessário após o login)
      navigate("/");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/logo-ong.png" alt="Logo ONG" className="logo" />
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
