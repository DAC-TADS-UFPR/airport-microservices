import React, { useState } from "react";

const LoginSection: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login realizado:', { username, password });
    // Aqui você pode adicionar a lógica de autenticação
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Área Corporativa</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
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
            />
          </div>

          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;