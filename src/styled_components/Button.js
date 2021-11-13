import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007fc4;
  border: none;
  color: var(--main-theme-color-white);
  font-weight: var(--font-w-6);
  font-size: 16px;
  &:hover {
    cursor: pointer;
    background-color: #008eda;
  }
`;

export default Button;
