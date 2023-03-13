import React, { useEffect, useState } from "react";
import Layout from ".././components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

function Appointment() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/v1/user/user-appointment",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      setAppointments(res.data.data);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {record.doctorId.lastName}{" "}
          &nbsp;
          {moment(record.time).format("HH:mm")} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1>Appointment List</h1>
      <Table columns={column} dataSource={appointments} />
    </Layout>
  );
}

export default Appointment;
