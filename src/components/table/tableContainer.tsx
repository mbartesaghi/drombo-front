import React, { useState, useMemo, useEffect, useRef } from "react";
import { Transfer } from "../../utils/common.types";
import CustomTable from "./table";
import Pagination from "./pagination";
import TransferSearchFilter from "./transferSearchFilter";
import TransferAdvancedFilters from "./transferAdvancedFilters";
import moment from "moment";

interface TableContainerProps {
  transfers: Transfer[];
  title?: string;
  paginated?: boolean;
  loading?: boolean;
  height?: "small" | "medium" | "full";
  showFilters?: boolean;
}

const TableContainer: React.FC<TableContainerProps> = ({
  transfers,
  title,
  paginated = false,
  loading = false,
  height = "medium",
  showFilters = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [statusFilter, setStatusFilter] = useState<string>("");
  const [requestDateFilter, setRequestDateFilter] = useState<string>("");
  const [rangeStart, setRangeStart] = useState<string>("");
  const [rangeEnd, setRangeEnd] = useState<string>("");

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const filteredTransfers = useMemo(() => {
    return transfers.filter(t => {
      const queryMatch =
        t.requester.toLowerCase().includes(search.toLowerCase()) ||
        t.status?.toLowerCase().includes(search.toLowerCase()) ||
        t.clinic?.name?.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter ? t.status === statusFilter : true;

      const requestDateMatch = requestDateFilter
        ? moment(t.request_date).isSame(moment(requestDateFilter), 'day')
        : true;

      const rangeMatch =
        (rangeStart ? moment(t.end_date).isSameOrAfter(moment(rangeStart), 'day') : true) &&
        (rangeEnd ? moment(t.start_date).isSameOrBefore(moment(rangeEnd), 'day') : true);
      

      return queryMatch && statusMatch && requestDateMatch && rangeMatch;
    });
  }, [search, statusFilter, requestDateFilter, transfers, rangeStart, rangeEnd]);

  useEffect(() => {
    if (paginated && tableContainerRef.current) {
      const containerHeight = tableContainerRef.current.clientHeight;
      const rowHeight = 56;
      const headerHeight = 48;
      const availableRows = Math.floor((containerHeight - headerHeight) / rowHeight);
      setRowsPerPage(Math.max(availableRows, 1));
    }
  }, [height, paginated, filteredTransfers.length]);

  const totalPages = Math.ceil(filteredTransfers.length / rowsPerPage);
  const paginatedTransfers = paginated
    ? filteredTransfers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : filteredTransfers;

  const getHeightClass = () => {
    switch (height) {
      case "small": return "h-[250px]";
      case "medium": return "h-[400px]";
      case "full": return "h-[500px]";
      default: return "h-[400px]";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      {title && <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>}

      {showFilters && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <TransferSearchFilter
            value={search}
            onChange={(val) => { setSearch(val); setCurrentPage(1); }}
          />

          <TransferAdvancedFilters
            status={statusFilter}
            onStatusChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
            requestDate={requestDateFilter}
            onRequestDateChange={(val) => { setRequestDateFilter(val); setCurrentPage(1); }}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeStartChange={(val) => { setRangeStart(val); setCurrentPage(1); }}
            onRangeEndChange={(val) => { setRangeEnd(val); setCurrentPage(1); }}
          />
        </div>
      )}

      <div ref={tableContainerRef} className={`overflow-x-auto ${paginated ? "" : "overflow-y-auto"} rounded-xl ${getHeightClass()}`}>
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500 text-sm">Cargando traslados...</div>
        ) : (
          <CustomTable transfers={paginatedTransfers} />
        )}
      </div>

      {paginated && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TableContainer;
