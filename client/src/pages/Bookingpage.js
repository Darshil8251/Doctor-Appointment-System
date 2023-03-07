import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import { Params, useParams } from "react-router-dom";
import moment from 'moment';

function Bookingpage() {
  const params = useParams();

  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getDoctor = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.success);
      console.log(res.data.data);
      if (res.data.success) {
        message.success("Successfully Fetch");
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };
  useEffect(() => {
    getDoctor();
  }, []);

  const [doctor, setDoctor] = useState(null);

  return (
    <Layout>
      <h3>Book appointment</h3>

      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Doctor fees per Consultation:{doctor.fessPerConsultation}</h4>
            <h4>
              Timing:{doctor.timings[0]}-{doctor.timings[1]}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(value) => setDate(moment(value).format('DD-MM-YYYY'))}
              />
              <TimePicker.RangePicker format="HH:mm"  onChange={(value) => setTimings([moment(value[0]).format('DD-MM-YYYY'),
              moment(value[1]).format('DD-MM-YYYY')])} />
              <button className="btn btn-primary">Check availability</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Bookingpage;
