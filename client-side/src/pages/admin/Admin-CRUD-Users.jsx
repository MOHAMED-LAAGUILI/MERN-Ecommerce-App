import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";



export default function CrudUsers() {
   
    
      // If the user is not signed in
      

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

 