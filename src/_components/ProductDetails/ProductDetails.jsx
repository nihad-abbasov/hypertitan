"use client";

import Image from "next/image";
import "./ProductDetails.css";

import { useAppDispatch } from "../../app/redux/store";
import { addItem } from "@redux/features/cartSlice";
import { useState } from "react";

export const ProductDetails = ({ product }) => {
  const allProductImages = product?.images.map((img) => {
    return img;
  });

  const finalprod = allProductImages.map((single) => {
    return single.image;
  });
  const [mainImage, setMainImage] = useState(finalprod[0]);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleImageClick = (imgSrc) => {
    setMainImage(imgSrc);
  };

  return (
    <div className="text-black product dark:text-white">

      {finalprod?.length > 1 && (
        <div id="image_gallery">
          <div className="image_gallery_wrapper">
            {finalprod.map((imgSrc, index) => {
              return (
                <Image
                  key={index}
                  src={imgSrc}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  onClick={() => handleImageClick(imgSrc)}
                  alt={product?.name}
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="productImage-container">
        <div className="productImage_wrapper">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src={mainImage}
            alt={product?.name}
          />
        </div>
      </div>

      <div className="productChar-container">
        <h1 className="mb-[10px] font-semibold text-[50px]">{product?.name}</h1>
        <p className="productPrice">
          <span>${product?.old_price}</span> ${product?.price}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: product?.description }}
          className="productChar_text"
        ></p>

        <div className="productBtns">
          {/* onClick={() => handleCount("-")} */}
          {/* <button className="text-white bg-black decreaseBtn dark:text-black dark:bg-white">
            -
          </button> */}
          {/* {productAmount} */}
          {/* <span>1</span> */}
          {/* <button className="text-white bg-black increaseBtn dark:text-black dark:bg-white">
            +
          </button> */}
          {/* onClick={() => handleCount("+")} */}
        </div>
        <button onClick={handleAddToCart} className="flex items-center justify-center product_AddToCartBtn">
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
    </div>
  );
};
