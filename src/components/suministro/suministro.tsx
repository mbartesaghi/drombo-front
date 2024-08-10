import { useState } from 'react';
import TextInput from '../textInput/textInput';
import Dropdown from '../dropdown/dropdown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, CardContent } from '@mui/material';
import { CardContainer, DropdownWrapper, InputsWrapper, DeleteButtonWrapper } from './styles';


const suministroTypes = [
  { id: 0, value: "Bolsa de sangre" },
  { id: 1, value: "Botella de leche" },
  { id: 2, value: "Medicamento en caja" },
  { id: 3, value: "Medicamento en frasco" },
  { id: 4, value: "Documento" }
];

interface SuministroProps {
  id: number;
  remove: (id: number) => void;
}


const Suministro = ({ id, remove }: SuministroProps)  => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [peso, setPeso] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [indicaciones, setIndicaciones] = useState('');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const clearInputs = () => {
    setNombre('');
    setCantidad('');
    setPeso('');
    setDimensiones('');
    setIndicaciones('');
  };

  return (
    <CardContainer>
      <CardContent>
        
        <DropdownWrapper>
          <Dropdown label="Tipo Suministro" items={suministroTypes} onSelect={clearInputs} />
        </DropdownWrapper>
        
        <InputsWrapper>
          <TextInput labelText="Nombre" width="100%" value={nombre} onChange={handleInputChange(setNombre)} />
          <TextInput labelText="Cantidad" width="100%" value={cantidad} onChange={handleInputChange(setCantidad)} />
          <TextInput labelText="Peso (g)" width="100%" value={peso} onChange={handleInputChange(setPeso)} />
          <TextInput labelText="Dimensiones" width="100%" value={dimensiones} onChange={handleInputChange(setDimensiones)} />
          <TextInput labelText="Indicaciones" width="100%" value={indicaciones} onChange={handleInputChange(setIndicaciones)} />
        
        </InputsWrapper>
      </CardContent>
            
      <DeleteButtonWrapper>
        <Button 
          variant='contained' 
          color='error' 
          onClick={() => remove(id)}
        >
          <HighlightOffIcon />
        </Button>
      </DeleteButtonWrapper>
    </CardContainer>
  );
};

export default Suministro;