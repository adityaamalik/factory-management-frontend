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
  const [originalShops, setOriginalShops] = useState([]);

  const [searchVal, setSearchVal] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mapLocation, setMapLocation] = useState("");
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
      let alreadyPresent;

      for (let index = 0; index < shops.length; index++) {
        if (shops[index].phone_number_1.toString() === phoneNumber1) {
          alreadyPresent = true;
        }
      }

      if (address === "") {
        message.error("Address cannot be empty");
      } else if (area === "") {
        message.error("Area cannot be empty");
      } else if (pinCode === "") {
        message.error("Pin code cannot be empty");
      } else if (phoneNumber1 === "") {
        message.error("Please enter a phone number");
      } else if (ownerName === "") {
        message.error("Enter owner's name");
      } else if (alreadyPresent) {
        message.error("Phone number already exists for this shop");
      } else {
        axios
          .post("/shops", {
            owner_name: ownerName,
            name: name,
            address: address,
            map_location: mapLocation,
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
            setMapLocation("");
            toggleShopInput(false);
            setShops([res.data, ...shops]);
            message.success("Successfully created a shop !");
          })
          .catch((err) => {
            message.error("Some error occured !");
          });
      }
    }
  };

  useEffect(() => {
    axios
      .get("/shops")
      .then((res) => {
        setShops(res.data);
        setOriginalShops(res.data);
      })
      .catch((err) => message.error("Some Error occured !"));
  }, []);

  const handleSearch = () => {
    const filteredShops = originalShops.filter((val) => {
      return (
        val.shop_code.includes(searchVal) ||
        val.name.includes(searchVal) ||
        val.owner_name.includes(searchVal) ||
        val.area.includes(searchVal) ||
        val.address.includes(searchVal)
      );
    });

    setShops(filteredShops);
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
        <h1>Shops</h1>
        {localStorage.getItem("userType") === "admin" &&
          localStorage.getItem("userType") !== undefined && (
            <>
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
                    value={mapLocation}
                    placeholder="Google Map Location (Optional)"
                    onChange={(val) => setMapLocation(val.target.value)}
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
            </>
          )}

        <Divider>Search Shops</Divider>

        <Row justify="center" align="middle">
          <Col span={16}>
            <Input
              type="text"
              placeholder="Search for shops"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </Col>
          <Col>
            <Button onClick={handleSearch}>Search</Button>
          </Col>
        </Row>

        <br />

        <Row justify="center" align="middle">
          <Col>
            <Button
              onClick={() => {
                setSearchVal("");
                setShops(originalShops);
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>

        <Divider> Shops</Divider>

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
                    <p>Shop Code : {shop.shop_code}</p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
        <br />
        <br />
      </div>
    </>
  );
};

export default Shops;
