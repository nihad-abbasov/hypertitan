"use client";

// import favoritesStyles from "./Favorites.module.css"; 
// import { fetchFavorites } from "../../app/redux/features/favoritesSlice";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "../../app/redux/store";
import { ProductCard } from "../ProductList/ProductCard";

const Favorites = ({ favorites }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const fallbackText = isAuth ? (
    <p>Məhsul əlavə olunmayıb.</p>
  ) : (
    <p>
      İstək siyahınızı görmək üçün{" "}
      <Link href="/account" className="font-semibold underline">
        Daxil olun.
      </Link>
    </p>
  );

  return (
    <div
      className="container text-black dark:text-white !my-[3em]"
    >
      {/* <h1>Favorites</h1> */}
      <h1 className="text-4xl font-semibold mb-[2em]">Mənim istək siyahım</h1>
      <div>
        <ul className="grid grid-cols-3">
          {favorites && favorites?.length > 0
            ? favorites?.map((product, index) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                );
              })
            : fallbackText}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
