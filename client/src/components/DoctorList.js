import React from "react";
import {useNavigate} from 'react-router-dom'

function DoctorList({ doctor }) {
    const navigate=useNavigate();
  return (
    <>
      <div className="card m-2" style={{cursor:'pointer',width:'285px'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)} >
        <div className="card-header">
          Dr.{doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specilization:</b>{doctor.specialization}
          </p>
          <p>
            <b>Experience:</b>{doctor.experience}
          </p>
          <p>
            <b>Fees per consultation:</b>{doctor.fessPerConsultation}
          </p>
          <p>
            <b>Timing:</b>{doctor.timings[0]}-{doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
}

export default DoctorList;
