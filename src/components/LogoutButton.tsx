import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userType");
        navigate("/login");
    };

    return <button className="btn btn-danger" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;