"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

// import "@splidejs/splide/css/skyblue";
// import "@splidejs/splide/css/sea-green";
// import "@splidejs/splide/css/core";

export const SplideSlider = ({ options, children }) => {
  const splideRef = useRef(null);

  useEffect(() => {
    if (splideRef.current) {
      new Splide(splideRef.current, options).mount();
    }

    return () => {
      // Cleanup on component unmount
      if (splideRef.current && splideRef.current.splide) {
        splideRef.current.splide.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={splideRef} className="splide">
      <style jsx>{`
        @media screen and (max-width: 990px) {
          .splide__slide {
            width: 30% !important;
            height: 10% !important;
          }
        }

        @media screen and (max-width: 660px) {
          .splide__slide {
            width: 40% !important;
            height: 10% !important;
          }
        }
      `}</style>
      <div className="splide__track">
        <ul className="splide__list">
          {children.map((child, index) => (
            <li key={index} className="splide__slide">
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
