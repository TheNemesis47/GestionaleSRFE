import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { fetchWithAuth } from "../static/api";
import AddSupplierModal from "./AddSupplierModal";
import ImageUploader from "./ImageUploader";

interface AddProductModalProps {
    onProductAdded: () => void;
}

const AddProductModal = ({ onProductAdded }: AddProductModalProps) => {
    const [show, setShow] = useState(false);
    const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [supplierMsg, setSupplierMsg] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const [formData, setFormData] = useState<Record<string, string>>({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        purchasePrice: "",
        salePrice: "",
        vatRate: "",
        barcode: "",
        weight: "",
        width: "",
        height: "",
        depth: "",
        volume: "",
        stockQuantity: "",
        supplierId: "",
    });

    useEffect(() => {
        fetchSuppliers();
        fetchCategories();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await fetchWithAuth<{ id: number; name: string }[]>("/api/suppliers", "GET");
            setSuppliers(data);
        } catch (error) {
            console.error("Errore nel caricamento dei fornitori", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await fetchWithAuth<{ id: number; name: string }[]>("/api/category", "GET");
            setCategories(data);
        } catch (error) {
            console.error("Errore nel caricamento delle categoria", error);
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSupplierAdded = (msg: string, success: boolean) => {
        setSupplierMsg(msg);
        if (success) {
            fetchSuppliers();
            setFormData((prev) => ({ ...prev, supplierId: "" }));
        }
        setTimeout(() => setSupplierMsg(null), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.supplierId) {
            alert("Seleziona un fornitore valido");
            return;
        }

        const productDTO = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            subcategory: formData.subcategory,
            purchasePrice: parseFloat(formData.purchasePrice) || 0,
            salePrice: parseFloat(formData.salePrice) || 0,
            vatRate: parseFloat(formData.vatRate) || 0,
            barcode: formData.barcode,
            weight: parseFloat(formData.weight) || 0,
            width: parseFloat(formData.width) || 0,
            height: parseFloat(formData.height) || 0,
            depth: parseFloat(formData.depth) || 0,
            volume: parseFloat(formData.volume) || 0,
            stockQuantity: parseInt(formData.stockQuantity, 10) || 0,
            supplierId: parseInt(formData.supplierId, 10),
        };

        const formDataToSend = new FormData();
        const productBlob = new Blob([JSON.stringify(productDTO)], { type: "application/json" });
        formDataToSend.append("product", productBlob);

        selectedImages.forEach((file) => {
            formDataToSend.append("images", file);
        });

        try {
            await fetchWithAuth("/api/product", "POST", formDataToSend);
            onProductAdded();
            handleClose();
        } catch (error) {
            console.error("Errore nell'aggiunta del prodotto", error);
        }
    };

    return (
        <>
            <Button variant="success" className="mb-3" onClick={handleShow}>
                <FaPlus/> Aggiungi Prodotto
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Prodotto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {supplierMsg && <Alert variant="info" className="mt-2">{supplierMsg}</Alert>}

                    <Form id="productForm" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
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
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleziona una Categoria</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Sotto Categoria</Form.Label>
                                    <Form.Select
                                        name="subcategory"
                                        value={formData.subcategory}
                                        onChange={handleChange}

                                    >
                                        <option value="">Seleziona una sotto-categoria</option>
                                        <option value="gaming">Gaming</option>
                                        <option value="ufficio">Ufficio</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Prezzo Acquisto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="purchasePrice"
                                        value={formData.purchasePrice}
                                        onChange={handleChange}

                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Secondo gruppo: Prezzo Vendita e Aliquota IVA */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Prezzo Vendita</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="salePrice"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Aliquota IVA</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="vatRate"
                                        value={formData.vatRate}
                                        onChange={handleChange}

                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Separatore: Misure */}
                        <h5 className="mt-4 mb-2">Misure</h5>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Peso (kg)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Altezza (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Profondità (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="depth"
                                        value={formData.depth}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Volume (cm³)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="volume"
                                        value={formData.volume}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Separatore: Magazzino */}
                        <h5 className="mt-4 mb-2">Magazzino</h5>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Quantità</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Fornitore</Form.Label>
                                    <Form.Select
                                        name="supplierId"
                                        value={formData.supplierId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleziona un fornitore</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Separatore: Descrizione */}
                        <h5 className="mt-4 mb-2">Descrizione</h5>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <ImageUploader selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
                    </Form>

                    <div className="mt-3">
                        <Button variant="primary" type="submit" form="productForm">
                            Aggiungi
                        </Button>
                        <AddSupplierModal onSupplierAdded={handleSupplierAdded} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddProductModal;
