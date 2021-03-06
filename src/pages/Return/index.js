import { message, Button, Divider, Row, Col, Card } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Return = (props) => {
  const [sale, setSale] = useState();

  useEffect(() => {
    if (
      props.location.state.id !== null &&
      props.location.state.id !== undefined
    ) {
      axios
        .get(`/transactions/${props.location.state.id}`)
        .then((response) => {
          setSale(response.data);
        })
        .catch((err) => {
          message.error("Some Error occured !").then(() => {
            window.location.pathname = "/sales";
          });
        });
    } else {
      window.location.pathname = "/sales";
    }
  }, [props.location.state.id]);

  const deleteProduct = () => {
    axios
      .delete(`/transactions/${props.location.state.id}`)
      .then(() => {
        message.success("Return deleted !", 1).then(() => {
          window.location.pathname = "/sales";
        });
      })
      .catch(() => {
        message.error("Cannot delete sale !");
      });
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          <span style={{ color: "gray" }}>Logged in as</span>{" "}
          <strong>{localStorage.getItem("employeeName")}</strong>
        </h3>
        <h1>Return Details</h1>

        <div style={{ marginTop: "40px" }}>
          {sale?.employee_id !== "admin" && (
            <Link
              to={{
                pathname: "/employee",
                state: {
                  id: sale?.employee_id,
                },
              }}
            >
              <h3 style={{ color: "blue" }}>
                <LinkOutlined /> Go to Employee details
              </h3>
            </Link>
          )}

          <br />
          <h3>
            Total Products Returned :{" "}
            <span style={{ color: "gray" }}>{sale?.products.length}</span>
          </h3>
          <br />
          <Link
            to={{
              pathname: "/shop",
              state: {
                id: sale?.shop_id,
              },
            }}
          >
            <h3 style={{ color: "blue" }}>
              <LinkOutlined /> Go to Shop details
            </h3>
          </Link>

          <br />
          <h3>
            Total Price :{" "}
            <span style={{ color: "gray" }}>??? {sale?.total_price}</span>
          </h3>
          <br />
          <Divider>Products returned</Divider>

          <Row justify="center" align="middle">
            {sale?.products.map((p, index) => {
              return (
                <React.Fragment key={index}>
                  <Col md={8} xs={2} style={{ marginTop: "10px" }}></Col>
                  <Col md={8} xs={20} key={index}>
                    <Card bodyStyle={{ padding: "5px" }}>
                      <Row justify="center" align="middle">
                        <Col span={8}>
                          <img src={p.image} height="60px" alt="product" />
                        </Col>
                        <Col span={8}>
                          <strong>{p.name}</strong>
                          <p>
                            {p.size} {p.unit}
                          </p>
                        </Col>
                        <Col span={8}>
                          <p>Q : {p.quantity}</p>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col md={8} xs={2}></Col>
                </React.Fragment>
              );
            })}
          </Row>

          <Divider></Divider>

          <Button onClick={deleteProduct} danger>
            Delete Return
          </Button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Return;
