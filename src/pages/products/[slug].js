import { useState } from "react";
import Layout from "@/components/Layout";
import slugify from "slugify";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import Image from "next/image";
export default function SingleProductPage({ product, products }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id != product.id
  );
  //console.log(product);
  return (
    <Layout>
      <div className="max-w-screen-md mx-auto p-4 text-gray-800">
        <article className="mt-8 flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 sm:space-x-4 items-center">
          <div className="image w-full sm:w-1/2 ">
            <Image
              className="w-full h-full object-contain"
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
            />
          </div>
          <div className="details w-full sm:w-1/2">
            <h1 className="font-bold text-3xl sm:text-4xl">{product.title}</h1>
            <p className="py-4">{product.description}</p>
            <div className="qty flex space-x-2 items-center pt-4 pb-8">
              <div className="border min-w-[40px] flex items-center justify-center p-1.5">
                {qty}
              </div>
              <div className="controller flex flex-col">
                <button
                  className="hover:bg-gray-300"
                  onClick={() => setQty(qty + 1)}
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
                  className={` ${
                    qty <= 1 ? "text-gray-300" : "hover:bg-gray-300"
                  }`}
                  disabled={qty <= 1}
                  onClick={() => setQty(qty - 1)}
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
            <button
              aria-label="Add item to cart"
              className="bg-indigo-500 text-white rounded min-w-[100px] py-1"
              onClick={() =>
                addToCart({
                  ...product,
                  qty,
                })
              }
            >
              Add To Cart
            </button>
          </div>
        </article>
        <div className="related-products mt-16">
          <h2 className="font-bold text-3xl sm:text-4xl">Related Products</h2>
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {relatedProducts.map((item) => (
              <article
                key={item.id}
                className="single-product shadow border p-4"
              >
                <div className="min-w-[150px] max-w-[150px]">
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
                      <h2 className="font-bold text-2xl hover:underline">
                        {item.title}
                      </h2>
                    </a>
                  </Link>

                  <p className="line-clamp-2 my-2">{item.description}</p>
                  <p className="font-bold text-2xl">${item.price}</p>
                  <div className="flex mt-3">
                    <button
                      aria-label="Add item to cart"
                      className="bg-indigo-500 text-white rounded min-w-[100px] py-1"
                      onClick={() =>
                        addToCart({
                          ...item,
                          qty: 1,
                        })
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const rawProducts = await res.json();
  const paths = rawProducts.map((product) => ({
    params: {
      slug: slugify(product.title, {
        replacement: "-",
        remove: /[*+~.,()'"!:@]/g,
        lower: true,
      }),
      id: product.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const res = await fetch("https://fakestoreapi.com/products");
  const rawProducts = await res.json();
  const products = rawProducts.map((product) => ({
    ...product,
    slug: slugify(product.title, {
      replacement: "-",
      remove: /[*+~.,()'"!:@]/g,
      lower: true,
    }),
  }));
  const product = products.find((element) => element.slug === params.slug);
  return {
    props: {
      product,
      products,
    }, // will be passed to the page component as props
  };
}
