import { FlightTakeoffSharp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { Section, SubTitle, FormWrapper, SuministroWrapper, AddButtonWrapper, AddButton } from './styles';
import { useState } from 'react';
import Suministro from '../../components/suministro/suministro';
import Dropdown from '../../components/dropdown/dropdown';
import DatePicker from '../../components/datePicker/datePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

const places = [
	{ id: 1, value: "H. Tacuarembó" },
  { id: 2, value: "Curtinas" },
  { id: 3, value: "Rivera" },
  { id: 4, value: "Tambores" },
];

const DeliveryRequest = () => {

	const [isLoading, setIsLoading] = useState(false);
  const [suministros, setSuministros] = useState<number[]>([]);

  const addSuministro = () => {
    const newSuministroId = suministros.length ? suministros[suministros.length - 1] + 1 : 1;
    setSuministros([...suministros, newSuministroId]);
  };

  const deleteSuministro = (id: number) => {
    setSuministros(suministros.filter(suministroId => suministroId !== id));
  };

  const save = () => {
    setIsLoading(true);
    console.log('Guardando datos');
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };


  return (
    <>
      <Section>
        <SubTitle>
          <p>Detalles del envio</p>
        </SubTitle>

        <FormWrapper>
          <Dropdown label="Origen" items={places} onSelect={() => {}} />
          <Dropdown label="Destino" items={places} onSelect={() => {}} />
          
          <DatePicker label='Fecha de salida' />
          
        </FormWrapper>
      </Section>

		 <br/>

	  <Section>
      <SubTitle>
        <p>Detalles del paquete</p>
      </SubTitle>

      <FormWrapper>
        {suministros.map(id => (
            <Suministro key={id} id={id} remove={deleteSuministro} />
        ))}
      </FormWrapper>

      	<AddButtonWrapper>
					<Button 
					variant="contained" 
					color="primary" 
					onClick={addSuministro} 
					style={{ marginTop: '16px', alignSelf: 'flex-end' }}
					>
						Agregar Suministro
				</Button>
      	</AddButtonWrapper>
    	</Section>

      <LoadingButton
        loading={isLoading}
        loadingPosition="start"
        startIcon={<FlightTakeoffSharp />}
        variant="outlined"
        onClick={save}>
          Confirmar Traslado
      </LoadingButton>
    </>
  );
}

export default DeliveryRequest;
