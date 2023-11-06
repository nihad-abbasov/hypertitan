"use client";

import styles from "./ProfileNav.module.css";
import Link from "next/link";
import { useAppDispatch } from "../../app/redux/store";
import { deleteTokens } from "../../app/redux/features/authSlice";
import { useRouter } from "next/navigation";

const operations = [
  { id: 1, name: "Hesab məlumatlarım", url: "/profile/account-details" },
  { id: 2, name: "Sifarişlərim", url: "/profile/my-orders" },
  { id: 3, name: "Ünvanlarım", url: "/profile/my-addresses" },
  { id: 4, name: "İstək siyahısı", url: "/favorites" },
];

export const ProfileNav = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(deleteTokens());
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    router.push("/account");
  };

  return (
    <section id={styles.profile} className="my-[3em]">
      <div className={styles?.profile_wrapper}>
        <h1 className="text-black text-[30px] font-semibold mb-[2em] dark:text-white">
          Profil
        </h1>
        <div className={styles.profile_operations}>
          {operations.map((operation) => {
            return (
              <div key={operation.id} className={styles.single_operation}>
                {/* <h2>{operation.name}</h2> */}
                <Link
                  className="text-black dark:text-white hover:text-white"
                  href={operation.url}
                >
                  {operation.name}
                </Link>
              </div>
            );
          })}
          <div onClick={handleLogout} className={styles.single_operation}>
            <a className="text-black dark:text-white hover:text-white">
              Hesabdan çıxış
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
