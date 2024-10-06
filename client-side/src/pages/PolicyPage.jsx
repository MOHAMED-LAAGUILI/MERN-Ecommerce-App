import Layout from "../components/Layout/Layout";

export default function PolicyPage() {
  return (
    <Layout title={'Privacy Policy'}>
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8">
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
              <span className="block xl:inline">Our Policies</span>
            </h1>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center lg:grid-cols-3">
              <div className="pt-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Return Policy</h2>
                <p className="mt-2 text-base text-gray-500">
                  We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, you can return your item within [time frame] for a full refund or exchange.
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Please note that all returns must be in their original condition with all tags attached. We reserve the right to refuse any return that does not meet these conditions.
                </p>
              </div>
              <div className="pt-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Shipping Policy</h2>
                <p className="mt-2 text-base text-gray-500">
                  We offer [shipping options] on all orders. Please allow [time frame] for delivery.
                </p>
                <p className="mt-2 text-base text-gray-500">
                  We are not responsible for any delays in delivery caused by [carrier name].
                </p>
              </div>
              <div className="pt-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Payment Policy</h2>
                <p className="mt-2 text-base text-gray-500">
                  We accept [payment methods] as payment for all orders.
                </p>
                <p className="mt-2 text-base text-gray-500">
                  All payments are processed securely through [payment gateway].
                </p>
              </div>
              <div className="pt-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Privacy Policy</h2>
                <p className="mt-2 text-base text-gray-500">
                  We are committed to protecting your personal information. We will never share your information with any third party without your consent.
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Please see our full privacy policy for more information.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </Layout>
  )
}


