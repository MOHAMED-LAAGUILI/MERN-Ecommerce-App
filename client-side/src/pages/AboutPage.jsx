import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function AboutPage() {
  return (
    <Layout title={"About"}>
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8" style={{ minHeight: "82vh" }}>
        <div className="relative max-w-7xl mx-auto">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  [Your Store Name]
                </span>
              </h1>

              {/* Centering the image */}
              <div className="flex justify-center mt-10">
                <img
                  className="object-cover rounded-full"
                  width="300"
                  height="400"
                  src="./src/assets/images/ecommerceLogo.jpg"
                  alt="Ecommerce Logo"
                />
              </div>

              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Ecommerce is your premier online destination for
                [products/categories]. Our mission is to provide our customers
                with the best possible shopping experience, offering a wide
                range of high-quality products at affordable prices.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
