"use client";

import { Contact } from "@components/Contact/Contact";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";

export default function ContactPage() {
  const [contactInfos, setContactInfos] = useState({});

  useEffect(() => {
    axiosInstance("/mainapp/contact/")
      .then((response) => {
        setContactInfos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <Contact contactInfos={contactInfos} />;
}
