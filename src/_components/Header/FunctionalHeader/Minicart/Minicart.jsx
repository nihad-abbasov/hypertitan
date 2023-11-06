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
    <div className={`mini-cart ${isOpen ? "open" : ""}`}>
      <div className="mini-cart-content">
        {cart.length > 0 ? (
          <div className="minicart_wrapper">
            <h2>
              <ul>
                <li>
                  <span>Məhsulun miqdarı:</span>
                  <span>{totalProductAmount}</span>
                </li>
                <li>
                  <span>Ümumi qiymət:</span>
                  <span>${overallSum}</span>
                </li>
              </ul>
            </h2>
            <hr />
            <ul>
              {cart.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={item.id === fadeProductId ? "fade_out" : ""}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      // style={{ width: "100%", height: "auto" }}
                      alt={item.name}
                      src={item?.images[0].image}
                    />
                    <div>
                      <p>{item.name}</p>

                      <span>${item.price}</span>
                    </div>
                    <div>
                      <button onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                      {item.quantity}x
                      <button onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                    </div>
                    <div>
                      <button
                        className="remove_product-btn"
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
            <div className="minicartCartBtns">
              <Link onClick={handleBackdropClick} href="/cart" passHref>
                Səbətə bax
              </Link>
              <Link onClick={handleBackdropClick} href="/order" passHref>
                <span>Sifarişi tamamla</span>
              </Link>
            </div>
          </div>
        ) : (
          <h1 id="no-products">Məhsul tapılmadı</h1>
        )}
      </div>
      {isOpen && <div className="backdrop" onClick={handleBackdropClick} />}
    </div>
  );
};
