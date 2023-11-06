"use client";

import { ProductDetails } from "@components/ProductDetails/ProductDetails";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../../config/axios";
import { Loading } from "@components/Loading/Loading";

export default function Page({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance(`/products/detail/${params.id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  if (!product && !loading) {
    return <h1>Something went wrong</h1>;
  }

  if (product && !loading) {
    return <ProductDetails product={product} />;
  }

  return <Loading />;
}
