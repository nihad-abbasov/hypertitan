"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cartStyles from "./Cart.module.css";

import { useCart } from "@redux/hooks";
import { useAppDispatch, useAppSelector } from "../../app/redux/store";
import {
  addItem,
  removeItem,
  removeQuantity,
  increaseQuantity,
} from "@redux/features/cartSlice";

export const Cart = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/order");
  };

  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [fadeProductId, setFadeProductId] = useState(null);

  const handleBackdropClick = () => {
    onClose();
  };

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

  const singleProductTotalPrice = (a, b) => {
    return a * b;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const overallSum = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // const totalProductAmount = cart.reduce((total, item) => {
  //   return total + item.quantity;
  // }, 0);

  const uniqueProductIds = new Set(cart.map((product) => product.id));
  const totalProductAmount = uniqueProductIds.size;

  return (
    <div className="container text-black dark:text-white my-[2em]">
      <h1 className="text-[40px] font-semibold my-[1em] text-center">Səbət</h1>
      {cart.length > 0 ? (
        <div className="flex flex-row items-start justify-between rounded-[8px] p-[25px]">
          <style jsx>{`
            table td,
            table th {
              text-align: center !important;
              padding: 15px 0;
            }
          `}</style>
          <table className="w-[72%] block" style={{ borderSpacing: '10px 10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="w-[5%] py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">
                  <span className="hidden">Səbətdən sil</span>
                </th>
                <th className="w-[20%] py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">
                  <span className="hidden">Məhsulun şəkili</span>
                </th>
                <th className="w-[30%] !text-left py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">Məhsul</th>
                <th className="w-[10%] py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">Qiymət</th>
                <th className="w-[20%] py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">Miqdar</th>
                <th className="w-[15%] py-[20px] px-[10px] uppercase text-[16px] font-semibold border-b-2 border-[#494949]">Ümumi</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className={`${
                      product.id === fadeProductId ? cartStyles.fade_out : ""
                    } border-b border-[#888888] last:border-0`}
                  >
                    <td className="w-[5%]">
                      <button
                        className={cartStyles.remove}
                        aria-label="Buradan sil"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        ×
                      </button>
                    </td>

                    <td className="w-[20%]">
                      <Link href="#">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "50%", height: "auto" }}
                          src={product?.images[0].image}
                          className=""
                          alt={product.name}
                        />
                      </Link>
                    </td>

                    <td className="w-[30%] !text-left" data-title="Məhsul">
                      <Link href="#">{product.name}</Link>
                    </td>

                    <td className="w-[10%]" data-title="Qiymət">
                      <span className={cartStyles.amount}>
                        <bdi>
                          {product.price}
                          <span className={cartStyles.currencySymbol}>₼</span>
                        </bdi>
                      </span>
                    </td>

                    <td className="w-[20%]" data-title="Say">
                      <div className="flex flex-row items-center justify-center quantity">
                        <button
                          className="text-black dark:text-white text-center h-full cursor-pointer w-[40px] border border-black p-[5px] outline-none"
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          -
                        </button>

                        <label className="hidden" htmlFor={product.id}>
                          {/* {product.name} */}
                        </label>
                      
                        <input
                          type="number"
                          id={product.id}
                          className={`${cartStyles.quantity} outline-none input-text qty text bg-zinc-200 dark:bg-gray-600 dark:text-white px-[10px] py-[5px] text-center active:bg-[#494949] active:text-white w-[20%] border border-black`}
                          title="Qty"
                          min="0"
                          max="5"
                          name="quantity"
                          step="1"
                          inputMode="numeric"
                          autoComplete="off"
                          value={product.quantity}
                          onChange={handleQuantityChange}
                        />
                        <button
                          className="text-black dark:text-white text-center h-full cursor-pointer w-[40px] border border-black p-[5px] outline-none active:bg-[#494949] active:text-white"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="w-[15%]" data-title="Ümumi">
                      <span className={cartStyles.amount}>
                        <bdi>
                          {singleProductTotalPrice(
                            product.quantity,
                            product.price
                          )}
                          <span className={cartStyles.currencySymbol}> ₼</span>
                        </bdi>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <aside className="w-[25%] border border-gray-300 rounded-[6px] p-[30px] sticky top-[10%] transform translate-y-[20px]">
            <div className={cartStyles.aside_wrapper}>
              {/* <h3 className="mb-[10px]">Total</h3> */}
              <p className="flex flex-row items-center justify-between mb-[20px]">
                <span>Məhsul miqdarı</span>
                <span>{totalProductAmount}</span>
              </p>
              <p className="flex flex-row items-center justify-between mb-[20px]">
                <span>Toplam qiymət</span>
                <span>{overallSum} ₼</span>
              </p>
              <button
                style={{ backgroundColor: "rgb(0, 155, 0)" }}
                className="w-full text-center text-white rounded-[4px] py-[10px] transition-all ease duration-300"
                onClick={handleClick}
              >
                Sifarişi rəsmiləşdir
              </button>
            </div>
          </aside>
        </div>
      ) : (
        <h5 className="text-[30px] font-normal my-[2em]">
          Səbətdə məhsul yoxdur
        </h5>
      )}
    </div>
  );
};
