"use client";

import { useState, useEffect } from "react";
import { Loading } from "@components/Loading/Loading";
// import styles from "./pageStyles.module.css";
import axiosInstance from "../../../../config/axios";
import { useRouter } from "next/router";
import { ProductList } from "@components/ProductList/ProductList";

export default function Page({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceSort, setPriceSort] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      axiosInstance(`/products/list?category=${params.slug}`, {
        params: {
          price_min: priceRange.min,
          price_max: priceRange.max,
        },
      })
        .then((response) => {
          setProducts(response.data.results);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
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
  // }, [params.slug]);

  return (
    <ProductList
      priceSort={priceSort}
      setPriceSort={setPriceSort}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      products={products}
      loading={loading}
    />
  );
}
