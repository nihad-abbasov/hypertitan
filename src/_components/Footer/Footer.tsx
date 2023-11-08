"use client";

import Link from "next/link";
import { Map } from "./Map/Map";
import Image from "next/image";
import { WhatsappWidget } from "../WhatsappWidget/WhatsappWidget";
import { FooterPayments } from "./FooterPayments/FooterPayments";
import { SplideSlider } from "./SplideSlider/SplideSlider";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { useAppSelector } from "../../app/redux/store";

type Brand = {
  slug: string;
  logo: string;
  name: string;
};

export const Footer = () => {
  const [footerBrands, setFooterBrands] = useState<Brand[]>([]);
  useEffect(() => {
    axiosInstance("/products/brands/")
      .then((response) => {
        setFooterBrands(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sliderOptions = {
    type: "loop",
    perPage: 4,
    perMove: 2,
    focus: "center",
    pagination: false,
    autoplay: true,
    interval: 2000,
    gap: 50,
  };

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <footer className="w-full bg-[#1c1b1b] pt-[2em] pb-[1em] mt-[3em]">
      <div className="container flex flex-row flex-wrap items-center justify-between gap-4">
        <SplideSlider options={sliderOptions}>
          {footerBrands.map((brand, index) => {
            return (
              <Link key={index} href={brand.slug}>
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "90%", height: "100%" }}
                  src={brand.logo}
                  alt={brand.name}
                />
              </Link>
            );
          })}
        </SplideSlider>

        <div className="w-full mb-[2em] md:mb-0 md:w-[40%] lg:w-[31%]">
          <Link href="/">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "60%", height: "auto" }}
              src="/logo.png"
              alt="Hyper Titan logo"
            />
          </Link>
          <p className="mb-5 font-semibold text-white">
            Sistem bloku, noutbuk, aksesuarların satışı
          </p>
          <div className="flex flex-col justify-start">
            <span className="text-white font-extralight">
              Ünvan: Bülbül 75C, Bakı
            </span>
            <span className="text-white font-extralight">
              Telefon: +994 50 323 19 98
            </span>
            <span className="text-white font-extralight">
              Faks: hypertitan.business@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start w-full mb-[2em] md:mb-0 md:w-[40%] lg:w-[21%]">
          <h3 className="mb-5 font-semibold text-white">Linklər</h3>
          <nav className="!p-0">
            <ul className="flex flex-col justify-center !w-full text-white md:w-auto">
              <li className="text-[#005700] transition-all duration-200 ease-in-out mb-[10px] hover:underline hover:opacity-60">
                <Link className="font-light text-white" href="/contact">
                  Əlaqə
                </Link>
              </li>
              <li className="text-[#005700] transition-all duration-200 ease-in-out mb-[10px] hover:underline hover:opacity-60">
                <Link className="font-light text-white" href="/privacy">
                  Gizlilik Siyasəti
                </Link>
              </li>
              <li className="text-[#005700] transition-all duration-200 ease-in-out mb-[10px] hover:underline hover:opacity-60">
                <Link className="font-light text-white" href="/delivery">
                  {/* Çatdırılma və ödəniş  */}
                  Çatdırılma və ödəniş
                </Link>
              </li>
              <li className="text-[#005700] transition-all duration-200 ease-in-out hover:underline hover:opacity-60">
                {isAuth ? (
                  <Link
                    className="font-light text-white"
                    href="/profile/account-details"
                  >
                    {/* Hesabım */}
                    Profil
                  </Link>
                ) : (
                  <Link className="font-light text-white" href="/account">
                    {/* Hesabım */}
                    Mənim Hesabım
                  </Link>
                )}
              </li>
              {/* <li>
                <Link href="/products">Məhsullar</Link>
              </li> */}
            </ul>
          </nav>
        </div>
        <div className="w-full lg:w-[43%]">
          <Map width={570} height={300} />
        </div>
        <div
          className="m-0 md:mt-[2em] py-[15px] w-full flex flex-col-reverse md:flex-row justify-between items-center text-white border-t"
          style={{ borderColor: "rgb(113, 113, 113)" }}
        >
          <p className="text-[14px] font-light w-full md:w-auto text-center md:text-left mt-[10px] md:mt-0">
            <span className="font-semibold color-[#a6fd00]">HyperTitan</span>{" "}
            &copy; 2023 Bütün haqqlar qorunur.
            {/*Bütün hüquqlar qorunur*/}.
          </p>

          <FooterPayments />
        </div>
        <a
          href="https://www.creadive.az"
          target="_blank"
          rel="noreferrer"
          className="pt-[15px] w-full flex flex-row justify-center md:justify-start items-center text-[#a9a9a9] border-t"
          style={{ borderColor: "rgb(113, 113, 113)" }}
        >
          <p>
            Created by <span className="mr-[5px]">Creadive 💙</span>
          </p>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "2%", height: "auto" }}
            src="/creadive_logo.svg"
            alt="Creadive Agentliyi"
            className="ml-[5px]"
          />
        </a>
      </div>
      <WhatsappWidget />
    </footer>
  );
};
