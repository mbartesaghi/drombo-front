import { Box, FormControl, Input } from '@mui/material';
import { Section, SubTitle, FormWrapper } from './styles';
import TextInput from '../../components/textInput/textInput';

const DeliveryRequest = () => {
  return (
    <>
      <Section>
        <SubTitle>
          <p>Detalles del envio</p>
        </SubTitle>
        <FormWrapper>
          <TextInput labelText='Origen' />
          <TextInput labelText='Destino' />
          <TextInput labelText='Fecha de salida' />
          <TextInput labelText='Recibir a partir de' />
          <TextInput labelText='Horario de salida' />
          <TextInput labelText='Horario de recepción' />
        </FormWrapper>
      </Section>
      <Section>
        <SubTitle>
          <p>Detalles del paquete</p>
        </SubTitle>
        <FormWrapper>
          <TextInput labelText='Suministro' width="300px" />
          <TextInput labelText='Cantidad' width="100px" />
          <TextInput labelText='Peso' width="100px" />
          <TextInput labelText='Dimensiones' width="100px" />
          <TextInput labelText='Indicaciones' width="500px" />
        </FormWrapper>

      </Section>
    </>
  );
}

export default DeliveryRequest;
