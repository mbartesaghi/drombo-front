import TextInputProps from './textInput.types';
import { StyledFormControl, StyledTextField } from './styles';

const TextInput = ({ labelText, width, placeholder, value, onChange }: TextInputProps) => {
  return (
    <StyledFormControl>
      <StyledTextField
        label={labelText}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        sx={{ width: width }}
        onChange={onChange}
      />
    </StyledFormControl>
  );
}

export default TextInput;
