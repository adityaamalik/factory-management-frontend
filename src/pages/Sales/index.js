import { Row, Col, Card, message, Button, Select, Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import QrReader from "react-qr-reader";

const { Option } = Select;

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  const [addBox, toggleAddBox] = useState(false);

  const [shopId, setShopId] = useState("");

  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [showCamera, toggleCamera] = useState(false);

  useEffect(() => {
    axios
      .get(`/transactions?type=sales`)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => message.error("Error fetching sales !"));

    axios
      .get("/shops")
      .then((res) => setShops(res.data))
      .catch((err) => {
        message.error("Error fetching shops");
      });

    axios
      .get("/products")
      .then((res) => {
        const temp = res.data;

        temp.forEach((p) => {
          p.quantity = 0;
        });

        setProducts(temp);
      })
      .catch((err) => {
        message.error("Error fetching products");
      });
  }, []);

  const submitOrder = () => {
    if (shopId === "") {
      message.error("Please select a shop first !");
    } else if (products.length === 0) {
      message.error(
        "No products in stock, please add some products first !",
        4
      );
    } else {
      const selectedProducts = products.filter((p) => {
        return p.quantity !== 0;
      });

      if (selectedProducts.length === 0) {
        message.error("Please select products !");
      } else {
        let totalPrice = 0;
        selectedProducts.forEach((p) => {
          totalPrice += p.quantity * p.price;
        });

        axios
          .post("/transactions", {
            employee_id: localStorage.getItem("employeeId"),
            shop_id: shopId,
            products: selectedProducts,
            total_price: totalPrice,
            type: "sales",
          })
          .then((res) => {
            message.success("Successfully added the products !");
            setSales([res.data, ...sales]);
          })
          .catch((err) => {
            message.error("Some error occured !");
          });
      }
    }
  };

  const addQuantity = (index, id) => {
    let q = document.getElementById(`q${index}`).innerText;

    q = parseInt(q);

    q++;

    document.getElementById(`q${index}`).innerText = q;

    let temp = products;
    temp.forEach((p) => {
      if (p.id === id) {
        p.quantity++;
      }
    });

    setProducts(temp);
  };

  const removeQuantity = (index, id) => {
    let q = document.getElementById(`q${index}`).innerText;

    q = parseInt(q);

    if (q !== 0) {
      q--;
    }

    document.getElementById(`q${index}`).innerText = q;

    let temp = products;
    temp.forEach((p) => {
      if (p.id === id) {
        p.quantity--;
      }
    });

    setProducts(temp);
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
    message.error("Can't scan using camera !");
  };

  const handleScanWebCam = (result) => {
    if (result) {
      toggleCamera(false);
      setScanResultWebCam(result);
      axios
        .get(`/shops?shop_code=${result}`)
        .then((res) => {
          console.log(res.data);
          setShopId(res.data[0].id);
        })
        .catch((err) => {
          message.error("No shop found with this code !");
        });
    }
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Sales</h1>

        <Button onClick={() => toggleAddBox(!addBox)}>Add new sales</Button>

        {addBox && (
          <div style={{ marginTop: "15px" }}>
            <Select
              required
              placeholder="Select Shop"
              style={{ margin: "10px", width: 300 }}
              onChange={(val) => setShopId(val)}
            >
              {shops.map((val) => {
                return (
                  <Option key={val._id} value={val._id}>
                    {val.name}
                  </Option>
                );
              })}
            </Select>

            <br />
            <p>OR</p>
            <Button onClick={() => toggleCamera(!showCamera)}>
              Scan QR Code
            </Button>

            <br />
            <br />
            <br />

            <div style={{ width: "300px", margin: "auto" }}>
              {showCamera && (
                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
              )}
            </div>

            <br />
            {scanResultWebCam !== "" && (
              <h3>Found Shop with code : {scanResultWebCam}</h3>
            )}

            <Divider>Select Products</Divider>

            <Row justify="center" align="middle">
              {products.map((p, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col md={8} xs={2} style={{ marginTop: "10px" }}></Col>
                    <Col md={8} xs={20} key={index}>
                      <Card bodyStyle={{ padding: "5px" }}>
                        <Row justify="center" align="middle">
                          <Col span={6}>
                            <img src={p.image} height="60px" alt="product" />
                          </Col>
                          <Col span={6}>
                            <strong>{p.name}</strong>
                            <p>
                              {p.size} {p.unit}
                            </p>
                          </Col>
                          <Col span={12}>
                            <Button onClick={() => removeQuantity(index, p.id)}>
                              -
                            </Button>
                            <Button id={`q${index}`}>0</Button>
                            <Button onClick={() => addQuantity(index, p.id)}>
                              +
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col md={8} xs={2}></Col>
                  </React.Fragment>
                );
              })}
            </Row>

            <br />

            <Button onClick={submitOrder} style={{ margin: "10px" }}>
              <PlusOutlined />
              Add Order
            </Button>
          </div>
        )}

        <Divider>Sales History</Divider>

        <Row justify="center" align="middle">
          {sales.map((sale, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
                <Link
                  to={{
                    pathname: "/sale",
                    state: {
                      id: sale._id,
                    },
                  }}
                >
                  <Card
                    hoverable={true}
                    bordered={true}
                    style={{ minWidth: 300, marginTop: 30 }}
                  >
                    <p>Sale Number : {index + 1}</p>
                    <p>Date : {moment(sale.date).format("DD-MM-YYYY")}</p>
                    <strong>Employee Name : {sale.employee_id}</strong>
                    <p>Total Products : {sale.products.length}</p>
                    <p>Total Price : ₹ {sale.total_price} /-</p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
      <br />
      <br />
    </>
  );
};

export default Sales;
