// import styles from "./pageStyles.module.css";

// export const metadata = {
//   title: "Hyper Titan",
//   description: "Komputerler ve hisselerinin en ucuz qiymete satisi",
//   icons: {
//     icon: "../favicon.ico",
//   },
// };

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="my-[3em]">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="container flex flex-row items-start">
        {/* <Sidebar /> */}
        {children}
      </div>
    </section>
  );
}
