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
      <Row type="flex" justify="center">
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
          <Link to="/products">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="STOCK" />
            </Card>
          </Link>
        </Col>
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
          <Link to="/shops">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="SHOPS" />
            </Card>
          </Link>
        </Col>
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
          <Link to="/employees">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="EMPLOYEES" />
            </Card>
          </Link>
        </Col>
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
          <Link to="/sales">
            <Card hoverable style={{ marginTop: "10px" }}>
              <Meta title="SALES" />
            </Card>
          </Link>
        </Col>
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
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
