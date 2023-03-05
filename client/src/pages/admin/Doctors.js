import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";

function Doctors() {
  const [docotrs, setDoctors] = useState();

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("error");
    }
};

    useEffect(() => {
      getDoctors();
    }, []);

    const  columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "phone",
        dataIndex: "phone",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="d-flex">
            {record.status === "pending" ? (
              <button className="btn btn-success">Approve</button>
            ) : (
              <button className="btn btn-danger">Reject</button>
            )}
          </div>
        ),
      },
    ];
  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={docotrs} />
    </Layout>
  );
}

export default Doctors;
