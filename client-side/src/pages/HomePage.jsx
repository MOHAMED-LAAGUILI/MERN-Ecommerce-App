import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Home = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Home"}>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
