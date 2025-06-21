import { useEffect, useState } from 'react';
import axios from 'axios';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/ReadMore';
import moment from 'moment';

const sampleRoutes = [
    {
      id: "RUTA-001",
      date: "2025-06-15",
      start_time: "08:30",
      end_time: "09:30",
      transfer_ids: ["T001", "T002"],
      transfers: [
        { id: "T001", policlinic: "Curtinas", start_time: "08:30", type: "Envio" },
        { id: "T002", policlinic: "Andresito", start_time: "09:10", type: "Entrega" }
      ]
    },
    {
      id: "RUTA-002",
      date: "2025-06-15",
      start_time: "11:00",
      end_time: "12:30",
      transfer_ids: ["T003", "T004", "T005"],
      transfers: [
        { id: "T003", policlinic: "Paso Campamento", start_time: "11:00", type: "Entrega" },
        { id: "T004", policlinic: "Cainsa", start_time: "11:45", type: "Entrega" },
        { id: "T005", policlinic: "Belén", start_time: "12:20", type: "Envio" }
      ]
    },
    {
      id: "RUTA-003",
      date: "2025-06-15",
      start_time: "14:15",
      end_time: "15:15",
      transfer_ids: ["T006"],
      transfers: [
        { id: "T006", policlinic: "Tomás Gomensoro", start_time: "14:15", type: "Envio" }
      ]
    }
  ];
  

export default function Routes() {
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(getTodayDate());
  const [routes, setRoutes] = useState(sampleRoutes);
  const [loading, setLoading] = useState(false);

  const fetchRoutes = async () => {
    if (!date) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/routes?date=${date}`);
      setRoutes(res.data);
    } catch (err) {
      console.error('Error fetching routes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [date]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <RoomIcon className="text-indigo-600" /> Rutas generadas
          <p className='font-light'>{moment(date).format("DD/MM/yyyy")}</p>
        </h2>
        <div className='flex flex-row items-center gap-2'>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Cargando rutas...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {routes.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No hay rutas generadas para la fecha seleccionada.
            </div>
          ) : (
            routes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-center gap-2 text-indigo-600 text-lg font-semibold mb-2">
                  <AccessTimeIcon className="w-5 h-5" /> {route.start_time.slice(0, 5)} a {route.end_time.slice(0, 5)}
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Cantidad de traslados:</span> {route.transfer_ids.length}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  <span className="font-medium">Peso Total:</span> 2.3kg
                </p>

                {route.transfers && route.transfers.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Paradas:</p>
                    <ul className="space-y-2">
                      {route.transfers.map((t) => (
                        <li key={t.id} className="flex items-center text-sm text-gray-600 border-b pb-1 gap-8">
                          <div className='w-72'>
                            <RoomIcon className="w-4 h-4 mr-2 text-indigo-400" />
                            <span className="font-mono">{t.policlinic}</span>
                          </div>
                          <span className="font-mono w-44">{t.type}</span>
                          <span className="ml-auto text-xs text-gray-400">{t.start_time?.slice(0, 5)}</span>
                          <span className="cursor-pointer"><InfoOutlinedIcon /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
