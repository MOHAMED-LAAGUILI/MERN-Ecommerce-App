import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";

export default function UserOrdersPage() {
  // Get the authentication state from context
  const [auth] = useAuth();

  if (!auth.user) {
    return <Spinner message={"Must be Logged in to access this ressource"} />;
  } else if (auth.user.isAdmin === 1) {
    return <Spinner message={"Must be an user to access this ressource"} />;
  }
  return (
    <>
      
        <Layout title="User - Orders Page">
          <h1>User - Orders Page</h1>
        </Layout>
      
    </>
  );
}
