import { message, Button, Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

const Employee = (props) => {
  const [employee, setEmployee] = useState();
  const [editBox, toggleEditBox] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (
      props.location.state.id !== null &&
      props.location.state.id !== undefined
    ) {
      axios
        .get(`/employees/${props.location.state.id}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((err) => {
          message.error("Some Error occured !").then(() => {
            window.location.pathname = "/employees";
          });
        });
    } else {
      window.location.pathname = "/employees";
    }
  }, [props.location.state.id]);

  const deleteEmployee = () => {
    axios
      .delete(`/employees/${props.location.state.id}`)
      .then(() => {
        message.success("Employee deleted !", 1).then(() => {
          window.location.pathname = "/employees";
        });
      })
      .catch(() => {
        message.error("Cannot delete employee !");
      });
  };

  const submitEmployee = () => {
    axios
      .put(`/employees/${props.location.state.id}`, {
        name: name,
        phone_number: phone,
      })
      .then((response) => {
        setName("");
        setPhone("");
        toggleEditBox(false);

        setEmployee(response.data);
        message.success("Successfully updated the employee details");
      })
      .catch((err) => {
        message.error("Some error occured !");
      });
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Employee Details</h1>
        {localStorage.getItem("userType") === "admin" &&
          localStorage.getItem("userType") !== undefined && (
            <>
              <Button onClick={() => toggleEditBox(!editBox)}>
                Edit Employee Details
              </Button>

              {editBox && (
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
                  <Button
                    onClick={() => submitEmployee()}
                    style={{ margin: "10px" }}
                  >
                    <CheckOutlined />
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}

        <div style={{ marginTop: "40px" }}>
          <h3>
            Name : <span style={{ color: "gray" }}>{employee?.name}</span>
          </h3>
          <br />
          <h3>
            Phone Number :{" "}
            <span style={{ color: "gray" }}>{employee?.phone_number}</span>
          </h3>
          <br />
          <h3>
            Passcode :{" "}
            <span style={{ color: "gray" }}>{employee?.passcode}</span>
          </h3>
          <br />
          {localStorage.getItem("userType") === "admin" &&
            localStorage.getItem("userType") !== undefined && (
              <Button onClick={deleteEmployee} danger>
                Delete Employee
              </Button>
            )}
        </div>
      </div>
    </>
  );
};

export default Employee;
