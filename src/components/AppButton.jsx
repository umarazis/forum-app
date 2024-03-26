import React from 'react';
import PropTypes from 'prop-types';
import Button from './styled/Button';

function AppButton({ title, label, onClick, type, width }) {
  const backgroundColor = {
    primary: '#141E46',
    secondary: '#ff6b81',
    default: 'whitesmoke',
    dark: '#000',
  };

  const textColor = {
    primary: '#fff',
    secondary: '#fff',
    default: '#000',
    dark: '#fff',
  };

  return (
    <Button
      title={title}
      $backgroundColor={backgroundColor[type]}
      $textColor={textColor[type]}
      width={width}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

AppButton.propTypes = {
  /** title of the the button  */
  title: PropTypes.string.isRequired,
  /** Action when the button is clicked  */
  onClick: PropTypes.func.isRequired,
  /** Type of button, it will change the color of the background and text color  */
  type: PropTypes.oneOf(['primary', 'secondary', 'default', 'dark']).isRequired,
  /** Label of the the button  */
  label: PropTypes.string.isRequired,
  /** Width of the button  */
  width: PropTypes.string,
};

AppButton.defaultProps = {
  width: '100%',
};

export default AppButton;
