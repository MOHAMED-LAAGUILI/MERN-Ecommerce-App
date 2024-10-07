import Layout from "../components/Layout/Layout";

export default function ContactPage() {
  return (
    <Layout title={'Contact Us'}>
      <div className="mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24 bg-white  dark:bg-gray-900 dark:text-white" style={{ minHeight: "82vh"}}>
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center dark:text-white">
          Get in Touch
        </h1>
        <p className="text-lg mb-6 text-gray-700 text-center dark:text-white">
          We would love to hear from you! Whether you have a question, a comment, or just want to say hello, please dont hesitate to reach out.
        </p>
        <form className="flex flex-col space-y-4 max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Name" 
            className="dark:text-white bg-white dark:bg-gray-700 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="dark:text-white bg-white dark:bg-gray-700 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <textarea 
            placeholder="Message" 
            className="dark:text-white bg-white dark:bg-gray-700 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" 
            rows={5} 
          />
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-200"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 ">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Contact Information</h2>
          <ul className="text-gray-700 dark:text-white">
            <li>Phone: <span className="font-medium">555-555-5555</span></li>
            <li>Email: <span className="font-medium"><a href="mailto:info@example.com">info@example.com</a></span></li>
            <li>Address: <span className="font-medium">123 Main St, Anytown, USA 12345</span></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
