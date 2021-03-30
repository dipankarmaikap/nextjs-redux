import Layout from "@/components/Layout";
import slugify from "slugify";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import Image from "next/image";

export default function HomePage({ products }) {
  const { cart, addToCart } = useCart();
  return (
    <Layout>
      <div className="max-w-screen-md mx-auto p-4">
        <h1 className="py-4 text-5xl font-bold">Our Products</h1>
        <div className="products space-y-6 mt-4">
          {products &&
            products.map((item) => (
              <article
                key={item.id}
                className="single-product flex flex-wrap sm:flex-nowrap sm:space-x-4 items-center shadow-lg rounded p-4 border"
              >
                <div className="min-w-[150px] max-w-[150px] relative">
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
    </Layout>
  );
}
export async function getStaticProps() {
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
  return {
    props: { products }, // will be passed to the page component as props
  };
}
