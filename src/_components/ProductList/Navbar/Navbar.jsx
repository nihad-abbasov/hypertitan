"use client";

import { NavItem } from "./NavItem";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";
import "./Navbar.css";

const Navbar = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axiosInstance("/products/categories")
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <nav className="w-[20%] border border-black dark:border-white p-[15px] rounded-md sticky top-[12%]">
      <ul>
        {pages?.map((page, index) => (
          <NavItem key={index} page={page} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
