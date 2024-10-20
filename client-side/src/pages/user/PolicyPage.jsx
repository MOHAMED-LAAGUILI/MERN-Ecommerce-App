import { useState } from "react";
import Layout from "../../components/Layout/Layout";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState("return"); // Default active tab

  return (
    <Layout title={"Privacy Policy"}>
      <div className="bg-white  overflow-hidden sm:px-6 ">
        <div
          className="dark:bg-gray-800 relative pt-20 transition-colors duration-500"
          style={{ minHeight: "79.5vh" }}
        >
          <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 mb-10">
            <div className="sm:text-center lg:text-left">
              <h1 className="dark:text-white text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Our Policies</span>
              </h1>
              <br />
              <div className="mt-8">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 ">
                  <button
                    className={`py-2 px-4 font-semibold rounded-lg ${
                      activeTab === "return"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-200 text-gray-700"
                    } hover:bg-indigo-500`}
                    onClick={() => setActiveTab("return")}
                  >
                    Return Policy
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold rounded-lg ${
                      activeTab === "shipping"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-200 text-gray-700"
                    } hover:bg-indigo-500`}
                    onClick={() => setActiveTab("shipping")}
                  >
                    Shipping Policy
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold rounded-lg ${
                      activeTab === "payment"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-200 text-gray-700"
                    } hover:bg-indigo-500`}
                    onClick={() => setActiveTab("payment")}
                  >
                    Payment Policy
                  </button>
                  <button
                    className={`py-2 px-4 font-semibold rounded-lg ${
                      activeTab === "privacy"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-200 text-white-700"
                    } hover:bg-indigo-500`}
                    onClick={() => setActiveTab("privacy")}
                  >
                    Privacy Policy
                  </button>
                </div>

                {/* Tab Content */}
                <div className="pt-6 ">
                  {activeTab === "return" && (
                    <>
                      <h2 className="dark:text-white text-lg leading-6 font-medium text-gray-900">
                        Return Policy
                      </h2>
                      <p className="mt-2 text-base text-gray-500">
                        We want you to be completely satisfied with your
                        purchase. If for any reason you are not satisfied, you
                        can return your item within [time frame] for a full
                        refund or exchange.
                      </p>
                      <p className="mt-2 text-base text-gray-500">
                        Please note that all returns must be in their original
                        condition with all tags attached. We reserve the right
                        to refuse any return that does not meet these
                        conditions.
                      </p>
                    </>
                  )}
                  {activeTab === "shipping" && (
                    <>
                      <h2 className="dark:text-white text-lg leading-6 font-medium text-gray-900">
                        Shipping Policy
                      </h2>
                      <p className="mt-2 text-base text-gray-500">
                        We offer [shipping options] on all orders. Please allow
                        [time frame] for delivery.
                      </p>
                      <p className="mt-2 text-base text-gray-500">
                        We are not responsible for any delays in delivery caused
                        by [carrier name].
                      </p>
                    </>
                  )}
                  {activeTab === "payment" && (
                    <>
                      <h2 className="dark:text-white text-lg leading-6 font-medium text-gray-900">
                        Payment Policy
                      </h2>
                      <p className="mt-2 text-base text-gray-500">
                        We accept [payment methods] as payment for all orders.
                      </p>
                      <p className="mt-2 text-base text-gray-500">
                        All payments are processed securely through [payment
                        gateway].
                      </p>
                    </>
                  )}
                  {activeTab === "privacy" && (
                    <>
                      <h2 className="dark:text-white text-lg leading-6 font-medium text-gray-900">
                        Privacy Policy
                      </h2>
                      <p className="mt-2 text-base text-gray-500">
                        We are committed to protecting your personal
                        information. We will never share your information with
                        any third party without your consent.
                      </p>
                      <p className="mt-2 text-base text-gray-500">
                        Please see our full privacy policy for more information.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
