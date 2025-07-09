import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/ReadMore';
import moment from 'moment';
import { Transfer, Route } from '../utils/common.types';
import useFetch from '../hooks/useFetch';
import 'moment/locale/es';  
import TransferDetailsModal from '../components/TransferDetailModal';
import usePost from '../hooks/usePost';
import CustomTable from '../components/table/table';
import TableContainer from '../components/table/tableContainer';

moment.locale('es'); 

export default function TransfersHistory() {
	const getTodayDate = () => new Date().toISOString().split('T')[0];

	const [date, setDate] = useState(getTodayDate());
	const { data: transfers, loading, error } = useFetch<Transfer[]>('transfers');
	const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);

  return (
    <div className="p-6  mx-auto">
		{selectedTransfer && (
			<TransferDetailsModal
				transfer={selectedTransfer}
				onClose={() => setSelectedTransfer(null)}
			/>
		)}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center ">
          Historial de traslados
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Cargando traslados...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {transfers?.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No hay traslados.
            </div>
          ) : (
						<TableContainer 
              transfers={transfers ?? []} 
              paginated={true} 
              height={"full"} 
              loading={loading} 
              showFilters={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
