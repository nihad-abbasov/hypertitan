"use client";

import { Delivery } from "@components/Delivery/Delivery";
import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";

export default function DeliveryPage() {
  const [deliveryContent, setDeliveryContent] = useState([]);

  useEffect(() => {
    axiosInstance("/mainapp/delivery-payment/")
      .then((response) => {
        setDeliveryContent(response.data.contents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <Delivery deliveryContent={deliveryContent} />;
}
