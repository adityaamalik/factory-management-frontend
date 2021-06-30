import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, message, Row, Card, Col, Divider } from "antd";
import axios from "axios";
import {
  PlusOutlined,
  ShopOutlined,
  UserOutlined,
  PhoneOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import QRCode from "qrcode";

const Shops = () => {
  const [shopInput, toggleShopInput] = useState(false);
  const [shops, setShops] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [numberOfFridge, setNumberOfFridge] = useState("");

  const generateQRCode = async (code) => {
    try {
      const response = await QRCode.toDataURL(code);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const generateCode = async () => {
    let code = await parseInt(Math.floor(100000 + Math.random() * 900000));

    return code;
  };

  const submitShop = async () => {
    const code = await generateCode();

    let qr;
    if (code) {
      qr = await generateQRCode(code.toString());
    }

    if (qr) {
      axios
        .post("/shops", {
          owner_name: ownerName,
          name: name,
          address: address,
          area: area,
          pin_code: pinCode,
          phone_number_1: phoneNumber1,
          phone_number_2: phoneNumber2,
          shop_code: code,
          qr_code: qr,
        })
        .then((res) => {
          setOwnerName("");
          setName("");
          setAddress("");
          setArea("");
          setPinCode("");
          setPhoneNumber1("");
          setPhoneNumber2("");
          toggleShopInput(false);
          setShops([res.data, ...shops]);
          message.success("Successfully created a shop !");
        })
        .catch((err) => {
          message.error("Some error occured !");
        });
    }
  };

  useEffect(() => {
    axios
      .get("/shops")
      .then((res) => setShops(res.data))
      .catch((err) => message.error("Some Error occured !"));
  }, []);

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Shops</h1>
        <Button onClick={() => toggleShopInput(!shopInput)}>
          Add a new shop
        </Button>
        {shopInput && (
          <div style={{ marginTop: "15px" }}>
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={name}
              placeholder="Name of shop"
              onChange={(val) => setName(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={ownerName}
              placeholder="Name of Owner"
              onChange={(val) => setOwnerName(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={address}
              placeholder="Address"
              onChange={(val) => setAddress(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={area}
              placeholder="Area"
              onChange={(val) => setArea(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={pinCode}
              placeholder="Pin Code"
              onChange={(val) => setPinCode(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={phoneNumber1}
              placeholder="Phone Number 1"
              onChange={(val) => setPhoneNumber1(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={phoneNumber2}
              placeholder="Phone Number 2 ( optional )"
              onChange={(val) => setPhoneNumber2(val.target.value)}
            />
            <br />
            <Input
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={numberOfFridge}
              placeholder="Number Of Fridges"
              onChange={(val) => setNumberOfFridge(val.target.value)}
            />
            <br />
            <Button onClick={submitShop} style={{ margin: "10px" }}>
              <PlusOutlined />
              Add
            </Button>
          </div>
        )}

        <Divider>Shops</Divider>

        <Row justify="center" align="middle">
          {shops.map((shop, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
                <Link
                  to={{
                    pathname: "/shop",
                    state: {
                      id: shop._id,
                    },
                  }}
                >
                  <Card
                    hoverable={true}
                    bordered={true}
                    style={{ minWidth: 300, marginTop: 30 }}
                  >
                    <strong>
                      <ShopOutlined /> {shop.name}
                    </strong>
                    <p>
                      <UserOutlined /> {shop.owner_name}
                    </p>
                    <p>
                      <ScheduleOutlined /> {shop.address}
                    </p>
                    <p>
                      <PhoneOutlined /> {shop.phone_number_1}
                    </p>
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

export default Shops;
