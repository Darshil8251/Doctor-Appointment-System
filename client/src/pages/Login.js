import React from "react";
import "../style/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const navgation = useNavigate();
  const dispatch=useDispatch();
  const onfinishHandler = async (values) => {
    let body = JSON.stringify(values);
    console.log(body);
    try {
      // const response = await fetch("http://localhost:4000/api/v1/user/login", {
      //   method: "POST",
      //   mode: "cors",
      //   headers: { "Content-type": "application/json" },
      //   body: body,
      // })
      //   .then((r) => r.json())
      //   .then((resp) => {
      //     if (resp.success) {
      //       navgation("/");
      //       message.success(resp.message);
      //       localStorage.setItem("token", resp.token);
      //     } else {
      //       message.error("User Not Found");
      //     }
      //   });

      dispatch(showLoading());
      const res = await axios.post("http://localhost:4000/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigator("/");
      }
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
