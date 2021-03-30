import React from "react";
import Layout from "@/components/Layout";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
export default function CartPage() {
  const { cart, removeFromCart, adjustItemInCart } = useCart();
  const totalQty = cart.reduce((sum, { qty }) => sum + qty, 0);
  const totalPrice = cart.reduce((sum, { qty, price }) => sum + qty * price, 0);
  return (
    <Layout>
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="py-4 text-5xl font-bold">Cart</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="sm:col-span-2 products space-y-6">
            {cart.length ? (
              cart.map((item) => (
                <article
                  key={item.id}
                  className="single-product flex flex-wrap sm:flex-nowrap sm:space-x-4 items-center shadow-lg rounded p-4 border"
                >
                  <div className="min-w-[70px] max-w-[70px]">
                    <Image
                      className="w-full h-full object-contain"
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="details mt-4 md:mt-0  text-gray-800">
                    <Link href={`/products/${item.slug}`}>
                      <a>
                        <h2 className="font-semibold text-xl hover:underline">
                          {item.title}
                        </h2>
                      </a>
                    </Link>
                    <p className="font-bold text-2xl">${item.price}</p>
                    <div className="qty flex space-x-2 items-center pt-4 pb-8">
                      <div className="border min-w-[40px] flex items-center justify-center p-1.5">
                        {item.qty}
                      </div>
                      <div className="controller flex flex-col">
                        <button
                          className="hover:bg-gray-300"
                          onClick={() =>
                            adjustItemInCart({
                              id: item.id,
                              qty: item.qty + 1,
                            })
                          }
                        >
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                        <button
                          className="hover:bg-gray-300"
                          onClick={() =>
                            adjustItemInCart({
                              id: item.id,
                              qty: item.qty - 1,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex mt-3">
                      <button
                        aria-label="Add item to cart"
                        className="bg-indigo-500 text-white rounded min-w-[100px] py-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="total">
            <div className=" shadow-lg rounded p-4 border">
              <p>Subtotal</p>
              <span>Total:{totalQty}Item</span>
              <div className="text-xl font-semibold">
                Total Price: ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
