import { useEffect, useState } from "react";
import { Button, Input, message, Row, Col, Card, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Employees = () => {
  const [productInput, toggleProductInput] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get("/employees")
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generatePasscode = () => {
    let tempPass = parseInt(Math.floor(1000 + Math.random() * 9000));

    return tempPass;
  };

  const submitEmployee = () => {
    if (name === "") {
      message.error("Name cannot be empty !");
    } else if (phone === "") {
      message.error("Phone Number cannot be empty !");
    } else {
      axios
        .post("/employees", {
          name: name,
          passcode: generatePasscode(),
          phone_number: phone,
        })
        .then((response) => {
          setName("");
          setPhone("");
          toggleProductInput(false);

          setEmployees([response.data, ...employees]);
          message.success("Successfully added the employee");
        })
        .catch((err) => {
          message.error("Some error occured !");
        });
    }
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Employees</h1>
        <Button onClick={() => toggleProductInput(!productInput)}>
          Add a new employee
        </Button>
        {productInput && (
          <div style={{ marginTop: "15px" }}>
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={name}
              placeholder="Name"
              onChange={(val) => setName(val.target.value)}
            />
            <br />
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={phone}
              placeholder="Phone Number"
              onChange={(val) => setPhone(val.target.value)}
            />
            <br />
            <Button onClick={() => submitEmployee()} style={{ margin: "10px" }}>
              <PlusOutlined />
              Add
            </Button>
          </div>
        )}
        <Divider>Employees</Divider>
        <Row justify="center" align="middle">
          {employees.map((emp, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
                <Link
                  to={{
                    pathname: "/employee",
                    state: {
                      id: emp._id,
                    },
                  }}
                >
                  <Card
                    hoverable={true}
                    bordered={true}
                    style={{ minWidth: 300, marginTop: 30 }}
                  >
                    <p>Name : {emp.name}</p>
                    <p>Phone Number : {emp.phone_number}</p>
                    <p>Passcode : {emp.passcode}</p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default Employees;
