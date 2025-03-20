import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// interface per la tipizzazione della risposta
interface LoginResponse {
    email: string;
    token: string;
    userType: string;
}

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Specifica il tipo della risposta in axios.post<LoginResponse>
            const response = await axios.post<LoginResponse>("http://localhost:8080/login", {
                email,
                password,
            });

            const {token, email: userEmail, userType} = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("userType", userType);

            navigate("/dashboard");
        } catch (error) {
            console.error("Errore durante il Login!", error);
            setError("Credenziali non valide");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 border rounded shadow bg-white text-center" style={{width: "350px"}}>
                <h2 className="mb-4">Login Page</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email}
                               onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password}
                               onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <button className="btn btn-primary btn-lg" type="submit">Login</button>
                        <Link to="/register">
                            <button className="btn btn-secondary btn-lg" type="button">Register</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
