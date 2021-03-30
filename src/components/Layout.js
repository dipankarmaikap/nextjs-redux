import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="text-gray-800">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
