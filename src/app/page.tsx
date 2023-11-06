"use client";

import { NewProducts } from "../_components/NewProducts/NewProducts";
import { ProductList } from "../_components/ProductList/ProductList";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceSort, setPriceSort] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      axiosInstance("/products/list", {
        params: {
          price_min: priceRange.min,
          price_max: priceRange.max,
        },
      })
        .then((response) => {
          setProducts(response.data?.results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const timeOutId = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [priceRange.min, priceRange.max]);

  return (
    <main className="container flex flex-col items-center justify-between min-h-screen p-12 text-white">
      <ProductList
        products={products}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        loading={loading}
      />
      {/* <NewProducts /> */}
    </main>
  );
}
