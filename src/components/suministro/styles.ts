
import { Button, Card } from '@mui/material';
import styled from 'styled-components';

const CardContainer = styled(Card)`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 16px;
  align-items: center;
  padding: 16px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DropdownWrapper = styled.div`
  margin-bottom: 16px;
`;

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export { CardContainer, CardContent, DropdownWrapper, InputsWrapper, DeleteButtonWrapper };