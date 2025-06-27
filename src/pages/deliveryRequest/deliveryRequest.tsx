import { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import Dropdown from "../../components/dropdown/dropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import usePost from "../../hooks/usePost";
import { Supply, Transfer } from "../../utils/common.types";
import { getCompartmentSize, getRandomId } from "../../utils/helpers";
import SuccessToast from "../../components/SuccessAlert";
import ToggleSwitch from "../../components/ToggleSwitch";

type requestTransferResponse = {
  transferId: string;
}

const EMPTY_TRANSFER_DETAILS = {
  type: "Envio",
  request_date: new Date().toISOString().split('T')[0],
  requester: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  compartment: 'SMALL',
  urgency: 'baja',
  clinic_id: '1'
}


const EMPTY_SUPPLY_DETAILS = {
  id: getRandomId(),
  name: "",
  quantity: 0,
  weight: 0,
  notes: ""
}

interface SupplyError {
  id: number;
  field: string;
  message: string;
}

const DeliveryRequest = () => {
  const [transferDetails, setTransferDetails] = useState<Transfer>(EMPTY_TRANSFER_DETAILS);
  const [supplies, setSupplies] = useState([EMPTY_SUPPLY_DETAILS]);
  const { postData, data, loading, error } = usePost<requestTransferResponse>('/transfers');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({ startTime: false, startDate: false, endTime: false, endDate: false, requester: false });
  const [suppliesErrors, setSuppliesErrors] = useState<SupplyError[]>([])

  const handleSubmit = () => {
    if (!validateTransferData()) return
    const validationErrors = validateSupplies(supplies);
    setSuppliesErrors(validationErrors);
    console.log("validationErrors", validationErrors)
    if(validationErrors.length > 0) return;

    postData({
      ...transferDetails,
      supplies
    });
    setShowToast(true);
  };

  const validateTransferData = () => {
    if(!transferDetails.requester) {
      setErrors({...errors, requester: true})
      return false
    }
    if(transferDetails.start_date > transferDetails.end_date) {
      setErrors({...errors, startDate: true, endDate: true})
      return false
    }
    if(transferDetails.start_time > transferDetails.end_time) {
      setErrors({...errors, startTime: true, endTime: true})
      return false
    }
    return true
  }

  const getFieldError = (supplyId: number, field: string) =>
    suppliesErrors.find(e => e.id === supplyId && e.field === field);

  const validateSupplies = (supplies: Supply[]): any[] => {
    const errors: any[] = [];
    
    supplies.forEach((supply) => {
      if (!supply.name.trim()) {
        errors.push({
          id: supply.id,
          field: "name",
          message: "El nombre es obligatorio.",
        });
      }
  
      if (!supply.quantity || supply.quantity <= 0) {
        errors.push({
          id: supply.id,
          field: "quantity",
          message: "La cantidad debe ser mayor a 0.",
        });
      }
  
      if (!supply.weight || supply.weight <= 0) {
        errors.push({
          id: supply.id,
          field: "weight",
          message: "El peso debe ser mayor a 0.",
        });
      }
    });
  
    return errors;
  }
  

  const addSupply = () => {
    const id = getRandomId()
    setSupplies((prev) => [
      ...prev,
      {
        ...EMPTY_SUPPLY_DETAILS,
        id
      }
    ]);
  };

  const removeSupply = (id: number) => {
    setSupplies((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSupply = (id: number, field: string, value: string | number) => {
    setSupplies((prev) =>
      prev.map((supply) =>
        supply.id === id ? { ...supply, [field]: value } : supply
      )
    );
  };

  console.log("transferDetails", transferDetails)
  console.log("supplies", supplies)

  return (
    <div className="p-8 mb-4 max-w-5xl mx-auto bg-white shadow-md rounded-xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicitar traslado</h2>
        <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Realizar pedido
        </button>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleSwitch
            optionA="Envio"
            optionB="Pedido"
            value={transferDetails.type}
            onChange={(v) => setTransferDetails({...transferDetails, type: v})}
          />
          <TextInput className="col-span-2" labelText="Solicitante" type="text" onChange={(e) => setTransferDetails({...transferDetails, requester: e.target.value})} />
          <Dropdown
            labelText="Policlínica"
            options={[{ value: "1", label: "Tambores" }, { value: "2", label: "Curtinas" },  { value: "3", label: "Sauce del Batovi" }, { value: "4", label: "Ansina" }, { value: "5", label: "Rivera" }, { value: "6", label: "Piedra Sola" }]}
            onChange={(v) => setTransferDetails({...transferDetails, clinic_id: v})}
          />
          <Dropdown
            labelText="Urgencia"
            options={[
              { value: "baja", label: "Baja" },
              { value: "media", label: "Media" },
              { value: "alta", label: "Alta" },
            ]}
            onChange={(v) => setTransferDetails({...transferDetails, urgency: v})}
          />
          <TextInput 
            labelText="Fecha inicio" 
            type="date"
            error={errors.startDate} 
            onChange={(e) => setTransferDetails({...transferDetails, start_date: e.target.value})} 
          />
          <TextInput 
            labelText="Fecha fin" 
            type="date" 
            error={errors.endDate} 
            onChange={(e) => setTransferDetails({...transferDetails, end_date: e.target.value})} 
          />
          <TextInput 
            labelText="Horario inicio"
            type="time" 
            error={errors.startTime} 
            onChange={(e) => setTransferDetails({...transferDetails, start_time: e.target.value})} 
          />
          <TextInput 
            labelText="Horario fin" 
            type="time" 
            error={errors.endTime} 
            onChange={(e) => setTransferDetails({...transferDetails, end_time: e.target.value})} 
          />
          
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Detalles del paquete</h3>

        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-full items-center flex flex-row gap-5 justify-center">
            <Dropdown
              labelText="Tamaño del compartimento"
              options={[
                { value: "BIG", label: "Grande" },
                { value: "MEDIUM", label: "Mediano" },
                { value: "SMALL", label: "Chico" },
              ]}
              onChange={v => setTransferDetails({...transferDetails, compartment: v})}
              value={transferDetails.compartment}
              placeholder="Selecciona una opción"
            />
              <p className="w-[40%] mt-5 text-sm text-gray-500">{transferDetails.compartment && `Dimensiones: ${getCompartmentSize(transferDetails.compartment)}`}
              </p>
          </div>
        </div>

        {supplies.map((supply) => (
          <div
            key={supply.id}
            className="border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4 flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            <TextInput 
              labelText="Suministro" 
              width="100%" 
              onChange={(e) => updateSupply(supply.id, 'name', e.target.value)} 
              error={!!getFieldError(supply.id, "name")}
            />
            <TextInput 
              labelText="Cantidad" 
              type="number" width="120px" 
              onChange={(e) => updateSupply(supply.id, 'quantity', Number(e.target.value))}
              error={!!getFieldError(supply.id, "quantity")}
            />
            <TextInput 
              labelText="Peso (g)" 
              type="number" 
              width="120px" 
              onChange={(e) => updateSupply(supply.id, 'weight', Number(e.target.value))} 
              error={!!getFieldError(supply.id, "weight")}
            />
            <TextInput 
              labelText="Indicaciones" 
              width="100%" 
              onChange={(e) => updateSupply(supply.id, 'notes', e.target.value)} 
            />
            
            <button
              type="button"
              onClick={() => removeSupply(supply.id)}
              className="text-red-500 hover:text-red-700 disabled:text-gray-500 mt-5"
              disabled={supplies.length === 1}
            >
              <DeleteIcon fontSize="medium" />
            </button>
          </div>
        ))}
          <button
            type="button"
            onClick={addSupply}
            className=" px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition"
          >
            + Agregar suministro
          </button>

          
      </div>
      <SuccessToast
        message="Traslado solicitado correctamente"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default DeliveryRequest;

