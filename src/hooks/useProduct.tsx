import {useEffect, useState} from "react";
import {fetchWithAuth} from "../static/api";

// Definizione del tipo per i prodotti
interface Product {
    id: number
    name: string;
    description: string;
    category: string;
    subcategory: string;
    purchasePrice: number;
    salePrice: number;
    vatRate: number;
    barcode: string;
    weight: number;
    width: number;
    height: number;
    depth: number;
    volume: number;
    stockQuantity: number;
    supplierId: number;
    shopId: number;
    createdAt: string;
    updatedAt: string;
    images: string[];
    tags?: string[];
}

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth<Product[]>("/api/product", "GET");

            if (!Array.isArray(data)) {
                throw new Error("I dati ricevuti non sono un array.");
            }

            setProducts(data); // Salva i prodotti nello stato
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

    return { products, setProducts, loading, error, fetchProducts }; // <== AGGIUNTO setProducts
};


export type {Product};
export default useProducts;