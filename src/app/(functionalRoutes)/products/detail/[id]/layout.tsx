// import "./pageStyles.css"

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="pages">
      <div className="container pages_wrapper">{children}</div>
    </section>
  );
}
