import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Acesso Negado</h2>
      <p>Você não tem permissão para acessar esta página.</p>
      <button onClick={() => navigate("/")}>Voltar para a Home</button>
    </div>
  );
};

export default UnauthorizedPage;
