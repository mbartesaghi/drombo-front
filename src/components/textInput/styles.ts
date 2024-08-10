import { FormControl, TextField } from '@mui/material';
import styled from 'styled-components';


const StyledFormControl = styled(FormControl)`
  margin-bottom: 16px;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    font-size: 1rem;
  }

  & .MuiFormLabel-root {
    font-size: 1rem;
  }
`;

export { StyledFormControl, StyledTextField };