import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function Page404() {
  return (
    <Layout title={'404 | Not Found'}>
      <div className="h-screen w-screen bg-white flex items-center">
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-indigo-600 font-extrabold mb-8">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Sorry, we couldnt find the page you are looking for.
            </p>
            <Link 
              to="/" 
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-md text-white transition-all duration-400 border border-transparent rounded-md focus:outline-none bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
            >
              Back to Homepage
            </Link>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <img 
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" 
              alt="Page Not Found" 
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
