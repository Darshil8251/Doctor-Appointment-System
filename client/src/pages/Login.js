import React from "react";
import "../style/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navgation = useNavigate();

  const onfinishHandler = async (values) => {
    let body = JSON.stringify(values);
    console.log(body);
    try {
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: body,
      })
        .then((r) => r.json())
        .then((rep) => {
          console.log(rep);
          if (rep.succuss) {
            navgation("/");
            message.success(rep.message);
            localStorage.setItem("token", rep.token);
          } else {
            message.error("User Not Found");
          }
        });
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
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
          <h3 className="text-center">Login From</h3>

          <Form.Item label="Email" name="Email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="Password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            Not a user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}

export default Login;
