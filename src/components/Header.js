import Link from "next/link";
import useCart from "@/hooks/useCart";
export default function Header() {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, { qty }) => sum + qty, 0);
  return (
    <header className="bg-indigo-500">
      <div className="max-w-screen-md mx-auto p-2 px-4 flex justify-between items-center pb-3">
        <Link href="/">
          <a className="logo">
            <p className="font-bold text-white text-4xl">eReduxShop</p>
          </a>
        </Link>

        <div className="right">
          <Link href="/cart">
            <a className="cart relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <div className="absolute top-0">
                <div className="w-5 h-5 bg-white text-xs flex items-center justify-center rounded-full ml-5 -mt-2">
                  <p>{totalQty}</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
