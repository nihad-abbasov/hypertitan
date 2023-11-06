"use client";

import styles from "./Account.module.css";
import { useState } from "react";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

export const Account = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLoginSignupState = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div id={styles.account} className="container text-black dark:text-white">
      {!isRegistered ? (
        <Login />
      ) : (
        <Register handleLoginSignupState={handleLoginSignupState} />
      )}

      <div id={styles.registration_divider}></div>
      <div id={styles.signup_container}>
        <h3>
          {!isRegistered
            ? "Hesabınız yoxdur?"
            : "Artıq bir hesab yaratmısınız?"}
          ?
        </h3>
        <p>
          Bu saytda qeydiyyatdan keçmək sizə sifariş statusunuz və tarixçənizə əlçatanlıq imkanı verir.
          Aşağıdakı məlumatları doldurun və saniyələr ərzində yeni hesabınıza sahib olun.
          Alqı-satqı prosesini daha sürətli və asan hala gətirmək üçün sizdən yalnız lazımi məlumatlar tələb olunur.
        </p>
        <button onClick={handleLoginSignupState}>
          {!isRegistered ? "Qeydiyyat" : "Daxil ol"}
        </button>
        {/* maybe instead of <button> tag, must use <a> tag? */}
      </div>
    </div>
  );
};
