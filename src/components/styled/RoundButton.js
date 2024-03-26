import styled from 'styled-components';

const RoundButton = styled.button`
  background-color: ${(props) => props.$backgroundColor};
  border: 1px solid ${(props) => props.$borderColor};
  color: ${(props) => props.$textColor};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  padding: 8px;
  cursor: pointer;
`;

RoundButton.defaultProps = {
  $backgroundColor: '#fff',
  $borderColor: 'rgba(0, 0, 0, 0.2)',
  $textColor: '#0F1419',
};

export default RoundButton;
