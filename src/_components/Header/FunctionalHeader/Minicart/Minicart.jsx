/* "use client" */
import "./Minicart.css";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useCart } from "@redux/hooks";
import { useAppDispatch, useAppSelector } from "../../../../app/redux/store";
import {
  addItem,
  removeItem,
  removeQuantity,
  increaseQuantity,
} from "@redux/features/cartSlice";

export const Minicart = ({ isOpen, onClose }) => {
  // const cart = useAppSelector((state) => state.cart);
  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const [fadeProductId, setFadeProductId] = useState(null);

  const handleBackdropClick = () => {
    onClose();
  };

  const overallSum = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const uniqueProductIds = new Set(cart.map((product) => product.id));
  const totalProductAmount = uniqueProductIds.size;

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (productId) => {
    setFadeProductId(productId);
    setTimeout(() => {
      dispatch(removeItem(productId));
      setFadeProductId(null);
    }, 500);
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(removeQuantity(productId));
  };

  return (
    <div className="mini-cart absolute right-[25%] bottom-[-10px] w-[400px]">
      <div className={`mini-cart-content ${isOpen ? "z-[100] block" : ""}`}>
        {cart.length > 0 ? (
          <div className="minicart_wrapper">
            <h2 className="border-b-2 border-gray-400">
              <ul className="flex flex-col items-center justify-between px-0 py-1">
                <li className="flex flex-row justify-between w-full">
                  <span>Məhsulun miqdarı:</span>
                  <span>{totalProductAmount}</span>
                </li>
                <li className="flex flex-row justify-between w-full">
                  <span>Ümumi qiymət:</span>
                  <span>${overallSum}</span>
                </li>
              </ul>
            </h2>
            <hr />
            <ul className="flex flex-col justify-between mt-2.5 mb-2.5 max-h-[500px] overflow-scroll scroll-smooth">
              {cart.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`flex flex-row justify-between items-center mt-2.5 py-[10px] px-0 first:mt-0 border-b border-lightgray-300 last:border-none ${
                      item.id === fadeProductId
                        ? "opacity-0 transition-opacity duration-500 ease-out"
                        : ""
                    }`}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt={item.name}
                      src={item?.images[0].image}
                      className="w-[20%] h-full"
                    />
                    <div className="flex flex-col justify-between items-start w-[50%] pl-[1em]">
                      <p>{item.name}</p>

                      <span>${item.price}</span>
                    </div>
                    <div className="flex flex-col justify-between items-center w-[10%]">
                      <button className="rounded-sm" onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                      {item.quantity}x
                      <button className="rounded-sm" onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                    </div>
                    <div className="flex flex-col justify-between items-end w-[10%]">
                      <button
                        className="cursor-pointer remove_product-btn"
                        title="Remove product from basket"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <svg
                          stroke="red"
                          fill="red"
                          strokeWidth="0"
                          version="1.1"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-all duration-200 ease-in-out hover:scale-120 hover:transition-all hover:duration-300 hover:ease-in-out"
                        >
                          <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
                          <path d="M10.5 4l-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-row items-center justify-between w-full pt-3 border-t-2 border-gray-400 minicartCartBtns">
              <Link
                onClick={handleBackdropClick}
                href="/cart"
                passHref
                className="w-max rounded-[4px] transition-all duration-200 ease-in-out text-center font-semibold "
              >
                Səbətə bax
              </Link>
              <Link
                onClick={handleBackdropClick}
                href="/order"
                passHref
                className="w-max rounded-[4px] transition-all duration-200 ease-in-out text-center font-semibold relative font-inherit text-[16px] tracking-[0.05em] text-ghostwhite overflow-hidden before:absolute before:inset-0 before:z-0 after:absolute after:inset-0 after:z-0"
                style={{
                  background: "linear-gradient(to right, #16ac2f, #03c000)",
                }}
              >
                <span className="relative z-10 transition-colors duration-400 inline-flex items-center p-2.5 text-white">
                  Sifarişi tamamla
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <h1 className="w-full text-[20px] text-center">
            Məhsul tapılmadı
          </h1>
        )}
      </div>
      {isOpen && (
        <div
          className="backdrop fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-9"
          onClick={handleBackdropClick}
        />
      )}
    </div>
  );
};
