import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  width: ${(props) => props.width};
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
`;

Button.defaultProps = {
  $backgroundColor: '#000',
  $textcolor: '#fff',
  width: '100%',
};

export default Button;
