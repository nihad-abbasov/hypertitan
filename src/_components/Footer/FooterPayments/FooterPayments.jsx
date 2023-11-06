"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export const FooterPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://161.97.142.215/payments/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <ul>
      {payments.map((payment) => {
        return (
          <li key={payment.id}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              // style={{ width: "100%", height: "auto" }}
              src={payment.image}
              alt={payment.name}
            />
          </li>
        );
      })}
    </ul>
  );
};
