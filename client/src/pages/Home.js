import React, { useEffect } from 'react'

function Home() {

  // login user data
  const getUserData=async()=>{
               try {
                const resp=await fetch("http://localhost:4000/api/v1/user/GetUserData",{
                  method:'POST',
                  mode:'cors',
                  headers:{
                    Authorization:"Bearer " + localStorage.getItem('token')
                  }
                })
               } catch (error) {
                console.log(error);
                
               }
  }
  useEffect(()=>{
    getUserData();
  },[]);
  return (
    <div>
      <h1>Welcome to home page</h1>
    </div>
  )
}

export default Home
