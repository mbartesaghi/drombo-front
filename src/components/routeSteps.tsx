import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, Truck, Package, Calendar, User, Weight, AlertCircle, Timer, ChevronDown, ChevronRight, Home, Hash } from 'lucide-react';

// Definición de tipos
interface Supply {
  id: number;
  name: string;
  quantity: number;
  weight: number;
  notes?: string;
}

interface Clinic {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Transfer {
  id: string;
  type: string;
  request_date: string;
  requester: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  compartment: string;
  urgency: string;
  clinic_id: string;
  clinic: Clinic;
  supplies: Supply[];
}

interface Route {
  id: string;
  transfer_ids: string;
  start_time: string;
  end_time: string;
  status: string;
  date: string;
  weight: number;
  routed_transfers_order: string;
  transfers: Transfer[];
}

interface ClinicGroup {
  clinic: Clinic;
  transfers: Transfer[];
}

interface TypeInfo {
  text: string;
  color: string;
  icon: React.ReactNode;
}

interface TimeRange {
  arrival: string;
  departure: string;
}

interface RouteStepsProps {
  route: Route;
}

const RouteSteps: React.FC<RouteStepsProps> = ({ route }) => {
  const [expandedClinics, setExpandedClinics] = useState<Set<string>>(new Set());
  
  const {
    id,
    start_time,
    end_time,
    transfers = [],
    status,
    date,
    weight,
    routed_transfers_order
  } = route;

  const toggleClinic = (clinicId: string): void => {
    const newExpanded = new Set(expandedClinics);
    if (newExpanded.has(clinicId)) {
      newExpanded.delete(clinicId);
    } else {
      newExpanded.add(clinicId);
    }
    setExpandedClinics(newExpanded);
  };

  // Agrupar transfers por clínica y separar el regreso
  const { clinicGroups, returnTransfer } = React.useMemo(() => {
    const sortedTransfers = routed_transfers_order 
      ? routed_transfers_order.split(',').map(transferId => 
          transfers.find(t => t.id === transferId.trim())
        ).filter(Boolean) as Transfer[]
      : transfers;

    // Separar el transfer de regreso
    const returnTransfer = sortedTransfers.find(t => t.type?.toLowerCase() === 'return');
    const regularTransfers = sortedTransfers.filter(t => t.type?.toLowerCase() !== 'return');

    // Agrupar por clínica manteniendo el orden de aparición
    const groups: ClinicGroup[] = [];
    const clinicGroups = new Map<string, ClinicGroup>();
    
    regularTransfers.forEach(transfer => {
      const clinicId = transfer.clinic_id;
      if (!clinicGroups.has(clinicId)) {
        const group: ClinicGroup = {
          clinic: transfer.clinic,
          transfers: []
        };
        clinicGroups.set(clinicId, group);
        groups.push(group);
      }
      clinicGroups.get(clinicId)!.transfers.push(transfer);
    });
    
    return { clinicGroups: groups, returnTransfer };
  }, [transfers, routed_transfers_order]);

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'completado':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
      case 'en_progreso':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTransferTypeText = (type: string, clinicName: string): TypeInfo => {
    // Si es el Hospital de Tacuarembó, verificar si es salida o regreso
    if (clinicName?.toLowerCase().includes('tacuarembó') || clinicName?.toLowerCase().includes('hospital')) {
      if (type?.toLowerCase() === 'return') {
        return { 
          text: 'Regreso', 
          color: 'bg-gray-100 text-gray-700', 
          icon: <ArrowRight className="w-3 h-3 rotate-180" />
        };
      }
      return { 
        text: 'Salida', 
        color: 'bg-orange-100 text-orange-700', 
        icon: <Truck className="w-3 h-3" />
      };
    }
    
    switch (type?.toLowerCase()) {
      case 'pickup':
        return { 
          text: 'Recoger', 
          color: 'bg-blue-100 text-blue-700', 
          icon: <Package className="w-3 h-3" />
        };
      case 'delivery':
        return { 
          text: 'Entregar', 
          color: 'bg-green-100 text-green-700', 
          icon: <ArrowRight className="w-3 h-3" />
        };
      default:
        return { 
          text: type, 
          color: 'bg-purple-100 text-purple-700', 
          icon: <MapPin className="w-3 h-3" />
        };
    }
  };

  const getClinicIcon = (isHospital: boolean = false): React.ReactNode => {
    const baseClasses = "w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center";
    
    if (isHospital) {
      return <div className={`${baseClasses} bg-emerald-500 text-white`}>•</div>;
    }
    
    return <div className={`${baseClasses} bg-blue-500 text-white`}>•</div>;
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    return timeString.substring(0, 5); // hh:mm
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-UY');
  };

  const getClinicTimeRange = (transfers: Transfer[]): TimeRange => {
    const startTimes = transfers.map(t => t.start_time).filter(Boolean);
    const endTimes = transfers.map(t => t.end_time).filter(Boolean);
    
    if (startTimes.length === 0 || endTimes.length === 0) return { arrival: '', departure: '' };
    
    const arrival = startTimes.sort()[0]; // Más temprano
    const departure = endTimes.sort().reverse()[0]; // Más tarde
    
    return { arrival, departure };
  };

  const getClinicTimeDisplay = (
    group: ClinicGroup | Transfer, 
    isFirstClinic: boolean, 
    isReturnStep: boolean = false
  ): React.ReactNode => {
    const timeRange = 'transfers' in group 
      ? getClinicTimeRange(group.transfers) 
      : getClinicTimeRange([group as Transfer]);
      
    const isHospital = group.clinic?.name?.toLowerCase().includes('tacuarembó') || 
                      group.clinic?.name?.toLowerCase().includes('hospital');
    
    if (isReturnStep) {
      // Para el regreso, solo mostrar hora de llegada
      return (
        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <span className="text-xs text-gray-500">Llega:</span>
          <span className="text-green-600">{formatTime((group as Transfer).start_time)}</span>
        </div>
      );
    }
    
    if (isFirstClinic && isHospital) {
      // Para el primer step (hospital), solo mostrar hora de salida
      return (
        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <span className="text-xs text-gray-500">Sale:</span>
          <span className="text-red-600">{formatTime(timeRange.departure)}</span>
        </div>
      );
    }
    
    // Para clínicas regulares, mostrar llegada y salida
    return (
      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
        <span className="text-xs text-gray-500">Llega:</span>
        <span className="text-green-600">{formatTime(timeRange.arrival)}</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500">Sale:</span>
        <span className="text-red-600">{formatTime(timeRange.departure)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Ruta #{id}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(start_time)} - {formatTime(end_time)}
              </span>
              <span className="flex items-center gap-1">
                <Weight className="w-4 h-4" />
                {weight}kg
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Clinics Timeline */}
      <div className="relative">
        {clinicGroups.map((group, index) => {
          const isLast = index === clinicGroups.length - 1 && !returnTransfer;
          const isFirstClinic = index === 0;
          const isExpanded = expandedClinics.has(group.clinic?.id);
          const isHospital = group.clinic?.name?.toLowerCase().includes('tacuarembó') || 
                            group.clinic?.name?.toLowerCase().includes('hospital');
          
          return (
            <div key={group.clinic?.id || index} className="relative flex items-start gap-4 pb-4">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-2 top-8 w-0.5 h-full bg-gradient-to-b from-blue-200 to-gray-200" />
              )}
              
              {/* Clinic Icon */}
              <div className="relative z-10 flex items-center justify-center mt-1">
                {getClinicIcon(isHospital)}
              </div>
              
              {/* Clinic Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  {/* Clinic Header - Clickeable */}
                  <button
                    onClick={() => toggleClinic(group.clinic?.id)}
                    className="w-full p-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        <h4 className="font-semibold text-gray-900 text-base">
                          {group.clinic?.name || `Clínica ${group.transfers[0]?.clinic_id}`}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                          {group.transfers.length} operación{group.transfers.length > 1 ? 'es' : ''}
                        </span>
                        
                        {/* Iconos de tipos de operaciones */}
                        <div className="flex gap-1">
                          {group.transfers.some(t => getTransferTypeText(t.type, group.clinic?.name).text === 'Salida') && (
                            <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                              <Truck className="w-3 h-3" />
                            </span>
                          )}
                          {group.transfers.some(t => t.type?.toLowerCase() === 'pickup') && (
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                              <Package className="w-3 h-3" />
                            </span>
                          )}
                          {group.transfers.some(t => t.type?.toLowerCase() === 'delivery') && (
                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Horarios de llegada y salida */}
                    <div className="text-right">
                      {getClinicTimeDisplay(group, isFirstClinic)}
                    </div>
                  </button>

                  {/* Transfers expandibles */}
                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-2 border-t border-gray-200 bg-white">
                      {group.transfers.map((transfer) => {
                        const typeInfo = getTransferTypeText(transfer.type, group.clinic?.name);
                        
                        return (
                          <div key={transfer.id} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                            {/* Transfer Header Compacto */}
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeInfo.color} flex items-center gap-1`}>
                                  {typeInfo.icon} {typeInfo.text}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatTime(transfer.start_time)} - {formatTime(transfer.end_time)}
                                  <span className="ml-1 text-gray-400">
                                    ({Math.round((new Date(`1970-01-01T${transfer.end_time}`).getTime() - new Date(`1970-01-01T${transfer.start_time}`).getTime()) / 60000)} min)
                                  </span>
                                </span>
                              </div>
                              
                              {transfer.supplies && transfer.supplies.length > 0 && (
                                <div className="text-xs text-purple-600 flex items-center gap-1">
                                  <Hash className="w-3 h-3" />
                                  {transfer.supplies.length}
                                </div>
                              )}
                            </div>

                            {/* Supplies inline */}
                            {transfer.supplies && transfer.supplies.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {transfer.supplies.map((supply) => (
                                  <div key={supply.id} className="bg-white rounded px-2 py-1 text-xs inline-flex items-center gap-1 border border-gray-200">
                                    <span className="font-medium">{supply.name}</span>
                                    <span className="text-gray-500">({supply.quantity}u, {supply.weight}kg)</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Return Step */}
        {returnTransfer && (
          <div className="relative flex items-start gap-4">
            {/* Clinic Icon */}
            <div className="relative z-10 flex items-center justify-center mt-1">
              <div className="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-purple-500 text-white">
                •
              </div>
            </div>
            
            {/* Return Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900 text-base">
                      Regreso al {returnTransfer.clinic?.name}
                    </h4>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 rotate-180" />
                      Regreso
                    </span>
                  </div>
                  
                  <div className="text-right">
                    {getClinicTimeDisplay(returnTransfer, false, true)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de ejemplo con datos de prueba
const RouteStepsDemo: React.FC = () => {
  const sampleRoute: Route = {
    id: "RT-001",
    transfer_ids: "T1,T2,T3,T4,T5",
    start_time: "08:00:00",
    end_time: "12:15:00",
    status: "in_progress",
    date: "2024-03-15",
    weight: 155,
    routed_transfers_order: "T1,T2,T3,T4,T5",
    transfers: [
      {
        id: "T1",
        type: "pickup", // En el hospital siempre será tratado como "Salida"
        request_date: "2024-03-14",
        requester: "Dr. María González",
        start_date: "2024-03-15",
        end_date: "2024-03-15",
        start_time: "08:00:00",
        end_time: "08:15:00",
        compartment: "Refrigerado",
        urgency: "alta",
        clinic_id: "C1",
        clinic: {
          id: "C1",
          name: "Hospital de Tacuarembó",
          latitude: -31.7333,
          longitude: -55.9833
        },
        supplies: [
          {
            id: 1,
            name: "Vacunas COVID-19",
            quantity: 50,
            weight: 15,
            notes: "Mantener cadena de frío"
          },
          {
            id: 2,
            name: "Antibióticos",
            quantity: 25,
            weight: 8,
            notes: "Para emergencia"
          }
        ]
      },
      {
        id: "T2",
        type: "delivery",
        request_date: "2024-03-14",
        requester: "Enf. Carlos Rodríguez",
        start_date: "2024-03-15",
        end_date: "2024-03-15",
        start_time: "09:15:00",
        end_time: "09:30:00",
        compartment: "Estándar",
        urgency: "alta",
        clinic_id: "C2",
        clinic: {
          id: "C2",
          name: "Centro de Salud Tambores",
          latitude: -31.8500,
          longitude: -55.7500
        },
        supplies: [
          {
            id: 3,
            name: "Vacunas COVID-19",
            quantity: 30,
            weight: 10,
            notes: "Para campaña de vacunación"
          }
        ]
      },
      {
        id: "T3",
        type: "pickup", 
        request_date: "2024-03-14",
        requester: "Dr. Ana Silva",
        start_date: "2024-03-15", 
        end_date: "2024-03-15",
        start_time: "09:35:00",
        end_time: "09:50:00",
        compartment: "Refrigerado",
        urgency: "media",
        clinic_id: "C2", // ¡Misma clínica que T2!
        clinic: {
          id: "C2", 
          name: "Centro de Salud Tambores",
          latitude: -31.8500,
          longitude: -55.7500
        },
        supplies: [
          {
            id: 4,
            name: "Muestras de sangre",
            quantity: 20,
            weight: 5,
            notes: "Para análisis urgente"
          },
          {
            id: 5,
            name: "Biopsias",
            quantity: 8,
            weight: 2,
            notes: "Mantener refrigerado"
          }
        ]
      },
      {
        id: "T4",
        type: "delivery",
        request_date: "2024-03-14", 
        requester: "Enf. Pedro Martínez",
        start_date: "2024-03-15",
        end_date: "2024-03-15", 
        start_time: "11:00:00",
        end_time: "11:30:00",
        compartment: "Estándar",
        urgency: "alta",
        clinic_id: "C3",
        clinic: {
          id: "C3",
          name: "Policlínica Rural San Gregorio", 
          latitude: -31.9000,
          longitude: -55.6000
        },
        supplies: [
          {
            id: 6,
            name: "Antibióticos",
            quantity: 15,
            weight: 5,
            notes: "Medicación de rutina"
          }
        ]
      },
      {
        id: "T5",
        type: "return",
        request_date: "2024-03-14",
        requester: "Sistema",
        start_date: "2024-03-15",
        end_date: "2024-03-15",
        start_time: "12:00:00",
        end_time: "12:15:00",
        compartment: "Vacío",
        urgency: "baja",
        clinic_id: "C1",
        clinic: {
          id: "C1",
          name: "Hospital de Tacuarembó",
          latitude: -31.7333,
          longitude: -55.9833
        },
        supplies: []
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Rutas del 18/08 a 23/08
        </h1>
        <RouteSteps route={sampleRoute} />
      </div>
    </div>
  );
};

export default RouteStepsDemo;