import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Pagina Non Trovata!</h1>
      <Link to={"/"}>
        <button>Torna alla Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
