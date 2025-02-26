import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { auth, logout } = useAuth();

  return (
    <div>
      <h2>Bem-vindo, {auth?.role}</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default HomePage;
