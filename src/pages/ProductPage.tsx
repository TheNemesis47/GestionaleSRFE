import AddProductModal from "../components/AddProductModal.tsx";
import useProducts from "../hooks/useProduct.tsx";
import ProductTable from "../components/ProductTable.tsx";
import Header from "../components/Header.tsx"; // Importa il custom hook

const ProductPage = () => {
    const { products, setProducts, loading, fetchProducts } = useProducts();

    if (loading) return <p>Caricamento in corso...</p>;

    return (
        <>
            <Header/>
            <div className="container mt-4">
                <h2>Lista Prodotti</h2>
                <AddProductModal onProductAdded={fetchProducts} />
                <ProductTable products={products} setProducts={setProducts} />
            </div>
        </>
    );
};

export default ProductPage;