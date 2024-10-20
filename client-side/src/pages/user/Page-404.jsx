import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Page404() {
  return (
    <Layout title={"404 | Not Found"}>
      <div
        className="flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-500 text-white pt-10"
        style={{}}
      >
        <div className="text-center max-w-lg mx-auto p-5">
          {/* Lottie Animation */}
          <div className="w-full flex justify-center mb-8">
            <div className="max-w-xs w-full">
              <DotLottieReact
                src="/src/assets/lottie/404.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* 404 Heading */}
          <h1 className="text-8xl font-extrabold mb-4 text-gray-600 dark:text-gray-300">
            404
          </h1>

          {/* Error Message */}
          <p className="text-2xl font-light mb-6 text-gray-600 dark:text-gray-300">
            Oops! The page youre looking for doesnt exist.
          </p>

          {/* Back to Homepage Button */}
          <Link
            to="/"
            className="inline-block px-8 py-4 text-lg font-medium bg-indigo-700 hover:bg-indigo-800 transition-colors rounded-full shadow-lg"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
}
