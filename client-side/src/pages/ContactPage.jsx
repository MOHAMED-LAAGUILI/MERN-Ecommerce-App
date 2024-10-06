import Layout from "../components/Layout/Layout";

export default function ContactPage() {
  return (
    <Layout title={'Contact us'}>
   <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
      <p className="text-lg mb-4">We would love to hear from you! Whether you have a question, a comment, or just want to say hello, please dont hesitate to reach out.</p>
      <form className="flex flex-col space-y-4">
        <input type="text" placeholder="Name" className="p-2 border border-gray-300 rounded" />
        <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" />
        <textarea placeholder="Message" className="p-2 border border-gray-300 rounded" rows={5} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send Message</button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <ul>
          <li>Phone: 555-555-5555</li>
          <li>Email: [info@example.com](mailto:info@example.com)</li>
          <li>Address: 123 Main St, Anytown, USA 12345</li>
        </ul>
      </div>
    </div>
    </Layout>
  );
}


