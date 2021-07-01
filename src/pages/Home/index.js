import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";

const { Meta } = Card;

const Home = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        marginBottom: "30px",
      }}
    >
      <h3>
        <span style={{ color: "gray" }}>Logged in as</span>{" "}
        <strong>{localStorage.getItem("employeeName")}</strong>
      </h3>
      <Row
        type="flex"
        justify="center"
        style={{ margin: "10px", padding: "10px" }}
      >
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Link to="/products">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="STOCK" />
            </Card>
          </Link>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Link to="/shops">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="SHOPS" />
            </Card>
          </Link>
        </Col>

        {localStorage.getItem("userType") === "admin" &&
          localStorage.getItem("userType") !== undefined && (
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Link to="/employees">
                <Card hoverable style={{ marginTop: "10px" }}>
                  <Meta title="EMPLOYEES" />
                </Card>
              </Link>
            </Col>
          )}

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Link to="/sales">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="SALES" />
            </Card>
          </Link>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Link to="/returns">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="RETURNS" />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
