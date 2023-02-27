import React from "react";
import "../style/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const navigate=useNavigate();

    const onfinishHandler = async (values) => {
      var stringify = JSON.stringify(values);
      console.log(stringify);
        try {
         const resp=await fetch("http://localhost:4000/api/v1/user/register",{
          method: 'POST',
          mode: 'cors',
          headers:{'Content-type':'application/json'},
          body:stringify
         })
          .then(r=>r.json()).then((res)=>{
            console.log(res);
            if(res.succuss){
              navigate('/login');
              message.success(res.message);
            }
            else{
              message.error(res.message);
            }
          })
         
        } catch (error) {
          
        }
      };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="Name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="Email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
}

export default Register;
