import React, {useState} from "react";
import {Modal, Button, Form, Col, Row, Alert} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import {fetchWithAuth} from "../static/api";

interface AddSupplierModalProps {
    onSupplierAdded: (msg: string, success: boolean) => void;
}

interface APIError {
    status: number;
    details?: string;
    error?: string;
}

const AddSupplierModal = ({onSupplierAdded}: AddSupplierModalProps) => {
    const [show, setShow] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        piva: "",
        address: "",
        zipCode: "",
        city: "",
        province: "",
        country: "",
        contactPerson: "",
        phone: "",
        email: "",
        pec: "",
        notes: "",
    });

    const handleShow = () => {
        setShow(true);
        setSuccessMsg(null);
        setErrorMsg(null);
    };

    const handleClose = () => {
        setShow(false);
        setSuccessMsg(null);
        setErrorMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        console.log("Dati inviati:", formData);
        try {
            const response = await fetchWithAuth("/api/suppliers", "POST", formData);
            console.log("Risposta dal server:", response);
            setSuccessMsg("Fornitore aggiunto con successo!");
            onSupplierAdded("Fornitore aggiunto con successo!", true);
            // Resetta il form
            setFormData({
                name: "",
                piva: "",
                address: "",
                zipCode: "",
                city: "",
                province: "",
                country: "",
                contactPerson: "",
                phone: "",
                email: "",
                pec: "",
                notes: "",
            });
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (error: unknown) {
            console.error("Errore nell'aggiunta del fornitore", error);
            let errorMessage = "Errore nell'aggiunta del fornitore";
            let errorCode: number | null = null;

            // Se l'errore è di tipo APIError (ha una proprietà status)
            if (error && typeof error === "object" && "status" in error) {
                const apiError = error as APIError;
                errorCode = apiError.status;
                errorMessage = apiError.details || apiError.error || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            if (errorCode !== null) {
                errorMessage = `${errorCode} - ${errorMessage}`;
            }

            setErrorMsg(errorMessage);
            onSupplierAdded(errorMessage, false);
            // NON chiudiamo il modal in caso di errore, così l'utente può correggere i campi e riprovare
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        // Se è presente un messaggio d'errore, lo resettiamo quando l'utente modifica i campi
        if (errorMsg) {
            setErrorMsg(null);
        }
    };

    return (
        <>
            <Button variant="success" size="sm" className="ms-2" onClick={handleShow}>
                <FaPlus/> Aggiungi Fornitore
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Fornitore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMsg && <Alert variant="success">{successMsg}</Alert>}
                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Prima riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Nome Azienda</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>P.IVA</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="piva"
                                        value={formData.piva}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Seconda riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Indirizzo</Form.Label>
                                    <Form.Control type="text" name="address" value={formData.address}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Città</Form.Label>
                                    <Form.Control type="text" name="city" value={formData.city}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Terza riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control type="text" name="province" value={formData.province}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Paese</Form.Label>
                                    <Form.Control type="text" name="country" value={formData.country}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Quarta riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>C.Postale</Form.Label>
                                    <Form.Control type="text" name="zipCode" value={formData.zipCode}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Contatto di Riferimento</Form.Label>
                                    <Form.Control type="text" name="contactPerson" value={formData.contactPerson}
                                                  onChange={handleChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Quinta riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Num. Telefono</Form.Label>
                                    <Form.Control type="text" name="phone" value={formData.phone}
                                                  onChange={handleChange} required/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" value={formData.email}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Sesta riga */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Pec</Form.Label>
                                    <Form.Control type="text" name="pec" value={formData.pec} onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control type="text" name="notes" value={formData.notes}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">Aggiungi</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddSupplierModal;