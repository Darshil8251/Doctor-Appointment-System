import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import { Params, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {showLoading,hideLoading} from '../redux/features/alertSlice'

function Bookingpage() {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
 const dispatch=useDispatch();

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
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  // It use for booking
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };



  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <Layout>
      <h3 className="m-2">Book appointment</h3>

      <div
        className="container"
        style={{ width: "415px", border: "2px solid black" }}
      >
        {doctor && (
          <div className="text-center">
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
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <br />
              <TimePicker
                format="HH:mm"
                onChange={(value) =>
                  setTime([
                    moment(value[0]).format("HH:mm"),
                  ])
                }
              />
              <br />
              <button className="btn btn-primary">Check availability</button>
              <br />
              <button className="btn btn-dark" onClick={handleBooking}>
                Book Now
              </button>
              <br />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Bookingpage;
