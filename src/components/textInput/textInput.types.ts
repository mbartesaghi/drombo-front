interface TextInputProps {
  labelText: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  error?: boolean;
}

export default TextInputProps;