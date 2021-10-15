import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  color: black;
  transition: all 0.3s;
  &:hover {
    text-decoration: none;
    color: orange;
  }
`;
