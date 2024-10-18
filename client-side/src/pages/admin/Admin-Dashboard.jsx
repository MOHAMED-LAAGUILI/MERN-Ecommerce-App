import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import AdminMenu from "./Admin-Menu";
import DashboardCard from "./Admin-Card";

export default function AdminDashboardPage() {
  const [auth] = useAuth();

  return (
    <>
      {!auth.user ? (
        <Spinner />
      ) : (
        <Layout title="Admin Dashboard - Ecommerce App">
          <div className="dark:text-white flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 text-gray-800">
            {/* Admin Menu */}
            <div className="md:w-1/4 p-6 text-black font-bold ">
              <AdminMenu />
            </div>

            {/* Dashboard Content */}
            <div className="md:w-3/4 p-6">
              <div className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl p-8">
                <h1 className="text-3xl font-bold text-gray-100 mb-8">
                <i className="uil uil-comparison"></i> Admin Dashboard
                </h1>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DashboardCard
                    title="Total Products"
                    value="120"
                    icon="uil uil-box"
                    color="bg-gradient-to-r from-indigo-500 to-indigo-600"
                  />
                  <DashboardCard
                    title="Total Orders"
                    value="45"
                    icon="uil uil-shopping-cart"
                    color="bg-gradient-to-r from-green-500 to-green-600"
                  />
                  <DashboardCard
                    title="Total Users"
                    value="250"
                    icon="uil uil-users-alt"
                    color="bg-gradient-to-r from-purple-500 to-purple-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
