import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, message, Row, Card, Col, Divider } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const Products = () => {
  const [productInput, toggleProductInput] = useState(false);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [size, setSize] = useState("");

  const submitProduct = () => {
    axios
      .post("/products", {
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
        toggleProductInput(false);
        setProducts([res.data, ...products]);
        message.success("Successfully created a product !");
      })
      .catch((err) => {
        message.error("Some error occured !");
      });
  };

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => message.error("Some Error occured !"));
  }, []);

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Stock</h1>
        <Button onClick={() => toggleProductInput(!productInput)}>
          Add a new product
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
              value={imageURI}
              placeholder="Image URL"
              onChange={(val) => setImageURI(val.target.value)}
            />
            <br />
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={stock}
              placeholder="Stock"
              onChange={(val) => setStock(val.target.value)}
            />
            <br />
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={price}
              placeholder="Price"
              onChange={(val) => setPrice(val.target.value)}
            />
            <br />
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="number"
              value={size}
              placeholder="Size"
              onChange={(val) => setSize(val.target.value)}
            />
            <br />
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={unit}
              placeholder="Unit ( mL / L )"
              onChange={(val) => setUnit(val.target.value)}
            />
            <br />
            <Button onClick={() => submitProduct()} style={{ margin: "10px" }}>
              <PlusOutlined />
              Add
            </Button>
          </div>
        )}
        <Divider>Products</Divider>
        <Row justify="center" align="middle">
          {products.map((product, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} key={index}>
                <Link
                  to={{
                    pathname: "/product",
                    state: {
                      id: product._id,
                    },
                  }}
                >
                  <Card
                    hoverable={true}
                    bordered={true}
                    style={{ minWidth: 300, marginTop: 30 }}
                  >
                    <strong>{product.name}</strong>
                    <p>
                      {product.size} {product.unit}
                    </p>
                    <p>₹ {product.price} /-</p>
                    <p>Stock remaining : {product.stock}</p>
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

export default Products;
