"use client"

import { BackToTop } from "@components/BackToTop/BackToTop";
import { SocialLinks } from "@components/SocialLinks/SocialLinks";
import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";
import { Providers } from "@app/providers";
import { Provider } from "react-redux";
import { store } from "../../app/redux/store";
import Auth from "../Auth/Auth";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <Providers>
        <Auth />
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <SocialLinks />
      </Providers>
    </Provider>
  );
};

export default Layout;
