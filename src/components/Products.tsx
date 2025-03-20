import {useEffect, useState} from "react";
import {fetchWithAuth} from "../static/api";

// Definizione del tipo dei prodotti
interface Product {
    id: number;
    name: string;
    category: string;
    purchasePrice: number;
    salePrice: number;
    stockQuantity: number;
}

// Componente per recuperare la lista prodotti
const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchWithAuth<Product[]>("/api/product", "GET");
                setProducts(data);
            } catch (err) {
                setError("Errore nel caricamento dei prodotti");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Se il componente viene usato da un altro componente, restituiamo solo la lista dei prodotti
    return {products, loading, error};
};

export default Products;