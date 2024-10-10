import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";

export default function UserOrdersPage() {
  // Get the authentication state from context
  const [auth] = useAuth();

  return (
    <>
      {!auth.user ? (
        <Spinner /> // Show spinner if user is not authenticated
      ) : (
        <Layout title="User - Orders Page">
          <h1>User - Orders Page</h1>
        </Layout>
      )}
    </>
  );
}
