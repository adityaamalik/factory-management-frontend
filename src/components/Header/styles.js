import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

export const Header = styled.header`
  margin-top: 30px;
  text-align: center;
`;

export const Logo = styled.img`
  height: 50px;
  width: 50px;
  @media only screen and (max-width: 768px) {
    height: 20px;
    width: 20px;
  }
`;

export const Heading = styled.a`
  font-size: 30px;
  color: black;
  &:hover {
    color: gray;
  }
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const DropdownIcon = styled(MenuOutlined)`
  color: black;
  font-size: 25px;
`;

export const Span = styled.a`
  color: black;
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: gray;
    top: -2px;
  }
`;
