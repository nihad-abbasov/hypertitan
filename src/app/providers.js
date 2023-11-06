"use client";

// import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  // return <>{children}</>;
  // }

  return (
    <ThemeProvider storageKey="theme" attribute="class">
      {children}
    </ThemeProvider>
  );
};
