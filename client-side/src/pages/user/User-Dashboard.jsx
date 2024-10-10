import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";

export default function UserDashboardPage() {
  // Get the authentication state from context
  const [auth] = useAuth();

  return (
    <>
      {!auth.user ? (
        <Spinner /> // Show spinner if user is not authenticated
      ) : (
        <Layout title="Dashboard - Ecommerce App">
          <h1>Dashboard</h1>
        </Layout>
      )}
    </>
  );
}
