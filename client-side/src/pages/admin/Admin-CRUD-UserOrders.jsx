import Layout from "../../components/Layout/Layout";
import SpinnerRedirect from "../../components/SpinnerRedirect";
import { useAuth } from "../../context/auth";
import AdminMenu from "./Admin-Menu";


export default function CrudOrdrs() {
   
    
  const [auth] = useAuth();


 
  if(!auth.user) {
    return <SpinnerRedirect message={"⚠️UnAuthorized ‼️ ⛔ Access denied ❌ Must be Logged in to access this resource"} />;
  } else if(auth.user.isAdmin !== 1) {
    return <SpinnerRedirect message={"⚠️UnAuthorized ‼️ this is an Admin resource.⛔ Access denied ❌"} />;
  }

    return (
        <Layout title={"Admin - Orders CRUD"}>

  <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4">
          <AdminMenu/>
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="dark:text-gray-100 text-3xl font-semibold text-center mb-6">
            All Orders List
          </h1>
          
          
          
          </div>
          </div>
  
 
        </Layout>
    );
}

