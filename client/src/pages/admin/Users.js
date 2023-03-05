import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Layout from '../../components/Layout'
import { message, Table } from 'antd';

function Users() {
    const [user, setUser] = useState();

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/admin/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
  };
  
      useEffect(() => {
        getUser();
      }, []);
  
      const columns = [
        {
          title: "Name",
          dataIndex: "Name",
        },
        {
          title: "Email",
          dataIndex: "Email",
        },
        {
          title: "Doctor",
          dataIndex: "isDoctor",
          render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <button className="btn btn-danger">Block</button>
            </div>
          ),
        },
      ];
  return (
    <Layout>
       <h1 className="text-center m-3">All User</h1>
      <Table columns={columns} dataSource={user} />
    </Layout>
  )
}

export default Users
