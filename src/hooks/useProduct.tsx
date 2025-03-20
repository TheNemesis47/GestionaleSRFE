import {useEffect, useState} from "react";
import {fetchWithAuth} from "../static/api";

// Definizione del tipo per i prodotti
interface Product {
    id: number;
    name: string;
    category: string;
    purchasePrice: number;
    salePrice: number;
    stockQuantity: number;
}

// Hook personalizzato per ottenere i prodotti
const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]); // Inizializza come array vuoto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth<Product[]>("/api/product", "GET");

            if (!Array.isArray(data)) {
                throw new Error("I dati ricevuti non sono un array.");
            }

            setProducts(data);
        } catch (err) {
            setError("Errore nel caricamento dei prodotti");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {products, loading, error, fetchProducts};
};

export default useProducts;