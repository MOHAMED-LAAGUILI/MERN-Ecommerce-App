import Layout from "../../components/Layout/Layout";
import AdminMenu from "./Admin-Menu";


export default function CrudOrdrs() {
   
    
      
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

