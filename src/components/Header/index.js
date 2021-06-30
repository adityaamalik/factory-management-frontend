import * as S from "./styles";
import { Row, Col, Menu, Dropdown } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <S.Span href="/products">
        {window.location.pathname === "/products" && <CaretRightOutlined />}
        Stock
      </S.Span>
    </Menu.Item>
    <Menu.Item key="1">
      <S.Span href="/shops">
        {window.location.pathname === "/shops" && <CaretRightOutlined />}
        Shops
      </S.Span>
    </Menu.Item>
    <Menu.Item key="2">
      <S.Span href="/sales">
        {window.location.pathname === "/sales" && <CaretRightOutlined />}
        Sales
      </S.Span>
    </Menu.Item>
    <Menu.Item key="3">
      <S.Span href="/returns">
        {window.location.pathname === "/returns" && <CaretRightOutlined />}
        Returns
      </S.Span>
    </Menu.Item>

    {localStorage.getItem("userType") === "admin" &&
      localStorage.getItem("userType") !== undefined && (
        <Menu.Item key="4">
          <S.Span href="/employees">
            {window.location.pathname === "/employees" && (
              <CaretRightOutlined />
            )}
            Employees
          </S.Span>
        </Menu.Item>
      )}

    <Menu.Item key="5">
      <S.Span href="/" onClick={() => localStorage.clear()}>
        Logout
      </S.Span>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <S.Header>
      <Row align="middle">
        <Col span={6}>
          <S.Logo src="logo.png" alt="Logo" />
        </Col>
        <Col span={12}>
          <S.Heading href="/home">SILVASSA BOTTLING COMPANY</S.Heading>
        </Col>
        <Col span={6}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <S.DropdownIcon />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </S.Header>
  );
};

export default Header;
