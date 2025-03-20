import {Table} from "react-bootstrap";
import Header from "../components/Header.tsx";
import AddProductModal from "../components/AddProductModal.tsx";
import useProducts from "../hooks/useProduct.tsx"; // Importa il custom hook

const ProductPage = () => {
    const {products, loading, error, fetchProducts} = useProducts();

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <>
            <Header/>
            <div className="container mt-4">
                <h2>Lista Prodotti</h2>

                {/* Modale per aggiungere un prodotto */}
                <AddProductModal onProductAdded={fetchProducts}/>

                {/* Tabella prodotti */}
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Prezzo Acquisto</th>
                        <th>Prezzo Vendita</th>
                        <th>Quantità</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(products ?? []).map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>€{product.purchasePrice.toFixed(2)}</td>
                            <td>€{product.salePrice.toFixed(2)}</td>
                            <td>{product.stockQuantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ProductPage;