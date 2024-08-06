
import Card from '../../components/card/card';
import Dron from '../../assets/dron-de-camara.png';
import { CardWrapper, Text } from './styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';

const Dashboard = () => {


  return (
    <div>
      {/* <h1>Overview</h1> */}
      <CardWrapper>
        <Card title="Estado del drón" width='27%' icon={Dron}>
          <Text>En vuelo</Text>
        </Card>
        <Card title="Traslados pendientes" width='27%'>
          <Text>3</Text>
        </Card>
        <Card title="" width='27%' />


        <TableContainer sx={{ ml: 1, mr: 8  }} component={Paper}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              color: 'black',
              backgroundColor: 'white',
              fontSize: '24px',
              borderRadius: '8px',
            }}
          >Ultimos vuelos</Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Origen</TableCell>
                <TableCell align="right">Destino</TableCell>
                <TableCell align="right">Tipo suministro</TableCell>
                <TableCell align="right">Cantidad de articulos</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[{ name: "11/07/2024", calories: 'Curtinas', fat: 'H. Tacuarembo', carbs: '', protein: '', state: "Pendiente"}].map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



      </CardWrapper>
    </div>
  );
}

export default Dashboard;
