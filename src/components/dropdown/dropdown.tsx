import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Item {
  id: number;
  value: string;
}
interface DropdownProps {
  label: string;
  items: Item[];
  onSelect: () => void;
}

const Dropdown = ({ label, items, onSelect }: DropdownProps)  => {
  
  const DEFAULT_ITEM = { id: -1, value: 'Ninguno' };
  items = [DEFAULT_ITEM, ...items];
  const [selectedItem, setSelectedItem] = useState<Item>(DEFAULT_ITEM);

  const changeSelectedItem = (event: SelectChangeEvent) => {

    const selectedId = parseInt(event.target.value);
    const item = items.find(item => item.id === selectedId) || DEFAULT_ITEM;
    setSelectedItem(item);
    
    onSelect();
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedItem.id.toString()}
          label={label}
          onChange={changeSelectedItem}>
          
          {items.map(item =>  <MenuItem key={item.id} value={item.id}> {item.value} </MenuItem>)}
        
        </Select>
      </FormControl>

    </div>
  );
}

export default Dropdown;
