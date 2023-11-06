"use client";

import { Privacy } from "@components/Privacy/Privacy";
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";

export default function PrivacyPage() {
  const [privacyContent, setPrivacyContent] = useState({});

  useEffect(() => {
    axiosInstance("/mainapp/privacy-policy/")
      .then((response) => {
        setPrivacyContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <Privacy privacyContent={privacyContent} />;
}
