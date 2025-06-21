
import Card from '../../components/card/card';
import CustomTable from '../../components/table/table';
import DroneIcon from '@mui/icons-material/Flight';
import DeliveryIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import useFetch from '../../hooks/useFetch';
import { Transfer } from '../../utils/common.types';

const Dashboard = () => {
  const { data: transfers, loading, error } = useFetch<Transfer[]>('transfers');

  console.log(transfers)
  return (
    <div className='p-6 py-2'>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title='Estado del drón' icon={DroneIcon} iconColor='text-green-600'>
          <p className="text-4xl font-bold text-green-600">Activo</p>
          <span className="text-sm text-gray-500 mt-4">Última conexión: hace 5 min</span>
        </Card>
        <Card title='Traslados pendientes' icon={DeliveryIcon} iconColor='text-yellow-500'>
          <p className="text-4xl font-bold text-yellow-500">{transfers?.length || 0}</p>
          <span className="text-sm text-gray-500 mt-4">Próximo: 14:30 hrs</span>
        </Card>
        <Card title='Último mantenimiento' icon={BuildIcon} iconColor='text-blue-600'>
          <p className="text-4xl font-bold text-blue-600">12/04</p>
          <span className="text-sm text-gray-500 mt-4">Próximo en 3 días</span>
        </Card>
      </div>
      <CustomTable transfers={transfers ?? []} />
    </div>

  );
}

export default Dashboard;
