import React from 'react';
import PropTypes from 'prop-types';
import RoundButton from './styled/RoundButton';

function ActionButton({ title, onClick, type, icon }) {
  const backgroundColor = {
    primary: '#141E46',
    secondary: '#ff6b81',
    default: '#fff',
    dark: '#000',
  };

  const borderColor = {
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
    <RoundButton
      title={title}
      $backgroundColor={backgroundColor[type]}
      $borderColor={borderColor[type]}
      $textColor={textColor[type]}
      onClick={onClick}
    >
      {icon}
    </RoundButton>
  );
}

ActionButton.propTypes = {
  /** title of the the button  */
  title: PropTypes.string.isRequired,
  /** Action when the button is clicked  */
  onClick: PropTypes.func.isRequired,
  /** Type of button, it will change the color of the background and text color  */
  type: PropTypes.oneOf(['primary', 'secondary', 'default', 'dark']).isRequired,
  /** Width of the button  */
  icon: PropTypes.node.isRequired,
};

export default ActionButton;
