import { useState, useEffect } from "react";
import axios from "axios";
import { type Product } from "./../types";

// 1. Leemos la variable (Vite usa import.meta.env)
const API_URL = import.meta.env.VITE_API_URL;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 2. La usamos para conectar con tu backend
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load collections. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
