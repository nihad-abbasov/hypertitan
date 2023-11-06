"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const NavItem = ({ page }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const pathname = usePathname();

  const linkStyle = "flex items-center h-full rounded-[6px] duration-300";

  const activeStyle =
    linkStyle + " text-black bg-amber-300 dark:text-slate-700";

  return (
    <li
      className={`text-slate-700  dark:text-emerald-100 w-[100%] flex justify-start items-center cursor-pointer flex-wrap mb-[10px] last:mb-0 border-b last:border-none border-black dark:border-white p-[5px] pl-0`}
    >
      <Link
        href={`/categories/${page.id}`}
        passHref
        className={`${
          `/categories/${page.id}` === pathname ? activeStyle : ""
        } px-[5px]`}
      >
        <span>{page.name}</span>
      </Link>
      {page.children.length > 0 && (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="2em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
          className={isClicked ? "rotate-180 transition duration-200" : ""}
          onClick={() => setIsClicked(!isClicked)}
        >
          <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
        </svg>
      )}
      {page?.children?.length > 0 && isClicked && (
        <div id="dropdown" className="w-[100%]">
          <div className="dropdown_wrapper">
            <ul>
              {page.children.map((child, index) => {
                return (
                  <li key={index} className="ml-4">
                    <Link
                      className="text-slate-700 dark:text-slate-100"
                      href={`/categories/${child.id}`}
                    >
                      {child.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};
