"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Loading } from "../../_components/Loading/Loading";
import "./Product.css";
import styles from "./pageStyles.module.css";
import { usePathname } from "next/navigation";
import { PriceSort } from "./Filters/PriceSort";
import { PriceFilter } from "./Filters/PriceFilter";
import axiosInstance from "../../config/axios";
import Navbar from "./Navbar/Navbar";

export const ProductList = ({
  products,
  loading,
  priceSort,
  setPriceSort,
  priceRange,
  setPriceRange,
}) => {
  const pathname = usePathname();

  let sortedProducts = products && Array.isArray(products) ? [...products] : [];

  if (priceSort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }


  const pageHeading =
    pathname === "/" ? "HyperTitan Shop" : products?.[0]?.category?.name;

  return (
    <div
      className={`${styles.product_list} flex flex-row flex-wrap justify-between items-start`}
    >
      <h1 className="font-semibold text-black dark:text-white w-[100%]">
        {pageHeading}
      </h1>

      {/* {sortedProducts.length >= 2 && ( */}
      {/* <section className="flex flex-row items-center justify-start filters_wrapper my-[2em]">
        <PriceSort setPriceSort={setPriceSort} />

        <PriceFilter
          min={0}
          max={5000}
          onPriceChange={setPriceRange}
          currentRange={priceRange}
        />
      </section> */}
      {/* )} */}

      <Navbar />

      <ul id="product_list" className="w-[78%] grid-cols-4">
        {loading ? (
          <Loading />
        ) : products && Array.isArray(products) && products.length > 0 ? (
          sortedProducts.map((product, index) => (
            <ProductCard key={product.id} index={index} product={product} />
          ))
        ) : (
          <h3 className="text-black dark:text-white">Məhsul tapılmadı</h3>
        )}
      </ul>
    </div>
  );
};
