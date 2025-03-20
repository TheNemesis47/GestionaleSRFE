import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Controlla se email e conferma email corrispondono
        if (email !== confirmEmail) {
            setError("Le email non corrispondono!");
            return;
        }

        // Controlla se password e conferma password corrispondono
        if (password !== confirmPassword) {
            setError("Le password non corrispondono!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/register", {
                email,
                password,
                role: "Employee",
                firstName,
                lastName,
                phoneNumber,
            });

            // Estrarre il token e altre informazioni dalla risposta
            const {token, email: userEmail, userType} = response.data;

            // Salvare i dati in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("userType", userType);

            // Reindirizza alla dashboard dopo la registrazione
            navigate("/dashboard");
        } catch (error) {
            console.error("Errore durante la registrazione!", error);
            setError("Errore nella registrazione, riprova.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 border rounded shadow bg-white text-center" style={{width: "600px"}}>
                <h2 className="mb-4">Registrazione</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="row">
                        {/* Nome */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nome:</label>
                            <input type="text" className="form-control" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)} required/>
                        </div>
                        {/* Cognome */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Cognome:</label>
                            <input type="text" className="form-control" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="row">
                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        {/* Conferma Email */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Conferma Email:</label>
                            <input type="email" className="form-control" value={confirmEmail}
                                   onChange={(e) => setConfirmEmail(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="row">
                        {/* Password */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        {/* Conferma Password */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Conferma Password:</label>
                            <input type="password" className="form-control" value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="row">
                        {/* Numero di Telefono */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Numero di Telefono:</label>
                            <input type="tel" className="form-control" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Ruolo:</label>
                            <input type="text" className="form-control" value="Employee" disabled/>
                        </div>
                    </div>

                    {/* Bottoni */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <button className="btn btn-primary btn-lg" type="submit">Registrati</button>
                        <Link to="/login">
                            <button className="btn btn-secondary btn-lg" type="button">Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;