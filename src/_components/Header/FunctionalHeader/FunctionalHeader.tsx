"use client";

import Link from "next/link";
import Image from "next/image";
import "./FunctionalHeader.css";
import { useEffect, useState } from "react";
import { useCart } from "@redux/hooks";
import { Minicart } from "@components/Header/FunctionalHeader/Minicart/Minicart";
import { useAppSelector } from "../../../app/redux/store";
import axiosPrivate from "../../../config/axiosPrivate";
import axiosInstance from "../../../config/axios";

type Product = {
  id: number;
  slug: string;
  name: string;
};

const FunctionalHeader: React.FC = () => {
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [isMinicartOpen, setIsMinicartOpen] = useState<boolean>(false);
  const [favoritesAmount, setFavoritesAmount] = useState<number>(0);
  const [isMiniCartOpen, setMiniCartOpen] = useState<boolean>(false);
  const [isBasketPopping, setBasketPopping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const fetchSearchResults = async (productName) => {
    try {
      const { data } = await axiosInstance.get(
        `/products/list?name=${productName}`
      );
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleMiniCartToggle = () => {
    setMiniCartOpen((prev) => !prev);
  };

  const overallSum = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const totalProductAmount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const uniqueProductIds = new Set(cart.map((product) => product.id));
  const uniqueTotalProductAmount = uniqueProductIds.size;

  useEffect(() => {
    setBasketPopping(true);
    setTimeout(() => {
      setBasketPopping(false);
    }, 500);
  }, [totalProductAmount]);

  useEffect(() => {
    // setLoading(true);
    if (isAuth) {
      const token = localStorage.getItem("accessToken");
      axiosPrivate
        .get("/wishlists/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFavoritesAmount(response.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    setMiniCartOpen(false);
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 1) {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    let timeoutId = null;

    function handleClickOutside(event) {
      if (event.target.closest(".search-component")) return;

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setDropdownVisible(false);
      }, 1000);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const stickyClassName = isHeaderSticky ? "stickyClassName" : "";

  const handleMinicart = (event) => {
    event.stopPropagation();
    setIsMinicartOpen(!isMinicartOpen);
  };

  return (
    // stickyClassName
    <div
      className={`${stickyClassName} functioanlHeader bg-[#196b3e] h-[90px]`}
    >
      <div className="container flex flex-row items-center justify-between functioanlHeader_wrapper">
        <Link href="/" passHref className="w-[20%] mr-[15px]">
          <Image
            priority
            width={0}
            height={0}
            sizes="100vw"
            src="/logo.png"
            alt="Hyper Titan logo"
            className="w-full h-auto"
          />
        </Link>
        <form className="form relative w-[60%]" name="searchForm">
          <input
            className="w-full p-[12px_35px_12px_60px] block rounded-[6px] transition-all ease-in-out duration-300 font-normal text-gray-900 placeholder-slate-700 dark:text-slate-100 dark:placeholder-slate-200 focus:outline-none focus:shadow-[0_0_5px_3px_rgba(0,0,0,0.5)] focus:transition-all focus:duration-200 focus:ease-in-out"
            type="search"
            name="searchbar"
            placeholder="Axtar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDropdownVisible(e.target.value !== "");
            }}
          />
          {isDropdownVisible && searchTerm.length > 1 && (
            <div className="search-dropdown w-full max-h-[400px] overflow-y-auto border border-[#ccc] shadow-[0_4px_8px_#0000001A] rounded-[4px] absolute top-full z-[1000] bg-white">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    href={`/products/detail/${product.slug}`}
                    key={product.id}
                    className="search-item block p-[10px_16px] text-[#333] no-underline transition-colors duration-200 ease-in-out hover:bg-[#dcdcdc]"
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <div className="no-results p-[10px_16px] text-center text-[#717171]">
                  Məhsul tapılmadı
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            name="Search button"
            aria-label="Search Products"
            title="Search Products"
            className="bg-transparent border-none cursor-pointer inline-block text-[20px] absolute top-0 left-0 p-[15px_20px] z-2"
          >
            <svg
              className="text-gray-900 dark:text-slate-100 w-[20px] h-[20px] object-cover"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </button>
        </form>
        <div className="functional-icons flex flex-row justify-between items-center relative ml-[1em]">
          <Minicart isOpen={isMiniCartOpen} onClose={handleMiniCartToggle} />

          {/* <Link passHref href="/compare" className="relative icon-wrapper">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.01 2c-1.93 0-3.5 1.57-3.5 3.5 0 1.58 1.06 2.903 2.5 3.337v7.16c-.001.179.027 1.781 1.174 2.931C6.892 19.64 7.84 20 9 20v2l4-3-4-3v2c-1.823 0-1.984-1.534-1.99-2V8.837c1.44-.434 2.5-1.757 2.5-3.337 0-1.93-1.571-3.5-3.5-3.5zm0 5c-.827 0-1.5-.673-1.5-1.5S5.183 4 6.01 4s1.5.673 1.5 1.5S6.837 7 6.01 7zm13 8.163V7.997C19.005 6.391 17.933 4 15 4V2l-4 3 4 3V6c1.829 0 2.001 1.539 2.01 2v7.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337zm-1 4.837c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z"></path>
            </svg>
            <span className="badge absolute top-[-3px] right-[-8px] rounded-full bg-[#0bbd0b] text-white w-[10px] h-[10px] flex items-center justify-center text-[14px] p-[10px]">0</span>
          </Link> */}

          {isAuth && (
            <Link passHref href="/favorites" className="relative icon-wrapper">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
              </svg>
              <span className="badge absolute top-[-3px] right-[-8px] rounded-full bg-[#0bbd0b] text-white w-[10px] h-[10px] flex items-center justify-center text-[14px] p-[10px]">
                {favoritesAmount}
              </span>
            </Link>
          )}

          <button
            onClick={handleMiniCartToggle}
            className="relative flex flex-row items-center justify-between icon-wrapper cart"
          >
            <div
              className={`basket-wrapper relative ${
                isBasketPopping && "pop-animation"
              }`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                // className={isBasketPopping && "pop-animation"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
              </svg>
              <span className="badge basket absolute top-[-2px] right-[-4px] rounded-full bg-[#0bbd0b] text-white w-[10px] h-[10px] flex items-center justify-center text-[14px] p-[10px] ">
                {uniqueTotalProductAmount}
              </span>
            </div>
            <div className="cart_numbers">
              {/* first number must be amount of products(how many different products on the bucket),
                            second number must be the total amount for all of them */}
              {/* <span>{totalProductAmount}</span> */}
              <span>/</span>
              <span>{overallSum} ₼</span>
            </div>
          </button>

          {isAuth ? (
            <div className="relative icon-wrapper linkToAccount">
              <Link href="/profile/account-details">Profil</Link>
            </div>
          ) : (
            <div className="relative icon-wrapper linkToAccount">
              <Link href="/account">Daxil ol</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionalHeader;
