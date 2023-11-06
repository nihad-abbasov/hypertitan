"use client";

import Link from "next/link";
import footerStyles from "./Footer.module.css";
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
    <footer
      id={footerStyles.footer}
      className="w-full bg-[#1c1b1b] pt-[2em] pb-[1em] mt-[3em]"
    >
      <div className={`container ${footerStyles.footer_container}`}>
        {/* <FooterSwiper /> */}

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

        <div className={footerStyles.footer_info}>
          <Link href="/">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              // style={{ width: "80%", height: "auto" }}
              src="/logo.png"
              alt="Hyper Titan logo"
            />
          </Link>
          <p>Sistem bloku, noutbuk, aksesuarların satışı</p>
          <div className={footerStyles.business_info}>
            <span>Ünvan: Bülbül 75C, Bakı</span>
            <span>Telefon: +994 50 323 19 98</span>
            <span>Faks: hypertitan.business@gmail.com</span>
          </div>
        </div>
        <div className={footerStyles.footer_links}>
          <h3>Linklər</h3>
          <nav>
            <ul>
              <li>
                <Link href="/contact">Əlaqə</Link>
              </li>
              <li>
                <Link href="/privacy">Gizlilik Siyasəti</Link>
              </li>
              <li>
                <Link href="/delivery">
                  {/* Çatdırılma və ödəniş  */}
                  Çatdırılma və ödəniş
                </Link>
              </li>
              <li>
                {isAuth ? (
                  <Link href="/profile/account-details">
                    {/* Hesabım */}
                    Profil
                  </Link>
                ) : (
                  <Link href="/account">
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
        <div className={footerStyles.footer_map_wrapper}>
          <Map width={570} height={300} />
        </div>
        <div className={footerStyles.rightsAndPayment}>
          <p>
            <span>HyperTitan</span> &copy; 2023 Bütün haqqlar qorunur.
            {/*Bütün hüquqlar qorunur*/}.
          </p>

          <FooterPayments />
        </div>
        <a
          href="https://www.creadive.az"
          target="_blank"
          rel="noreferrer"
          id={footerStyles.createdBy}
        >
          <p>
            Created by <span>Creadive 💙</span>
          </p>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "2%", height: "auto" }}
            src="/creadive_logo.svg"
            alt="Creadive Agentliyi"
          />
        </a>
      </div>
      <WhatsappWidget />
    </footer>
  );
};
