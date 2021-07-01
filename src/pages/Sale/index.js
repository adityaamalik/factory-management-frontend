import { message, Button, Divider, Row, Col, Card } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sale = (props) => {
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
        message.success("Sale deleted !", 1).then(() => {
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
        <h1>Sale Details</h1>

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
            Total Products Sold :{" "}
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
            <span style={{ color: "gray" }}>₹ {sale?.total_price}</span>
          </h3>
          <br />
          <Divider>Products sold</Divider>

          <Row justify="center" align="middle">
            {sale?.products.map((p, index) => {
              return (
                <React.Fragment key={index}>
                  <Col md={8} xs={2} style={{ marginTop: "10px" }}></Col>
                  <Col md={8} xs={20} key={index}>
                    <Card bodyStyle={{ padding: "5px" }}>
                      <Row justify="center" align="middle">
                        <Col span={8}>
                          {!!p.image && (
                            <img src={p.image} height="60px" alt="product" />
                          )}
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

          {localStorage.getItem("userType") === "admin" &&
            localStorage.getItem("userType") !== undefined && (
              <Button onClick={deleteProduct} danger>
                Delete Sale
              </Button>
            )}

          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Sale;
