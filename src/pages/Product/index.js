import { message, Button, Input } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

const Product = (props) => {
  const [product, setProduct] = useState();
  const [editBox, toggleEditBox] = useState(false);

  const [name, setName] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [size, setSize] = useState("");

  const submitProduct = () => {
    axios
      .put(`/products/${props.location.state.id}`, {
        name: name,
        image: imageURI,
        stock: stock,
        price: price,
        unit: unit,
        size: size,
      })
      .then((res) => {
        setName("");
        setImageURI("");
        setStock("");
        setPrice("");
        setUnit("");
        setSize("");
        toggleEditBox(false);
        setProduct(res.data);
        message.success("Successfully updated the product !");
      })
      .catch((err) => {
        message.error("Some error occured !");
      });
  };

  useEffect(() => {
    if (
      props.location.state.id !== null &&
      props.location.state.id !== undefined
    ) {
      axios
        .get(`/products/${props.location.state.id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          message.error("Some Error occured !").then(() => {
            window.location.pathname = "/products";
          });
        });
    } else {
      window.location.pathname = "/products";
    }
  }, [props.location.state.id]);

  const deleteProduct = () => {
    axios
      .delete(`/products/${props.location.state.id}`)
      .then(() => {
        message.success("Product deleted !", 1).then(() => {
          window.location.pathname = "/products";
        });
      })
      .catch(() => {
        message.error("Cannot delete product !");
      });
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Product Details</h1>

        {localStorage.getItem("userType") === "admin" &&
          localStorage.getItem("userType") !== undefined && (
            <>
              <Button onClick={() => toggleEditBox(!editBox)}>
                Edit Product Details
              </Button>

              {editBox && (
                <>
                  <div style={{ marginTop: "15px" }}>
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="text"
                      value={name}
                      placeholder="Name"
                      onChange={(val) => setName(val.target.value)}
                    />
                    <br />
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="text"
                      value={imageURI}
                      placeholder="Image URL"
                      onChange={(val) => setImageURI(val.target.value)}
                    />
                    <br />
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="number"
                      value={stock}
                      placeholder="Stock"
                      onChange={(val) => setStock(val.target.value)}
                    />
                    <br />
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="number"
                      value={price}
                      placeholder="Price"
                      onChange={(val) => setPrice(val.target.value)}
                    />
                    <br />
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="number"
                      value={size}
                      placeholder="Size"
                      onChange={(val) => setSize(val.target.value)}
                    />
                    <br />
                    <Input
                      style={{ margin: "10px", width: "80%" }}
                      type="text"
                      value={unit}
                      placeholder="Unit ( mL / L )"
                      onChange={(val) => setUnit(val.target.value)}
                    />
                    <br />
                    <Button
                      onClick={() => submitProduct()}
                      style={{ margin: "10px" }}
                    >
                      <CheckOutlined />
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </>
          )}

        <div style={{ marginTop: "40px" }}>
          <img src={product?.image} height="200px" width="auto" alt="Product" />
          <h3>
            Name : <span style={{ color: "gray" }}>{product?.name}</span>
          </h3>
          <br />
          <h3>
            Size : <span style={{ color: "gray" }}>{product?.size}</span>
          </h3>
          <br />
          <h3>
            Unit : <span style={{ color: "gray" }}>{product?.unit}</span>
          </h3>
          <br />
          <h3>
            Price : <span style={{ color: "gray" }}>₹ {product?.price}</span>
          </h3>
          <br />
          <h3>
            Stock remaining :{" "}
            <span style={{ color: "gray" }}>{product?.stock}</span>
          </h3>
          <br />
          {localStorage.getItem("userType") === "admin" &&
            localStorage.getItem("userType") !== undefined && (
              <>
                <Button onClick={deleteProduct} danger>
                  Delete Product
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

export default Product;
