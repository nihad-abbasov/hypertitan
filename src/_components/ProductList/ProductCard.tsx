"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../app/redux/store";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../../app/redux/features/favoritesSlice";
import { addItem } from "../../app/redux/features/cartSlice";
import axiosPrivate from "../../config/axiosPrivate";

type ProductType = {
  id: number;
  slug?: string;
  name?: string;
  old_price?: number;
  price?: number;
  stock?: boolean;
  images?: { image: string }[];
};

type ProductCardProps = {
  product: ProductType;
  index: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, product.id)
  );
  const [favorite, setFavorite] = useState(isFavorite);

  // const selectIsFavorite = (state, productId) => state.favorites.list.some(product => product.id === productId);

  // console.log(product?.images?.[0]?.image);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleButtonClick = async (productId) => {
    try {
      setLoading(true);
      await axiosPrivate.post(
        "/wishlists/add/",
        { product: productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(toggleFavorite(productId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const value = true;

  return (
    <li className="bg-slate-100 card" key={product.id}>
      <Link
        href={`/products/detail/${product?.slug}`}
        id="product_whole_link"
        aria-label="Product Link"
      ></Link>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt={product?.name}
        src={product?.images?.[0]?.image}
        priority={index < 4 && true}
      />
      <h2
        title={product?.name}
        className="w-full py-[5px] px-[15px] text-green-900 text-2xl font-semibold text-center rounded-lg whitespace-nowrap overflow-hidden text-ellipsis z-10"
      >
        {product?.name}
      </h2>

      <span>
        {/* <span
          dangerouslySetInnerHTML={{
            __html: product?.description,
          }}
          className="font-light"
        /> */}
        <p className="font-medium">
          {/* <span className="mr-[5px] line-through">
            {product?.old_price && "$" + product?.old_price}
          </span> */}
          <span>${product?.price}</span>
        </p>
      </span>

      <p className="text-black">{product?.stock && "Stokda var ✅"}</p>

      <div className="flex flex-col items-center justify-between w-full buttons_wrapper">
        <div className="flex flex-row items-center justify-center w-[80%]">
          <Link
            role="button"
            className="seeProduct"
            href={`/products/detail/${product.slug}`}
          >
            <svg
              stroke="currentColor"
              fill="#000"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-[5px]"
            >
              <path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path>
              <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
            </svg>
            <span className="text-sm text-black">Məhsula bax</span>
          </Link>
          {isAuth && (
            <button
              onClick={(e) => handleButtonClick(product.id)}
              className="text-white cursor-pointer py-[5px] px-[10px] rounded-md text-lg border-black z-50"
              title="Add to wishlist"
            >
              <svg
                fill={favorite ? "red" : "none"}
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
                className={`hover:scale-110 hover:transition-all ${
                  favorite ? "animate-pop" : ""
                }`}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  strokeWidth="2px"
                  stroke={!favorite ? "gray" : "none"}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          className="w-[80%] flex items-center justify-center bg-green-600 text-white rounded-lg py-[5px] px-[10px] font-semibold hover:bg-green-800 transition duration-150 z-10 mb-[5px]"
          onClick={handleAddToCart}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="15px"
            viewBox="0 0 256 256"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-[5px]"
          >
            <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
          </svg>
          Səbətə at
        </button>
      </div>
    </li>
  );
};
