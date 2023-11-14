"use client";

import backToTopStyles from "./BackToTop.module.css";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 350) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <div
        onClick={scrollToTop}
        className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-300 dark:to-slate-50 p-[6px] w-[40px] h-[40px] flex justify-center items-center fixed right-[52px] bottom-[50px] cursor-pointer transition-all duration-200 rounded-[9px] hover:scale-120 hover:transition-all hover:duration-200 ease-in-out"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-white dark:text-black"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          // className="w-full h-full"
        >
          <path d="M12.0001 4.83594L5.79297 11.043L7.20718 12.4573L12.0001 7.66436L16.793 12.4573L18.2072 11.043L12.0001 4.83594ZM12.0001 10.4858L5.79297 16.6929L7.20718 18.1072L12.0001 13.3143L16.793 18.1072L18.2072 16.6929L12.0001 10.4858Z"></path>
        </svg>
        {/* <Image
          width={0}
          height={0}
          sizes="100vw"
          // style={{ width: "100%", height: "auto" }}
          src="/top.svg"
        /> */}
      </div>
    )
  );
};
