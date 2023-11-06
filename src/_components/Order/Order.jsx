"use client";

import orderStyles from "./Order.module.css";
import { useState } from "react";

import { useCart } from "@redux/hooks";
import { useAppDispatch, useAppSelector } from "../../app/redux/store";

export const Order = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckWarning, setShowCheckWarning] = useState(false);

  const { cart, addProductToCart, removeProductFromCart } = useCart();

  const warningMessage = "Agree the privacy policy to submit";

  const overallSum = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isChecked) {
      alert("Form submitted successfully!");
      window.location.reload();
      // TO-DO: Need to clear products on the lsit after submit
    } else {
      alert("Please agree to the terms and conditions.");
      setShowCheckWarning(true);
    }
  };

  return (
    <div
      id={orderStyles.order}
      className="container text-black dark:text-white"
    >
      <h1>Sifarişi rəsmiləşdir</h1>
      <div className={orderStyles.order_wrapper}>
        <div className={orderStyles.order_wrapper_container}>
          <form id={orderStyles.customer_details}>
            <h3>Çatdırılma məlumatları</h3>
            <div className={orderStyles.customer_fullname}>
              <div className={orderStyles.input_holder}>
                <label htmlFor="name">Ad</label>
                <input
                  className="border-[1px] border-gray-500"
                  placeholder="Abbas"
                  required
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className={orderStyles.input_holder}>
                <label htmlFor="surname">Soyad</label>
                <input
                  className="border-[1px] border-gray-500"
                  placeholder="Abbasov"
                  required
                  type="text"
                  name="surname"
                  id="surname"
                />
              </div>
            </div>
            <div className={orderStyles.input_holder}>
              <label htmlFor="address">Ünvan</label>
              <input
                className="border-[1px] border-gray-500"
                placeholder="Yasamal, Elçin İsmayılov küçəsi"
                required
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div className={orderStyles.input_holder}>
              <label htmlFor="number">Nömrə</label>
              <input
                required
                className="border-[1px] border-gray-500"
                type="number"
                placeholder="012 345 67 89"
                name="number"
                id="number"
              />
            </div>
            <div className={orderStyles.input_holder}>
              <label htmlFor="email">Email</label>
              <input
                placeholder="mail@gmail.com"
                required
                className="border-[1px] border-gray-500"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className={orderStyles.input_holder}>
              <label id={orderStyles.notes_label} htmlFor="notes">
                Qeydləriniz
              </label>
              <textarea
                placeholder="Mesajınızı burada yazın (İstəyə görə)"
                name="notes"
                id="notes"
                cols="30"
                rows="5"
                className="border-[1px] border-gray-500"
              ></textarea>
            </div>
          </form>
          <div className={orderStyles.finish_order}>
            <div className={orderStyles.finish_order_inner}>
              <h2>Sifariş siyahısı</h2>
              <div className={orderStyles.ordered_products_list}>
                <ul>
                  <li>
                    <span>Məhsul</span>
                    <span>Qiymət</span>
                  </li>
                  {cart.length > 0 ? (
                    cart?.map((prod) => {
                      return (
                        <li key={prod.id}>
                          <span>
                            {prod.name} &nbsp;
                            <span
                              dangerouslySetInnerHTML={{
                                __html: prod.description,
                              }}
                            />
                            {/* -{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: prod.description,
                              }}
                            ></span> */}
                          </span>
                          <span>
                            ({prod.quantity}x) {prod.price} ₼
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <p className="mt-[10px]">Məhsul tapılmadı</p>
                  )}
                </ul>
                {cart.length > 0 && (
                  <li className="flex flex-row items-center justify-between list-none my-[1em] py-[5px] px-[10px] rounded-sm">
                    <span>
                      <h3>Ümumi qiymət:</h3>
                    </span>
                    <span>
                      <h3>{overallSum} ₼</h3>
                    </span>
                  </li>
                )}
              </div>
              {/* <div className={orderStyles.payment_details}>
                <h6>Pay at the door.</h6>
                <p>Pay cash on delivery.</p>
              </div> */}
              <p className={orderStyles.privacy_text}>
                Şəxsi məlumatlarınız sifarişinizi həyata keçirmək, bu
                veb-saytdakı təcrübənizi dəstəkləmək və saytımızın{" "}
                <a target="_blank" href="/privacy">
                  gizlilik siyasətində
                </a>{" "}
                təsvir olunan digər məqsədlər üçün istifadə ediləcək.
              </p>
              <form onSubmit={handleSubmit}>
                <label className={orderStyles.agree_label} htmlFor="agree">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    name=""
                    id={orderStyles.agree}
                  />
                  <span>Mən şərtləri oxudum və razılaşdım.</span>
                </label>
                {showCheckWarning && <p>{warningMessage}</p>}
                <button disabled={!isChecked}>Sifarişi tamamla</button>
                {/* Button logic needs workaround */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
