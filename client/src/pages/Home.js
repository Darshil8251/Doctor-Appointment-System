// import React, { useEffect } from "react";
// import Layout from "../components/Layout";
// import axios from "axios";

// function Home() {
//   // login user data
//   const getUserData = async () => {
//     try {
//       const res = await axios.post(
//         "/api/v1/user/getUserData",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <Layout>
//       <h1>Welcome to home page</h1>
//     </Layout>
//   );
// }

// export default Home;


import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default HomePage;
