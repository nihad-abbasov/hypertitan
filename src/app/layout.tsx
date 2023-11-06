import "@app/globals.css";

import { poppins } from "@app/_fonts/font";
import Layout from "../_components/Layout/Layout";
// import { Loading } from "@components/Loading/Loading";

export const metadata = {
  title: "Hyper Titan",
  description: "Komputerler ve hisselerinin en ucuz qiymete satisi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning={true} has been added to html tag
    // due to the warning: extra attributes from the server: class,style  (attribute="class" on Themeprovider)

    <html suppressHydrationWarning={true} lang="en">
      <body className={`dark:bg-gray-800 ${poppins.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
