import ButtonMaterial from '@mui/material/Button';
import ButtonProps from './types';

const Button = ({ text, color, type, onClick, disabled }:ButtonProps) => {
  return (
    <ButtonMaterial variant="contained" color={color} type={type} onClick={onClick}>
      {text}
    </ButtonMaterial>
  );
}

export default Button;


