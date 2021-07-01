import { useEffect, useState } from "react";
import { Tabs, Input, Button, message } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import axios from "axios";

const { TabPane } = Tabs;

const Login = () => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("userType") === "admin" ||
      localStorage.getItem("userType") === "employee"
    ) {
      message.success("You are already logged in", 1).then(() => {
        window.location.pathname = "/home";
      });
    }
  }, []);

  const login = (user) => {
    if (user === "admin" && password === "adminpassword") {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("employeeId", "admin");
      localStorage.setItem("employeeName", "admin");
      window.location.pathname = "/home";
    } else if (user === "employee") {
      axios
        .get(`/login/${password}`)
        .then((res) => {
          if (res.data[0] === undefined) {
            message.error("No user found !");
          } else {
            localStorage.setItem("userType", "employee");
            localStorage.setItem("employeeId", res.data[0].id);
            localStorage.setItem("employeeName", res.data[0].name);
            window.location.pathname = "/home";
          }
        })
        .catch((err) => {
          message.error("Some error occured !");
        });
    } else {
      message.error("Wrong password, please try again !");
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <img
          src="logo.png"
          alt="silvassa bottling company"
          height="100px"
          width="100px"
        />
        <br />
        <br />
        <h1>SILVASSA BOTTLING COMPANY</h1>
        <br />
        <br />
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                ADMIN
              </span>
            }
            key="1"
          >
            <h1>Hi, Admin</h1>
            <Input
              type="password"
              placeholder="Password for admin"
              size="large"
              style={{ width: "200px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button onClick={() => login("admin")}>Login</Button>
          </TabPane>
          <TabPane
            style={{ textAlign: "center" }}
            tab={
              <span>
                <TeamOutlined />
                EMPLOYEE
              </span>
            }
            key="2"
          >
            <h1>Hi, Employee</h1>
            <Input
              type="password"
              placeholder="Employee Passcode"
              size="large"
              style={{ width: "200px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button onClick={() => login("employee")}>Login</Button>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Login;
