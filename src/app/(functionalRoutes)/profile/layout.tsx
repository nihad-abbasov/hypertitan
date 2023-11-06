"use client";

import { ProfileNav } from "@components/Profile/ProfileNav";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
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
    <section className="my-[3em] container">
      <div className="flex flex-row items-center justify-between">
        <ProfileNav />
        {children}
      </div>
    </section>
  );
}
