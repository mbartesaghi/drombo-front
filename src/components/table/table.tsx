import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';

const flightsInfo = [
  {
    date: "11/07/2024",
    origin: 'Curtinas',
    destination: 'H. Tacuarembo',
    supplyType: 'Sangre',
    quantity: '1',
    state: "Pendiente"
  },
  {
    date: "15/07/2024",
    origin: 'H. Tacuarembo',
    destination: 'Cutrinas',
    supplyType: 'Medicamentos',
    quantity: '3',
    state: "Pendiente"
  },
]

const CustomTable = () => {

  return (
    <TableContainer component={Paper} >
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          color: 'black',
          backgroundColor: 'white',
          fontFamily: 'San Francisco',
          fontSize: '24px',
          borderRadius: '8px',
        }}
      >Ultimos vuelos</Toolbar>
      <Table
        sx={{
          minWidth: 650,
          fontFamily: 'San Francisco',
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="left">Origen</TableCell>
            <TableCell align="left">Destino</TableCell>
            <TableCell align="left">Tipo suministro</TableCell>
            <TableCell align="left">Cantidad de articulos</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightsInfo.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="left">{row.origin}</TableCell>
              <TableCell align="left">{row.destination}</TableCell>
              <TableCell align="left">{row.supplyType}</TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

export default CustomTable;
