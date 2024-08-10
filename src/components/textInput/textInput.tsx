import TextInputProps from './textInput.types';
import { StyledFormControl, StyledTextField } from './styles';

const TextInput = ({ labelText, width, placeholder, value }: TextInputProps) => {
  return (
    <StyledFormControl>
      <StyledTextField
        label={labelText}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        sx={{ width: width }}
      />
    </StyledFormControl>
  );
}

export default TextInput;
