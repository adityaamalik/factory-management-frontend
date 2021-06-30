import { message, Button, Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

const Shop = (props) => {
  const [shop, setShop] = useState();
  const [editBox, toggleEditBox] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    if (
      props.location.state.id !== null &&
      props.location.state.id !== undefined
    ) {
      axios
        .get(`/shops/${props.location.state.id}`)
        .then((response) => {
          setShop(response.data);
        })
        .catch((err) => {
          message.error("Some Error occured !").then(() => {
            window.location.pathname = "/shops";
          });
        });
    } else {
      window.location.pathname = "/shops";
    }
  }, [props.location.state.id]);

  const submitShop = () => {
    axios
      .put(`/shops/${props.location.state.id}`, {
        owner_name: ownerName,
        name: name,
        address: address,
        area: area,
        pin_code: pinCode,
        phone_number_1: phoneNumber1,
        phone_number_2: phoneNumber2,
      })
      .then((res) => {
        setOwnerName("");
        setName("");
        setAddress("");
        setArea("");
        setPinCode("");
        setPhoneNumber1("");
        setPhoneNumber2("");
        toggleEditBox(false);
        setShop(res.data);
        message.success("Successfully edited the shop !");
      })
      .catch((err) => {
        message.error("Some error occured !");
      });
  };

  const deleteShop = () => {
    axios
      .delete(`/shops/${props.location.state.id}`)
      .then(() => {
        message.success("Shop deleted !", 1).then(() => {
          window.location.pathname = "/shops";
        });
      })
      .catch(() => {
        message.error("Cannot delete shop !");
      });
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Shop Details</h1>
        {localStorage.getItem("userType") === "admin" &&
          localStorage.getItem("userType") !== undefined && (
            <>
              <Button onClick={() => toggleEditBox(!editBox)}>
                Edit Shop Details
              </Button>

              {editBox && (
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
                  <Button onClick={submitShop} style={{ margin: "10px" }}>
                    <CheckOutlined />
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}

        <div style={{ marginTop: "40px" }}>
          <a href={shop?.qr_code} download>
            <img src={shop?.qr_code} height="200px" alt="qr code" />
          </a>
          <h3>
            Name : <span style={{ color: "gray" }}>{shop?.name}</span>
          </h3>
          <br />
          <h3>
            Owner's Name :{" "}
            <span style={{ color: "gray" }}>{shop?.owner_name}</span>
          </h3>
          <br />
          <h3>
            Address : <span style={{ color: "gray" }}>{shop?.address}</span>
          </h3>
          <br />
          <h3>
            Area : <span style={{ color: "gray" }}>{shop?.area}</span>
          </h3>
          <br />
          <h3>
            Pin Code : <span style={{ color: "gray" }}>₹ {shop?.pin_code}</span>
          </h3>
          <br />
          <h3>
            Phone Number 1 :{" "}
            <span style={{ color: "gray" }}>{shop?.phone_number_1}</span>
          </h3>
          <br />
          <h3>
            Phone Number 2 :{" "}
            <span style={{ color: "gray" }}>{shop?.phone_number_2}</span>
          </h3>
          <br />
          <h3>
            Shop Code : <span style={{ color: "gray" }}>{shop?.shop_code}</span>
          </h3>
          <br />

          {localStorage.getItem("userType") === "admin" &&
            localStorage.getItem("userType") !== undefined && (
              <>
                <Button onClick={deleteShop} danger>
                  Delete Shop
                </Button>
              </>
            )}

          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Shop;
