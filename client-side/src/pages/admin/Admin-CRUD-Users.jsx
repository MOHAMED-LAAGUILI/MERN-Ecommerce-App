import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import AdminMenu from "./Admin-Menu";



export default function CrudUsers() {
   
    
      // If the user is not signed in
      const [auth] = useAuth();


 
      if (!auth.user) {
        return <Spinner message={"Must be Logged in to access this ressource"} />;
      } else if (auth.user.isAdmin !== 1) {
        return <Spinner message={"Must be an Admin to access this ressource"} />;
      }

    return (
        <Layout title={"Admin - Users CRUD "}>
   <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4">
          <AdminMenu/>
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="dark:text-gray-100 text-3xl font-semibold text-center mb-6">
            All Users List
          </h1>
          
          
          
          </div>
          </div>
        </Layout>
    );
}

 