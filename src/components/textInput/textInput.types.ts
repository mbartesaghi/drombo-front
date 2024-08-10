
interface TextInputProps {
  labelText: string;
  width?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default TextInputProps;