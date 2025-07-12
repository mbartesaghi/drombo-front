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

moment.locale('es'); 

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 

export default function Routes() {
	const getTodayDate = () => new Date().toISOString().split('T')[0];

	const [date, setDate] = useState(getTodayDate());
	const { data: routes = [], loading, error } = useFetch<Route[]>(`routes`);
	const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
	const { postData, data, loading: sending, error: rigiError } = usePost<any>('/start-route');

	const getRoutesByDate = (): Record<string, Route[]> => {
		if (!routes) return {};
		return routes.reduce((acc: Record<string, Route[]>, route: Route) => {
			if (!acc[route.date]) {
				acc[route.date] = [];
			}
			acc[route.date].push(route);
			return acc;
		}, {});
	}

	const sendToRigitech = (route: Route) => {
		postData({
			route_id: route.id
		});
	}

	const getOrderedTransfers = (route: Route) : Transfer[] => {
		const order = route.routed_transfers_order.split(",");
		const newOrder: Transfer[] = []
		order.forEach((transferId: string) => {
			const transfer = route.transfers.find(transfer => transfer.id === transferId);
			if (transfer) newOrder.push(transfer)
		})
		return newOrder;
	}

  return (
    <div className="p-6 max-w-4xl mx-auto">
		{selectedTransfer && (
			<TransferDetailsModal
				transfer={selectedTransfer}
				onClose={() => setSelectedTransfer(null)}
			/>
		)}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <RoomIcon className="text-indigo-600" /> Rutas generadas
          <p className='font-light'>{moment(date).format("DD/MM/yyyy")} - {moment(date).add(7, 'days').format("DD/MM/yyyy")}</p>
        </h2>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Cargando rutas...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {routes?.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No hay rutas generadas.
            </div>
          ) : (
				Object.entries(getRoutesByDate()).map(([key, routes]) => {
					return (
						<div>
							<div className="flex w-full items-center rounded-full">
								<div className="flex-1 border-b border-gray-300"></div>
								<span className="text-black text-lg font-semibold leading-8 px-8 py-3">{capitalize(moment(key).format('dddd DD [de] MMMM YYYY'))}</span>
								<div className="flex-1 border-b border-gray-300"></div>
							</div>
							<div className='mb-2'>
								<span className='text-2xl text-gray-700'>{}</span>
							</div>
							{routes.length && routes?.map((route: Route, index: number) => (	
								<div key={route.id} className="bg-white rounded-xl shadow p-6 mb-5 border border-gray-100">
									
									<div className="flex items-center justify-between gap-2 text-indigo-600 text-lg font-semibold mb-2">
										<div><AccessTimeIcon className="w-5 h-5" /> {route.start_time} - {route.end_time}</div>
										{route.status === "READY_FOR_START" ?
											<button 
												type="button"
												className="px-2 py-1 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition cursor-pointer"
												onClick={() => sendToRigitech(route)}
											>Enviar a Rigitech</button>
										:
											<h2>Enviado a Rigitech</h2>
										}	
									</div>
									<p className="text-gray-600 text-sm mb-1">
										<span className="font-medium">Cantidad de traslados: {route.transfer_ids.length}</span>
									</p>
									<p className="text-gray-500 text-sm mb-4">
										<span className="font-medium">Peso Total:</span> {route.weight/1000}kg
									</p>

									{route.transfers && route.transfers.length > 0 && (
										<div className="mt-2">
											<p className="text-sm font-medium text-gray-700 mb-2">Traslados:</p>
											<ul className="space-y-2">
												<li key={'depot'} className="flex items-center text-sm text-gray-600 border-b pb-1 gap-8">
													<div className='w-72'>
														<RoomIcon className="w-4 h-4 mr-2 text-indigo-400" />
														<span className="font-mono">Hospital de Tacuarembo</span>
													</div>
													<span className="font-mono w-44">Salida</span>
													<span className="ml-auto text-xs text-gray-400">{route.start_time?.slice(0, 5)}</span>
													<span className="cursor-pointer invisible"><InfoOutlinedIcon /></span>
												</li>
												{getOrderedTransfers(route).map((t: Transfer) => (
													<li key={t.id} className="flex items-center text-sm text-gray-600 border-b pb-1 gap-8">
														<div className='w-72'>
															<RoomIcon className="w-4 h-4 mr-2 text-indigo-400" />
															<span className="font-mono">{t.clinic?.name}</span>
														</div>
														<span className="font-mono w-44">{t.type}</span>
														<span className="ml-auto text-xs text-gray-400">{t.estimated_arrival_time?.slice(0, 5)}</span>
														<span 
															className="cursor-pointer" 
															onClick={() => setSelectedTransfer(t)}
														><InfoOutlinedIcon /></span>
													</li>
												))}
												<li key={'depot'} className="flex items-center text-sm text-gray-600 border-b pb-1 gap-8">
													<div className='w-72'>
														<RoomIcon className="w-4 h-4 mr-2 text-indigo-400" />
														<span className="font-mono">Hospital de Tacuarembo</span>
													</div>
													<span className="font-mono w-44">Llegada</span>
													<span className="ml-auto text-xs text-gray-400">{route.end_time?.slice(0, 5)}</span>
													<span className="cursor-pointer invisible"><InfoOutlinedIcon /></span>
												</li>
											</ul>
										</div>
									)}
								</div>
							))
						}
						</div>
					)
				})
          )}
        </div>
      )}
    </div>
  );
}
