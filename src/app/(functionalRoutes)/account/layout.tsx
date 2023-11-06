"use client";

import { useEffect } from "react";
import { useAppSelector } from "../../../app/redux/store";
import { useRouter } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/account");
    } else {
      router.push("/profile/account-details");
    }
  }, [isAuth]);

  return (
    <section className="">
      <div className="">{children}</div>
    </section>
  );
}
