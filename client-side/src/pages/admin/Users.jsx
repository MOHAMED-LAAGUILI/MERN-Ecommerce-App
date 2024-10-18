import Layout from "../../components/Layout/Layout";
import {SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


function Users() {
   
    
      // If the user is not signed in
      

    return (
        <Layout title={"All Users"}>

   <div height={"300px"}width={"300px"} >

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
   </div>
 
  
 
        </Layout>
    );
}

export default Users;