
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import DoctorList from "../components/DoctorList";
const HomePage = () => {


const [doctor,setDoctor]=useState();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      {
        doctor && doctor.map(doctor=>(
          <DoctorList doctor={doctor} />
        ))
      }
    </Layout>
  );
};

export default HomePage;
