
interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  text: string;
  color: 'primary' | 'secondary';
}

export default ButtonProps;